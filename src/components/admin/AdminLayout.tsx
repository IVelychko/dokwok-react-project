import { Link, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../../repositories/authRepository";
import { removeAccessToken } from "../../helpers/accessTokenManagement";
import { removeUserId } from "../../helpers/userIdManagement";
import useAuth from "../../hooks/useAuth";
export default function AdminLayout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logOut()
      .then((response) => {
        if (response === 400) {
          throw new Error("Bad Request");
        }
        removeAccessToken();
        removeUserId();
        setAuth(null);
        navigate("/admin/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex-wrapper">
      <div className="admin-header">
        <span className="admin-header-logo">DokWok Administration</span>
        <button className="btn btn-sm btn-primary" onClick={handleLogOutClick}>
          Log Out
        </button>
      </div>
      <div className="container-fluid">
        <div className="row p-2">
          <div className="col-3">
            <div className="d-grid gap-1">
              <Link className="btn btn-outline-primary" to="/admin/products">
                Products
              </Link>
              <Link className="btn btn-outline-primary" to="/admin/categories">
                Categories
              </Link>
              <Link className="btn btn-outline-primary" to="/admin/users">
                Users
              </Link>
              <Link className="btn btn-outline-primary" to="/admin/orders">
                Orders
              </Link>
              <Link className="btn btn-outline-primary" to="/admin/shops">
                Shops
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
