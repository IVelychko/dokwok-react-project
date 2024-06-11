import { useState } from "react";
import { ErrorInputProp, RegisterUserProp } from "../../helpers/Interfaces";
import { ContextStateType, useMyContext } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../../functions/authFunctions";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
} from "../../validation/userRegisterValidation";

export default function Register() {
  const [formData, setFormData] = useState<RegisterUserProp>({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden" },
    message: "Введені некоректні дані",
  });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний логін",
  });
  const [passwordErrorInput, setPasswordErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний пароль",
  });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Введене некоректне ім'я",
    });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний номер телефону",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введена некоректна електронна пошта",
  });
  const contextState: ContextStateType = useMyContext();
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
        if (user !== null) {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "hidden" },
          }));
          contextState.setAuthUserProp(user);
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
