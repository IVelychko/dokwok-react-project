import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { auth } = useAuth();
  const user = auth!.user;
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/account/profile/edit");
  };

  return (
    <div className="account-profile">
      <div className="account-heading">Профіль</div>
      <div className="profile-content">
        <div className="profile-line">
          <img src="/src/assets/profile/user.png" alt="profile" />
          <div className="profile-line-info">
            <div className="profile-line-info-item">
              <div className="name-value-pair">
                <div className="profile-line-name">Логін</div>
                <div className="profile-line-value">{user.userName}</div>
              </div>
            </div>
            <div style={{ marginTop: 15 }} className="profile-line-info-item">
              <div className="name-value-pair">
                <div className="profile-line-name">Ім'я</div>
                <div className="profile-line-value">{user.firstName}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-line">
          <img src="/src/assets/profile/email.png" alt="email" />
          <div className="profile-line-info">
            <div className="profile-line-info-item">
              <div className="name-value-pair">
                <div className="profile-line-name">Електронна пошта</div>
                <div className="profile-line-value">{user.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ border: "none" }} className="profile-line">
          <img src="/src/assets/profile/telephone.png" alt="phone" />
          <div className="profile-line-info">
            <div className="profile-line-info-item">
              <div className="name-value-pair">
                <div className="profile-line-name">Номер телефону</div>
                <div className="profile-line-value">{user.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={handleEditClick}
          style={{ marginTop: 15 }}
          className="regular-button"
        >
          Змінити особисті дані
        </button>
      </div>
    </div>
  );
}
