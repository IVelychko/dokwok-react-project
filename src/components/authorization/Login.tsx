import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserProp } from "../../helpers/Interfaces";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { login } from "../../functions/authFunctions";
import { fetchUserDataById } from "../../functions/userFunctions";

export default function Login() {
  const [formData, setFormData] = useState<LoginUserProp>({
    userName: "",
    password: "",
  });
  const contextState: ContextStateType = useMyContext();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    login(formData)
      .then(() => {
        fetchUserDataById(null)
          .then((user) => {
            contextState.setAuthUserProp(user);
            console.log(`User ${user.userName} has just logged in.`);
            navigate("/account/profile", { replace: true });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <div className="auth-heading">Вхід в особистий кабінет</div>
      <div className="auth-form-wrapper">
        <form className="auth-form">
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-login">Логін</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
                type="text"
                id="user-login"
                name="user_login"
                placeholder="Ваш логін"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    userName: e.target.value,
                  }));
                }}
              />
            </div>
            <div id="error-login" className="error-input">
              Введіть ваш логін
            </div>
          </div>
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-password">Пароль</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
                type="password"
                id="user-password"
                name="user_password"
                placeholder="Ваш пароль"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <div id="error-password" className="error-input">
              Введіть ваш пароль
            </div>
          </div>
        </form>
        <button className="auth-button" onClick={handleLoginClick}>
          Увійти
        </button>
      </div>
      <div className="auth-no-account">
        <div
          style={{
            fontFamily: "Roboto, Arial, Helvetica, sans-serif",
          }}
        >
          Немає акаунту?
        </div>
        <Link to="/register" className="auth-register-link">
          Зареєструйтесь
        </Link>
      </div>
    </main>
  );
}
