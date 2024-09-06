import { Link, useLoaderData } from "react-router-dom";
import { Product } from "../../../models/dataTransferObjects";
import { ReactNode, useState } from "react";
import {
  deleteProduct,
  getAllProducts,
} from "../../../repositories/productRepository";
import useAuthAxios from "../../../hooks/useAuthAxios";

export default function AdminProducts() {
  const authAxios = useAuthAxios();
  const productData: Product[] = useLoaderData() as Product[];
  const [products, setProducts] = useState<Product[]>(productData);
  const productRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteProduct(id, authAxios)
      .then(() => {
        getAllProducts(null)
          .then((freshProducts) => {
            setProducts(freshProducts);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  products.forEach((product) => {
    productRows.push(
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.categoryName}</td>
        <td>{product.price}</td>
        <td>{product.weight}</td>
        <td>{product.measurementUnit}</td>
        <td>
          <Link
            to={`/admin/products/details/${product.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/products/edit/${product.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(product.id)}
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
            <th>Category</th>
            <th>Price</th>
            <th>Weight</th>
            <th>Measurement unit</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{productRows}</tbody>
      </table>
      <Link className="btn btn-primary" to={"/admin/products/create"}>
        Create
      </Link>
    </div>
  );
}
