import { Link, useLoaderData } from "react-router-dom";
import { AuthUserProp } from "../../helpers/Interfaces";
import { ReactNode, useState } from "react";
import { deleteUserById, fetchCustomers } from "../../functions/userFunctions";

export default function AdminUsers() {
  const userData: AuthUserProp[] = useLoaderData() as AuthUserProp[];
  const [users, setUsers] = useState<AuthUserProp[]>(userData);
  const userRows: ReactNode[] = [];
  const handleDeleteClick = (id: string) => {
    deleteUserById(id)
      .then(() => {
        fetchCustomers()
          .then((freshUsers) => {
            setUsers(freshUsers);
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
