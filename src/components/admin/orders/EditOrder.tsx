import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  ErrorInputProp,
  OrderProp,
  OrderPutProp,
} from "../../../helpers/Interfaces";
import { useState } from "react";
import { updateOrder } from "../../../functions/orderFunctions";
import {
  BEINGPROCESSED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  COMPLETED_ORDER_STATUS,
} from "../../../helpers/constants";
import {
  validateDeliveryAddress,
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
  validateUserId,
} from "../../../validation/orderAdminValidation";

export default function EditOrder() {
  const loadedOrder: OrderProp = useLoaderData() as OrderProp;
  const [formData, setFormData] = useState<OrderPutProp>({
    id: loadedOrder.id,
    customerName: loadedOrder.customerName,
    status: loadedOrder.status,
    deliveryAddress: loadedOrder.deliveryAddress,
    creationDate: loadedOrder.creationDate,
    totalOrderPrice: loadedOrder.totalOrderPrice,
    email: loadedOrder.email,
    paymentType: loadedOrder.paymentType,
    phoneNumber: loadedOrder.phoneNumber,
    userId: loadedOrder.userId,
  });
  const navigate = useNavigate();

  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct first name",
    });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct phone number",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct email",
  });
  const [addressErrorInput, setAddressErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct delivery address",
  });
  const [userIdErrorInput, setUserIdErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct user ID",
  });

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      validateFirstName(
        formData.customerName,
        firstNameErrorInput,
        setFirstNameErrorInput
      )
    );
    validationResults.push(
      validatePhoneNumber(
        formData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      validateEmail(formData.email, emailErrorInput, setEmailErrorInput)
    );
    validationResults.push(
      validateDeliveryAddress(
        formData.deliveryAddress,
        addressErrorInput,
        setAddressErrorInput
      )
    );
    if (formData.userId !== null && formData.userId !== "") {
      validationResults.push(
        await validateUserId(
          formData.userId,
          userIdErrorInput,
          setUserIdErrorInput
        )
      );
    } else {
      setUserIdErrorInput((prevData) => ({
        ...prevData,
        styles: { display: "none" },
      }));
    }
    let isValid = true;
    for (const result of validationResults) {
      if (!result) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleEditClick = () => {
    formData.userId = formData.userId === "" ? null : formData.userId;
    updateOrder(formData)
      .then((updatedOrder) => {
        if (updatedOrder !== null) {
          console.log(`Order with ID: ${updatedOrder.id} was updated`);
          navigate("/admin/orders");
        } else {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible", marginTop: 0 },
          }));
        }
      })
      .catch((error) => console.error(error));
  };
  const date = new Date(formData.creationDate);
  const datePart = date.toISOString().split("T")[0];
  const timePart = date.toTimeString().split(" ")[0].substring(0, 5);
  const formattedString = `${datePart}; ${timePart}`;
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit an Order
      </div>
      <div style={formErrorInput.styles} className="auth-form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="order-id">ID</label>
          <input
            id="order-id"
            className="form-control"
            value={formData.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-creation-date">Creation date</label>
          <input
            id="order-creation-date"
            className="form-control"
            value={formattedString}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-name">Customer name</label>
          <input
            id="order-name"
            className="form-control"
            value={formData.customerName}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                customerName: e.target.value,
              }));
            }}
          />
        </div>
        <div style={firstNameErrorInput.styles} className="error-input">
          {firstNameErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-address">Delivery address</label>
          <input
            id="order-address"
            className="form-control"
            value={formData.deliveryAddress}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                deliveryAddress: e.target.value,
              }));
            }}
          />
        </div>
        <div style={addressErrorInput.styles} className="error-input">
          {addressErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-email">Email</label>
          <input
            id="order-email"
            className="form-control"
            value={formData.email}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                email: e.target.value,
              }));
            }}
          />
        </div>
        <div style={emailErrorInput.styles} className="error-input">
          {emailErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-payment">Payment type</label>
          <select
            id="order-payment"
            className="form-control"
            value={formData.paymentType}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                paymentType: e.target.value,
              }));
            }}
          >
            <option>cash</option>
            <option>card</option>
          </select>
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-phone">Phone number</label>
          <input
            id="order-phone"
            className="form-control"
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                phoneNumber: e.target.value,
              }));
            }}
          />
        </div>
        <div style={phoneErrorInput.styles} className="error-input">
          {phoneErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-status">Status</label>
          <select
            id="order-status"
            className="form-control"
            value={formData.status}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                status: e.target.value,
              }));
            }}
          >
            <option>{BEINGPROCESSED_ORDER_STATUS}</option>
            <option>{COMPLETED_ORDER_STATUS}</option>
            <option>{CANCELLED_ORDER_STATUS}</option>
          </select>
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-price">Order price</label>
          <input
            id="order-price"
            className="form-control"
            value={formData.totalOrderPrice}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-userid">User ID</label>
          <input
            id="order-userid"
            className="form-control"
            value={formData.userId ?? ""}
            onChange={(e) => {
              setFormData((prevData) => ({
                ...prevData,
                userId: e.target.value,
              }));
            }}
          />
        </div>
        <div style={userIdErrorInput.styles} className="error-input">
          {userIdErrorInput.message}
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              validateFormData()
                .then((result) => {
                  if (result) {
                    console.log("The data is valid.");
                    handleEditClick();
                  } else {
                    console.log("The data is not valid.");
                  }
                })
                .catch((error) => console.error(error));
            }}
          >
            Save
          </button>
          <Link
            className="btn btn-secondary admin-products-button"
            to={"/admin/orders"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
