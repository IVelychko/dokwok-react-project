import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorInput } from "../../helpers/Interfaces";
import { customerLogin } from "../../repositories/authRepository";
import {
  validatePassword,
  validateUserName,
} from "../../validation/userLoginValidation";
import { LoginCustomerRequest } from "../../models/requests";
import useAuth from "../../hooks/useAuth";
import { storeAccessToken } from "../../helpers/accessTokenManagement";
import { storeUserId } from "../../helpers/userIdManagement";

export default function Login() {
  const [formData, setFormData] = useState<LoginCustomerRequest>({
    userName: "",
    password: "",
  });
  const [formErrorInput, setFormErrorInput] = useState<ErrorInput>({
    styles: {
      visibility: "hidden",
    },
    message: "Введені некоректні дані",
  });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInput>({
    styles: {
      display: "none",
    },
    message: "Введений некоректний логін",
  });
  const [passwordErrorInput, setPasswordErrorInput] = useState<ErrorInput>({
    styles: {
      display: "none",
    },
    message: "Введений некоректний пароль",
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const validateFormData = () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden" },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      validateUserName(
        formData.userName,
        userNameErrorInput,
        setUserNameErrorInput
      )
    );
    validationResults.push(
      validatePassword(
        formData.password,
        passwordErrorInput,
        setPasswordErrorInput
      )
    );
    let isValid = true;
    for (const result of validationResults) {
      if (!result) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleLoginClick = () => {
    customerLogin(formData)
      .then((user) => {
        if (user !== 400 && user !== 404) {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "hidden" },
          }));
          setAuth({ user: user });
          storeAccessToken(user.token);
          storeUserId(user.id);
          console.log(`User ${user.userName} has just logged in.`);
          navigate("/account/profile", { replace: true });
        } else {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible" },
          }));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <div className="auth-heading">Вхід в особистий кабінет</div>
      <div style={formErrorInput.styles} className="auth-form-error-input">
        {formErrorInput.message}
      </div>
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
            <div style={userNameErrorInput.styles} className="error-input">
              {userNameErrorInput.message}
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
            <div style={passwordErrorInput.styles} className="error-input">
              {passwordErrorInput.message}
            </div>
          </div>
        </form>
        <button
          className="auth-button"
          onClick={() => {
            if (validateFormData()) {
              console.log("The data is valid.");
              handleLoginClick();
            } else {
              console.log("The data is not valid.");
            }
          }}
        >
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
