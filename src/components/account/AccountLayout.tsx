import { Link, Outlet, useNavigate } from "react-router-dom";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { isLoggedIn, logOut } from "../../functions/authFunctions";
import { useEffect } from "react";

export default function AccountLayout() {
  const contextState: ContextStateType = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn()
      .then((user) => {
        contextState.setAuthUserProp(user);
        console.log("User is logged in, user data is retrieved.");
      })
      .catch((error) => {
        console.error(error);
        navigate("/login");
      });
  }, []);

  const handleLogOutClick = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <div className="account-wrapper">
        <div className="account-side-bar">
          <nav>
            <Link to="profile">Профіль</Link>
            <Link to="orders">Історія замовлень</Link>
          </nav>
          <button className="account-logout-button" onClick={handleLogOutClick}>
            Вийти
          </button>
        </div>
        <div className="account-content">
          <Outlet context={contextState satisfies ContextStateType} />
        </div>
      </div>
    </main>
  );
}
