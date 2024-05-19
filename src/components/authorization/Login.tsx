import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="main">
      <div className="auth-heading">Вхід в особистий кабінет</div>
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
              />
            </div>
            <div id="error-password" className="error-input">
              Введіть ваш пароль
            </div>
          </div>
        </form>
        <button className="auth-button">Увійти</button>
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
    </div>
  );
}
