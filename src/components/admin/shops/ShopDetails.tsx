import { Link, useLoaderData } from "react-router-dom";
import { Shop } from "../../../models/dataTransferObjects";

export default function ShopDetails() {
  const shop: Shop = useLoaderData() as Shop;
  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{shop.id}</td>
          </tr>
          <tr>
            <th>Street</th>
            <td>{shop.street}</td>
          </tr>
          <tr>
            <th>Building</th>
            <td>{shop.building}</td>
          </tr>
          <tr>
            <th>Opening time</th>
            <td>{shop.openingTime}</td>
          </tr>
          <tr>
            <th>Closing time</th>
            <td>{shop.closingTime}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/shops/edit/${shop.id}`}
      >
        Edit
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to="/admin/shops"
      >
        Back
      </Link>
    </div>
  );
}
