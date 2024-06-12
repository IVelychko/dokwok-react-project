import { Link, useLoaderData } from "react-router-dom";
import { OrderLineProp } from "../../../helpers/Interfaces";

export default function OrderLineDetails() {
  const orderLine: OrderLineProp = useLoaderData() as OrderLineProp;

  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{orderLine.id}</td>
          </tr>
          <tr>
            <th>Order ID</th>
            <td>{orderLine.orderId}</td>
          </tr>
          <tr>
            <th>Product ID</th>
            <td>{orderLine.productId}</td>
          </tr>
          <tr>
            <th>Product name</th>
            <td>{orderLine.product.name}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{orderLine.quantity}</td>
          </tr>
          <tr>
            <th>Line price</th>
            <td>{orderLine.totalLinePrice}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/order-lines/edit/${orderLine.id}`}
      >
        Edit
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to={`/admin/orders/details/${orderLine.orderId}`}
      >
        Back
      </Link>
    </div>
  );
}
