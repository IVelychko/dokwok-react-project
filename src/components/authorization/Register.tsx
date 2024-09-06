import { useState } from "react";
import { ErrorInput } from "../../helpers/Interfaces";
import { useNavigate } from "react-router-dom";
import { register } from "../../repositories/authRepository";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
} from "../../validation/userRegisterValidation";
import { RegisterUserRequest } from "../../models/requests";
import useAuth from "../../hooks/useAuth";
import { storeAccessToken } from "../../helpers/accessTokenManagement";
import { storeUserId } from "../../helpers/userIdManagement";

export default function Register() {
  const [formData, setFormData] = useState<RegisterUserRequest>({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
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
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInput>({
      styles: { display: "none" },
      message: "Введене некоректне ім'я",
    });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введений некоректний номер телефону",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введена некоректна електронна пошта",
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden" },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateUserName(
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
    validationResults.push(
      validateFirstName(
        formData.firstName,
        firstNameErrorInput,
        setFirstNameErrorInput
      )
    );
    validationResults.push(
      await validatePhoneNumber(
        formData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      await validateEmail(formData.email, emailErrorInput, setEmailErrorInput)
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

  const handleRegisterClick = () => {
    register(formData)
      .then((user) => {
        if (user !== 400) {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "hidden" },
          }));
          setAuth({ user: user });
          storeAccessToken(user.token);
          storeUserId(user.id);
          console.log(`User ${user.userName} has just registered.`);
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
      <div className="auth-heading">Реєстрація користувача</div>
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
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-fname">Ім'я</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
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
            <div style={firstNameErrorInput.styles} className="error-input">
              {firstNameErrorInput.message}
            </div>
          </div>
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-phone">Номер телефону</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
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
            <div style={phoneErrorInput.styles} className="error-input">
              {phoneErrorInput.message}
            </div>
          </div>
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-email">Електронна пошта</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
                type="email"
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
            <div style={emailErrorInput.styles} className="error-input">
              {emailErrorInput.message}
            </div>
          </div>
        </form>
        <button
          className="auth-button"
          onClick={() => {
            validateFormData()
              .then((result) => {
                if (result) {
                  console.log("The data is valid.");
                  handleRegisterClick();
                } else {
                  console.log("The data is not valid.");
                }
              })
              .catch((error) => console.error(error));
          }}
        >
          Зареєструватись
        </button>
      </div>
    </main>
  );
}
