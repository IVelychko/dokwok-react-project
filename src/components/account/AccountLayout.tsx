import { Link, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../../repositories/authRepository";
import useAuth from "../../hooks/useAuth";
import { removeAccessToken } from "../../helpers/accessTokenManagement";
import { removeUserId } from "../../helpers/userIdManagement";

export default function AccountLayout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    logOut()
      .then(response => {
        if (response === 400) {
          throw new Error("Bad Request");
        }
        removeAccessToken();
        removeUserId();
        setAuth(null);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <div className="account-wrapper">
        <div className="account-side-bar">
          <nav>
            <Link className="profile-nav-item" to="profile">
              <img
                className="profile-nav-icon"
                alt="account"
                src="/src/assets/header/user.png"
              />
              <span>Профіль</span>
            </Link>
            <Link className="profile-nav-item" to="orders">
              <img
                className="profile-nav-icon"
                alt="account"
                src="/src/assets/profile/order.png"
              />
              <span>Історія замовлень</span>
            </Link>
          </nav>
          <button className="account-logout-button" onClick={handleLogOutClick}>
            <img
              className="profile-nav-icon"
              alt="account"
              src="/src/assets/profile/logout2.png"
            />
            <span>Вийти</span>
          </button>
        </div>
        <div className="account-content">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
