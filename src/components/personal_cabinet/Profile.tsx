import { ContextStateType, useMyContext } from "../../hooks/hooks";

export default function Profile() {
  const contextState: ContextStateType = useMyContext();
  const authUser = contextState.authUserProp;

  return (
    <div className="account-profile">
      <div className="profile-heading">Профіль</div>
      <div className="profile-content">
        <div className="profile-line">
          <img alt="profile" />
          <div className="profile-line-info">
            <div className="profile-line-name">Логін</div>
            <div className="profile-line-value">{authUser.userName}</div>
          </div>
          <div className="profile-line-info">
            <div className="profile-line-name">Ім'я</div>
            <div className="profile-line-value">{authUser.firstName}</div>
          </div>
          <div className="profile-line-info">
            <div className="profile-line-name">Електронна пошта</div>
            <div className="profile-line-value">{authUser.email}</div>
          </div>
          <div className="profile-line-info">
            <div className="profile-line-name">Номер телефону</div>
            <div className="profile-line-value">{authUser.phoneNumber}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
