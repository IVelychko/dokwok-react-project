import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { OrderProp, OrderPutProp } from "../../helpers/Interfaces";
import { useState } from "react";
import { updateOrder } from "../../functions/orderFunctions";
import {
  BEINGPROCESSED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  COMPLETED_ORDER_STATUS,
} from "../../helpers/constants";

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

  const validateFormData = () => {
    if (
      formData.customerName === "" ||
      formData.customerName === null ||
      formData.status === "" ||
      formData.status === null ||
      formData.deliveryAddress === "" ||
      formData.deliveryAddress === null ||
      formData.email === "" ||
      formData.email === null ||
      formData.paymentType === "" ||
      formData.paymentType === null ||
      formData.phoneNumber === "" ||
      formData.phoneNumber === null
    ) {
      return false;
    }
    return true;
  };

  const handleEditClick = () => {
    formData.userId = formData.userId === "" ? null : formData.userId;
    updateOrder(formData)
      .then((updatedOrder) => {
        console.log(`Order with ID: ${updatedOrder.id} was updated`);
        navigate("/admin/orders");
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
      <form>
        <div className="form-group">
          <label htmlFor="order-id">ID</label>
          <input
            id="order-id"
            className="form-control"
            value={formData.id}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="order-creation-date">Creation date</label>
          <input
            id="order-creation-date"
            className="form-control"
            value={formattedString}
            disabled
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="order-price">Order price</label>
          <input
            id="order-price"
            className="form-control"
            value={formData.totalOrderPrice}
            disabled
          />
        </div>
        <div className="form-group">
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
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              if (validateFormData()) {
                console.log("The data is valid");
                handleEditClick();
              } else {
                console.log("The data is not valid");
              }
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
