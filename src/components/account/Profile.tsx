import { ContextStateType, useMyContext } from "../../hooks/hooks";

export default function Profile() {
  const contextState: ContextStateType = useMyContext();
  const authUser = contextState.authUserProp;

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
                <div className="profile-line-value">{authUser.userName}</div>
              </div>
              <button className="profile-change-button">
                <img src="/src/assets/profile/pencil.png" alt="change" />
              </button>
            </div>
            <div style={{ marginTop: 15 }} className="profile-line-info-item">
              <div className="name-value-pair">
                <div className="profile-line-name">Ім'я</div>
                <div className="profile-line-value">{authUser.firstName}</div>
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
                <div className="profile-line-value">{authUser.email}</div>
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
                <div className="profile-line-value">{authUser.phoneNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
