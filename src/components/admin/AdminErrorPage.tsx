import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../repositories/authRepository";

export default function AdminErrorPage() {
  const navigate = useNavigate();
  const handleLogOutClick = () => {
    logOut()
      .then(() => navigate("/admin/login"))
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
