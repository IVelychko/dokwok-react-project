import { Link, useLoaderData } from "react-router-dom";
import { ProductCategoryDataProp } from "../../../helpers/Interfaces";
import { ReactNode, useState } from "react";
import {
  deleteCategory,
  fetchProductCategoryData,
} from "../../../repositories/productRepository";

export default function AdminCategories() {
  const categoryData: ProductCategoryDataProp[] =
    useLoaderData() as ProductCategoryDataProp[];
  const [categories, setCategories] =
    useState<ProductCategoryDataProp[]>(categoryData);
  const categoryRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteCategory(id)
      .then(() => {
        fetchProductCategoryData()
          .then((freshCategories) => {
            setCategories(freshCategories);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  categories.forEach((category) => {
    categoryRows.push(
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <Link
            to={`/admin/categories/details/${category.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/categories/edit/${category.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(category.id)}
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
            <th>Name</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{categoryRows}</tbody>
      </table>
      <Link className="btn btn-primary" to={"/admin/categories/create"}>
        Create
      </Link>
    </div>
  );
}
