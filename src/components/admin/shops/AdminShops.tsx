import { Link, useLoaderData } from "react-router-dom";
import { ShopProp } from "../../../helpers/Interfaces";
import { ReactNode, useState } from "react";
import { deleteShop, getAllShops } from "../../../repositories/shopRepository";

export default function AdminShops() {
  const shopData: ShopProp[] = useLoaderData() as ShopProp[];
  const [shops, setShops] = useState<ShopProp[]>(shopData);
  const shopRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteShop(id)
      .then(() => {
        getAllShops()
          .then((freshShops) => {
            setShops(freshShops);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  shops.forEach((shop) => {
    shopRows.push(
      <tr key={shop.id}>
        <td>{shop.id}</td>
        <td>{shop.street}</td>
        <td>{shop.building}</td>
        <td>{shop.openingTime}</td>
        <td>{shop.closingTime}</td>
        <td>
          <Link
            to={`/admin/shops/details/${shop.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/shops/edit/${shop.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(shop.id)}
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
            <th>Street</th>
            <th>Building</th>
            <th>Opening time</th>
            <th>Closing time</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{shopRows}</tbody>
      </table>
      <Link className="btn btn-primary" to={"/admin/shops/create"}>
        Create
      </Link>
    </div>
  );
}
