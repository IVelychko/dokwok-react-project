import { useState } from "react";
import { LoginAdminRequest } from "../../models/requests";
import { ErrorInput } from "../../helpers/Interfaces";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../repositories/authRepository";
import {
  validatePassword,
  validateUserName,
} from "../../validation/userLoginValidation";
import { storeAccessToken } from "../../helpers/accessTokenManagement";
import useAuth from "../../hooks/useAuth";
import { storeUserId } from "../../helpers/userIdManagement";

export default function AdminLogin() {
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState<LoginAdminRequest>({
    userName: "",
    password: "",
  });
  const [formErrorInput, setFormErrorInput] = useState<ErrorInput>({
    styles: { visibility: "hidden" },
    message: "Введені некоректні дані",
  });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введений некоректний логін",
  });
  const [passwordErrorInput, setPasswordErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введений некоректний пароль",
  });
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
    adminLogin(formData)
      .then((user) => {
        if (user !== 400 && user !== 404) {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "hidden" },
          }));
          setAuth({ user: user });
          storeAccessToken(user.token);
          storeUserId(user.id);
          navigate("/admin", { replace: true });
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
    <div className="flex-wrapper">
      <div className="admin-header">
        <span className="admin-header-logo">DokWok Administration</span>
      </div>
      <div className="container-fluid">
        <div className="auth-heading">Вхід в адміністрацію</div>
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
      </div>
    </div>
  );
}
