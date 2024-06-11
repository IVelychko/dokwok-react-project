import { Link, useLoaderData } from "react-router-dom";
import { AuthUserProp } from "../../helpers/Interfaces";

export default function UserDetails() {
  const user: AuthUserProp = useLoaderData() as AuthUserProp;
  return (
    <div className="col">
      <h3 className="bg-info text-white text-center p-1">Details</h3>
      <table className="table table-sm table-bordered table-striped">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>User name</th>
            <td>{user.userName}</td>
          </tr>
          <tr>
            <th>First name</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Phone number</th>
            <td>{user.phoneNumber}</td>
          </tr>
        </tbody>
      </table>
      <Link
        className="btn btn-warning admin-products-button"
        to={`/admin/users/edit/${user.id}`}
      >
        Edit
      </Link>
      <Link
        className="btn btn-secondary admin-products-button"
        to="/admin/users"
      >
        Back
      </Link>
    </div>
  );
}
