import { Link, useLoaderData } from "react-router-dom";
import { OrderLineProp, OrderProp } from "../../helpers/Interfaces";
import { ReactNode, useState } from "react";
import {
  deleteOrderLine,
  fetchOrderLinesByOrder,
} from "../../functions/orderFunctions";

export default function OrderDetails() {
  const order: OrderProp = useLoaderData() as OrderProp;
  const date = new Date(order.creationDate);
  const datePart = date.toISOString().split("T")[0];
  const timePart = date.toTimeString().split(" ")[0].substring(0, 5);
  const formattedString = `${datePart}; ${timePart}`;

  const [orderLines, setOrderLines] = useState<OrderLineProp[]>(
    order.orderLines
  );
  const orderLineRows: ReactNode[] = [];

  const handleDeleteClick = (id: number) => {
    deleteOrderLine(id)
      .then(() => {
        fetchOrderLinesByOrder(order.id)
          .then((freshOrderLines) => {
            setOrderLines(freshOrderLines);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };

  orderLines.forEach((orderLine) => {
    orderLineRows.push(
      <tr key={orderLine.id}>
        <td>{orderLine.id}</td>
        <td>{orderLine.product.name}</td>
        <td>{orderLine.quantity}</td>
        <td>{orderLine.totalLinePrice}</td>
        <td>
          <Link
            to={`/admin/order-lines/details/${orderLine.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/order-lines/edit/${orderLine.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(orderLine.id)}
            className="btn btn-danger btn-sm admin-products-button"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Order details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{order.id}</td>
          </tr>
          <tr>
            <th>Creation Date</th>
            <td>{formattedString}</td>
          </tr>
          <tr>
            <th>Customer Name</th>
            <td>{order.customerName}</td>
          </tr>
          <tr>
            <th>Delivery address</th>
            <td>{order.deliveryAddress}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{order.email}</td>
          </tr>
          <tr>
            <th>Payment type</th>
            <td>{order.paymentType}</td>
          </tr>
          <tr>
            <th>Phone number</th>
            <td>{order.phoneNumber}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{order.status}</td>
          </tr>
          <tr>
            <th>Order price</th>
            <td>{order.totalOrderPrice}</td>
          </tr>
          <tr>
            <th>User ID</th>
            <td>{order.userId ?? "None"}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="bg-info text-white text-center p-1">Order lines</h3>
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product name</th>
            <th>Quantity</th>
            <th>Line price</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{orderLineRows}</tbody>
      </table>
      <Link
        className="btn btn-primary admin-products-button"
        to={`/admin/order-lines/create/order/${order.id}`}
      >
        Add order line
      </Link>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/orders/edit/${order.id}`}
      >
        Edit order
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to="/admin/orders"
      >
        Back
      </Link>
    </div>
  );
}
