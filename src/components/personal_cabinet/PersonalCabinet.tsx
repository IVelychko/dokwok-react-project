import { Link, useNavigate } from "react-router-dom";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { ReactNode, useEffect } from "react";
import { isLoggedIn } from "../../functions/authFunctions";
import Profile from "./Profile";
import OrderHistory from "./OrderHistory";

interface Props {
  contentType: string;
}

export default function PersonalCabinet({ contentType }: Props) {
  const contextState: ContextStateType = useMyContext();
  const authUser = contextState.authUserProp;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("In PerspmalCabinet effect");
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

  let content: ReactNode;
  if (contentType === "Профіль") {
    content = <Profile />;
  } else if (contentType === "Історія замовлень") {
    content = <OrderHistory />;
  }
  return (
    <div className="main">
      <div className="account-wrapper">
        <div className="account-side-bar">
          <nav>
            <Link to="account/profile" replace>
              Профіль
            </Link>
            <Link to="account/orders" replace>
              Історія замовлень
            </Link>
          </nav>
          <button className="account-logout-button">Вийти</button>
        </div>
        <div className="account-content">{content}</div>
      </div>
    </div>
  );
}
