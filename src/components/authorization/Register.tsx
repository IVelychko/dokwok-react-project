export default function Register() {
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
              />
            </div>
            <div id="error-email" className="error-input">
              Введіть вашу електронну пошту
            </div>
          </div>
        </form>
        <button className="auth-button">Зареєструватись</button>
      </div>
    </main>
  );
}
