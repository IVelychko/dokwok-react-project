import { Link, useLoaderData } from "react-router-dom";
import { ProductCategoryDataProp } from "../../../helpers/Interfaces";

export default function CategoryDetails() {
  const category: ProductCategoryDataProp =
    useLoaderData() as ProductCategoryDataProp;
  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{category.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{category.name}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/categories/edit/${category.id}`}
      >
        Edit
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to="/admin/categories"
      >
        Back
      </Link>
    </div>
  );
}
