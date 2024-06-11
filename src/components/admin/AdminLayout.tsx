import { Link, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../../functions/authFunctions";
export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logOut()
      .then(() => navigate("/admin/login"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex-wrapper">
      <div className="bg-info text-white p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <span className="navbar-brand ml-2">DokWok Administration</span>
            </div>
            <div className="col-2 text-right">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleLogOutClick}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
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
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
