import { useState } from "react";
import { RegisterUserProp } from "../../helpers/Interfaces";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../../functions/authFunctions";
import { fetchUserDataById } from "../../functions/userFunctions";

export default function Register() {
  const [formData, setFormData] = useState<RegisterUserProp>({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const contextState: ContextStateType = useMyContext();
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    register(formData)
      .then(() => {
        fetchUserDataById(null)
          .then((user) => {
            contextState.setAuthUserProp(user);
            console.log(`User ${user.userName} has just registered.`);
            navigate("/account/profile", { replace: true });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <div className="auth-heading">Реєстрація користувача</div>
      <div className="auth-form-wrapper">
        <form className="auth-form">
          <div className="auth-form-input-block">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-login">Логін</label>
            </div>
            <div className="form-input-block-element">
              <input
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
          <div className="auth-form-input-block">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-password">Пароль</label>
            </div>
            <div className="form-input-block-element">
              <input
                type="text"
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
          <div className="auth-form-input-block">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-fname">Ім'я</label>
            </div>
            <div className="form-input-block-element">
              <input
                type="text"
                id="user-fname"
                name="user_fname"
                placeholder="Ваше ім'я"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    firstName: e.target.value,
                  }));
                }}
              />
            </div>
            <div id="error-fname" className="error-input">
              Введіть ваше ім'я
            </div>
          </div>
          <div className="auth-form-input-block">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-phone">Номер телефону</label>
            </div>
            <div className="form-input-block-element">
              <input
                type="text"
                id="user-phone"
                name="user_phone"
                placeholder="Ваш номер телефону"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    phoneNumber: e.target.value,
                  }));
                }}
              />
            </div>
            <div id="error-phone" className="error-input">
              Введіть ваш номер телефону
            </div>
          </div>
          <div className="auth-form-input-block">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-email">Електронна пошта</label>
            </div>
            <div className="form-input-block-element">
              <input
                type="text"
                id="user-email"
                name="user_email"
                placeholder="Ваша електронна пошта"
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div id="error-email" className="error-input">
              Введіть вашу електронну пошту
            </div>
          </div>
        </form>
        <button className="auth-button" onClick={handleRegisterClick}>
          Зареєструватись
        </button>
      </div>
    </main>
  );
}
