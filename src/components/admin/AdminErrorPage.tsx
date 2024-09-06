import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../repositories/authRepository";
import { removeAccessToken } from "../../helpers/accessTokenManagement";
import { removeUserId } from "../../helpers/userIdManagement";
import useAuth from "../../hooks/useAuth";

export default function AdminErrorPage() {
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
      <div className="admin-error-wrapper">
        <div
          style={{
            textAlign: "center",
            fontSize: 30,
            fontFamily: "Montserrat",
            fontWeight: 500,
            marginTop: 100,
          }}
        >
          Трапилась помилка
        </div>
        <Link
          style={{
            marginTop: 20,
            width: "fit-content",
            marginRight: "auto",
            marginLeft: "auto",
          }}
          to={"/admin"}
          className="btn btn-primary"
        >
          На головну
        </Link>
      </div>
    </div>
  );
}
