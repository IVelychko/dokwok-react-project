import { Link, useLoaderData } from "react-router-dom";
import { ProductDataProp } from "../../../helpers/Interfaces";

export default function ProductDetails() {
  const product: ProductDataProp = useLoaderData() as ProductDataProp;
  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{product.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{product.description}</td>
          </tr>
          <tr>
            <th>Category ID</th>
            <td>{product.categoryId}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{product.categoryName}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{product.price}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{product.weight}</td>
          </tr>
          <tr>
            <th>Measurement unit</th>
            <td>{product.measurementUnit}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/products/edit/${product.id}`}
      >
        Edit
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to="/admin/products"
      >
        Back
      </Link>
    </div>
  );
}
