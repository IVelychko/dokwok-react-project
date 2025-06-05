import { Link, useLoaderData } from "react-router-dom";
import { User } from "../../../models/dataTransferObjects";
import { ReactNode, useState } from "react";
import {
  deleteUserById,
  getAllCustomers,
} from "../../../repositories/userRepository";
import useAuthAxios from "../../../hooks/useAuthAxios";

export default function AdminUsers() {
  const authAxios = useAuthAxios();
  const loadedUsers: User[] = useLoaderData() as User[];
  const [users, setUsers] = useState<User[]>(loadedUsers);
  const userRows: ReactNode[] = [];
  const handleDeleteClick = (id: number) => {
    deleteUserById(id, authAxios)
      .then(() => {
        getAllCustomers(authAxios)
          .then((freshUsers) => {
            if (freshUsers !== 401) {
              setUsers(freshUsers);
            } else {
              throw new Error("User is not authorized");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => console.error(error));
  };
  users.forEach((user) => {
    userRows.push(
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.userName}</td>
        <td>
          <Link
            to={`/admin/users/details/${user.id}`}
            className="btn btn-info btn-sm admin-products-button"
          >
            Details
          </Link>
          <Link
            to={`/admin/users/edit/${user.id}`}
            className="btn btn-warning btn-sm admin-products-button"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(user.id)}
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
            <th>User name</th>
            <td></td>
          </tr>
        </thead>
        <tbody>{userRows}</tbody>
      </table>
      <Link className="btn btn-primary" to={"/admin/users/create"}>
        Create
      </Link>
    </div>
  );
}
