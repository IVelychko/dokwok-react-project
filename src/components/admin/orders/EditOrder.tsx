import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ErrorInput } from "../../../helpers/Interfaces";
import { useState } from "react";
import { updateOrder } from "../../../repositories/orderRepository";
import {
  BEINGPROCESSED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  COMPLETED_ORDER_STATUS,
} from "../../../helpers/constants";
import {
  validateDeliveryAddressAndShopId,
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
  validateUserId,
} from "../../../validation/orderAdminValidation";
import useAuthAxios from "../../../hooks/useAuthAxios";
import { Order } from "../../../models/dataTransferObjects";

export default function EditOrder() {

  const authAxios = useAuthAxios();
  const loadedOrder: Order = useLoaderData() as Order;
  const id = loadedOrder.id;
  const [customerName, setCustomerName] = useState(loadedOrder.customerName);
  const [status, setStatus] = useState(loadedOrder.status);
  const [deliveryAddress, setDeliveryAddress] = useState(
    loadedOrder.deliveryAddress
  );
  const creationDate = loadedOrder.creationDate;
  const totalOrderPrice = loadedOrder.totalOrderPrice;
  const [email, setEmail] = useState(loadedOrder.email);
  const [paymentType, setPaymentType] = useState(loadedOrder.paymentType);
  const [phoneNumber, setPhoneNumber] = useState(loadedOrder.phoneNumber);
  const [userId, setUserId] = useState(loadedOrder.userId);
  const [shopId, setShopId] = useState(loadedOrder.shopId?.toString() ?? null);
  const navigate = useNavigate();

  const [formErrorInput, setFormErrorInput] = useState<ErrorInput>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInput>({
      styles: { display: "none" },
      message: "Enter a correct first name",
    });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Enter a correct phone number",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Enter a correct email",
  });
  const [addressErrorInput, setAddressErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Enter a correct delivery address",
  });
  const [userIdErrorInput, setUserIdErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Enter a correct user ID",
  });
  const [shopIdErrorInput, setShopIdErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Enter a correct shop ID",
  });

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      validateFirstName(
        customerName,
        firstNameErrorInput,
        setFirstNameErrorInput
      )
    );
    validationResults.push(
      validatePhoneNumber(phoneNumber, phoneErrorInput, setPhoneErrorInput)
    );
    validationResults.push(
      validateEmail(email, emailErrorInput, setEmailErrorInput)
    );
    validationResults.push(
      await validateDeliveryAddressAndShopId(
        deliveryAddress,
        shopId,
        addressErrorInput,
        setAddressErrorInput,
        shopIdErrorInput,
        setShopIdErrorInput
      )
    );

    if (userId !== null && userId !== "") {
      validationResults.push(
        await validateUserId(userId, userIdErrorInput, setUserIdErrorInput, authAxios)
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
    const newUserId = userId === "" ? null : userId;
    const newShopId = shopId === "" ? null : shopId;
    const newDeliveryAddress = deliveryAddress === "" ? null : deliveryAddress;
    updateOrder({
      id: id,
      customerName: customerName,
      status: status,
      deliveryAddress: newDeliveryAddress,
      creationDate: creationDate,
      totalOrderPrice: totalOrderPrice,
      email: email,
      paymentType: paymentType,
      phoneNumber: phoneNumber,
      userId: newUserId,
      shopId: newShopId === null ? null : parseInt(newShopId),
    }, authAxios)
      .then((updatedOrder) => {
        if (updatedOrder !== 400 && updatedOrder !== 401 && updatedOrder !== 404) {
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
  const date = new Date(creationDate);
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
            type="number"
            className="form-control"
            value={id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-creation-date">Creation date</label>
          <input
            type="text"
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
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
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
            type="text"
            className="form-control"
            value={deliveryAddress ?? ""}
            onChange={(e) => {
              setDeliveryAddress(e.target.value);
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
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
            className="form-select"
            value={paymentType}
            onChange={(e) => {
              setPaymentType(e.target.value);
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
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
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
            className="form-select"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
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
            type="number"
            className="form-control"
            value={totalOrderPrice}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-userid">User ID</label>
          <input
            id="order-userid"
            type="text"
            className="form-control"
            value={userId ?? ""}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </div>
        <div style={userIdErrorInput.styles} className="error-input">
          {userIdErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="order-shopid">Shop ID</label>
          <input
            id="order-shopid"
            type="number"
            className="form-control"
            value={shopId ?? ""}
            onChange={(e) => {
              setShopId(e.target.value);
            }}
          />
        </div>
        <div style={shopIdErrorInput.styles} className="error-input">
          {shopIdErrorInput.message}
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
