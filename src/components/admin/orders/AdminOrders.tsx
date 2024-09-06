import { Link, useLoaderData } from "react-router-dom";
import { Order } from "../../../models/dataTransferObjects";
import { ReactNode, useState } from "react";
import { deleteOrder, getAllOrders } from "../../../repositories/orderRepository";
import useAuthAxios from "../../../hooks/useAuthAxios";

export default function AdminOrders() {
  const authAxios = useAuthAxios();
  const orderData: Order[] = useLoaderData() as Order[];
  const [orders, setOrders] = useState<Order[]>(orderData);
  const orderRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteOrder(id, authAxios)
      .then(() => {
        getAllOrders(authAxios)
          .then((freshOrders) => {
            if (freshOrders !== 401) {
              setOrders(freshOrders);
            }
            throw new Error("User is not authorized to get all orders");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  orders.forEach((order) => {
    const date = new Date(order.creationDate);
    const datePart = date.toISOString().split("T")[0];
    const timePart = date.toTimeString().split(" ")[0].substring(0, 5);
    const formattedString = `${datePart}; ${timePart}`;
    orderRows.push(
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{formattedString}</td>
        <td>{order.totalOrderPrice}</td>
        <td>{order.deliveryAddress ?? "None"}</td>
        <td>{order.shopId ?? "None"}</td>
        <td>{order.status}</td>
        <td>
          <Link
            to={`/admin/orders/details/${order.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/orders/edit/${order.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(order.id)}
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
      <table className="table table-sm table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>CreationDate</th>
            <th>Price</th>
            <th>Delivery address</th>
            <th>Shop ID</th>
            <th>Status</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{orderRows}</tbody>
      </table>
    </div>
  );
}
