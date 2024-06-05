import { Link, Outlet } from "react-router-dom";
export default function AdminLayout() {
  return (
    <div className="flex-wrapper">
      <div className="bg-info text-white p-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <span className="navbar-brand ml-2">DokWok Administration</span>
            </div>
            <div className="col-2 text-right">
              <a className="btn btn-sm btn-primary" href="/account/logout">
                Log Out
              </a>
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
