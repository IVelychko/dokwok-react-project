import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { logOut } from "../../functions/authFunctions";
import { AuthUserProp } from "../../helpers/Interfaces";
import { useEffect } from "react";

export default function AccountLayout() {
  const user: AuthUserProp = useLoaderData() as AuthUserProp;
  const contextState: ContextStateType = useMyContext();
  const handleUserChange = contextState.setAuthUserProp;
  const navigate = useNavigate();

  useEffect(() => {
    handleUserChange(user);
    console.log("AccountLayout effect");
  }, [handleUserChange, user]);

  const handleLogOutClick = () => {
    logOut()
      .then(() => {
        handleUserChange({
          id: "",
          firstName: "",
          userName: "",
          email: "",
          phoneNumber: "",
        });
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
          <Outlet context={contextState satisfies ContextStateType} />
        </div>
      </div>
    </main>
  );
}
