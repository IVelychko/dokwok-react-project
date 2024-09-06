import { Link, useLoaderData } from "react-router-dom";
import { ProductCategory } from "../../../models/dataTransferObjects";
import { ReactNode, useState } from "react";
import { deleteCategory, getAllProductCategories } from "../../../repositories/productCategoryRepository";
import useAuthAxios from "../../../hooks/useAuthAxios";

export default function AdminCategories() {
  const authAxios = useAuthAxios();
  const categoryData: ProductCategory[] = useLoaderData() as ProductCategory[];
  const [categories, setCategories] = useState<ProductCategory[]>(categoryData);
  const categoryRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteCategory(id, authAxios)
      .then(() => {
        getAllProductCategories()
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
