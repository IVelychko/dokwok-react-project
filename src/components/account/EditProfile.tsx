import { ReactNode, useState } from "react";
import {
  AuthUserProp,
  ErrorInputProp,
  UserPasswordChangeProp,
} from "../../helpers/Interfaces";
import { ContextState, useMyContext } from "../../hooks/hooks";
import {
  updateCustomerPassword,
  updateUser,
} from "../../repositories/userRepository";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
} from "../../validation/editProfileValidation";

export default function EditProfile() {
  const isAdmin: boolean = useLoaderData() as boolean;
  const contextState: ContextState = useMyContext();
  const navigate = useNavigate();
  const authUser = contextState.authUserProp;
  const [userFormData, setUserFormData] = useState<AuthUserProp>({
    id: authUser.id,
    userName: authUser.userName,
    firstName: authUser.firstName,
    email: authUser.email,
    phoneNumber: authUser.phoneNumber,
  });
  const [passwordFormData, setPasswordFormData] =
    useState<UserPasswordChangeProp>({
      userId: authUser.id,
      oldPassword: "",
      newPassword: "",
    });
  const [userFormErrorInput, setUserFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden" },
    message: "Введені некоректні дані",
  });
  const [passwordFormErrorInput, setPasswordFormErrorInput] =
    useState<ErrorInputProp>({
      styles: { visibility: "hidden" },
      message: "Введені некоректні дані",
    });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Введене некоректне ім'я",
    });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний логін",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введена некоректна електронна пошта",
  });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Введений некоректний номер телефону",
  });
  const [newPasswordErrorInput, setNewPasswordErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Введений некоректний пароль",
    });
  const [oldPasswordErrorInput, setOldPasswordErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Введений некоректний пароль",
    });

  const validateUserFormData = async () => {
    setUserFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden" },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateUserName(
        authUser.userName,
        userFormData.userName,
        userNameErrorInput,
        setUserNameErrorInput
      )
    );
    validationResults.push(
      validateFirstName(
        userFormData.firstName,
        firstNameErrorInput,
        setFirstNameErrorInput
      )
    );
    validationResults.push(
      await validatePhoneNumber(
        authUser.phoneNumber,
        userFormData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      await validateEmail(
        authUser.email,
        userFormData.email,
        emailErrorInput,
        setEmailErrorInput
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

  const validatePasswordFormData = () => {
    setPasswordFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden" },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      validatePassword(
        passwordFormData.oldPassword,
        oldPasswordErrorInput,
        setOldPasswordErrorInput
      )
    );
    validationResults.push(
      validatePassword(
        passwordFormData.newPassword,
        newPasswordErrorInput,
        setNewPasswordErrorInput
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

  const handleUserSaveClick = () => {
    updateUser(userFormData, false)
      .then((user) => {
        if (user !== null) {
          contextState.setAuthUserProp(user);
          navigate("/account/profile");
        } else {
          setUserFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible" },
          }));
        }
      })
      .catch((error) => console.error(error));
  };

  const handlePasswordSaveClick = () => {
    updateCustomerPassword(passwordFormData)
      .then((result) => {
        if (!result) {
          setPasswordFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible" },
          }));
        } else {
          navigate("/account/profile");
        }
      })
      .catch((error) => console.error(error));
  };

  let changePasswordForm: ReactNode | null = null;
  if (!isAdmin) {
    changePasswordForm = (
      <>
        <div style={{ marginTop: 20 }} className="account-heading">
          Зміна паролю
        </div>
        <form className="profile-form">
          <div
            style={passwordFormErrorInput.styles}
            className="form-error-input"
          >
            {passwordFormErrorInput.message}
          </div>
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label style={{ paddingTop: 0 }} htmlFor="user-old-password">
                Старий пароль
              </label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
                type="password"
                id="user-old-password"
                name="user_old_password"
                placeholder="Ваш старий пароль"
                value={passwordFormData.oldPassword}
                onChange={(e) => {
                  setPasswordFormData((prevData) => ({
                    ...prevData,
                    oldPassword: e.target.value,
                  }));
                }}
              />
            </div>
            <div style={oldPasswordErrorInput.styles} className="error-input">
              {oldPasswordErrorInput.message}
            </div>
          </div>
          <div className="auth-form-input-block form-group">
            <div className="auth-form-input-block-element">
              <label htmlFor="user-new-password">Новий пароль</label>
            </div>
            <div className="form-input-block-element">
              <input
                className="form-control"
                type="password"
                id="user-new-password"
                name="user_new_password"
                placeholder="Ваш новий пароль"
                value={passwordFormData.newPassword}
                onChange={(e) => {
                  setPasswordFormData((prevData) => ({
                    ...prevData,
                    newPassword: e.target.value,
                  }));
                }}
              />
            </div>
            <div style={newPasswordErrorInput.styles} className="error-input">
              {newPasswordErrorInput.message}
            </div>
          </div>
        </form>
        <button
          onClick={() => {
            if (validatePasswordFormData()) {
              console.log("The data is valid.");
              handlePasswordSaveClick();
            } else {
              console.log("The data is not valid.");
            }
          }}
          style={{ marginTop: 15 }}
          className="regular-button"
        >
          Зберегти
        </button>
        <button
          style={{ marginLeft: 10 }}
          className="regular-button"
          onClick={() => navigate("/account/profile")}
        >
          Назад
        </button>
      </>
    );
  }

  return (
    <div className="account-profile">
      <div className="account-heading">Зміна особистих даних</div>
      <form className="profile-form">
        <div style={userFormErrorInput.styles} className="form-error-input">
          {userFormErrorInput.message}
        </div>
        <div className="auth-form-input-block form-group">
          <div className="auth-form-input-block-element">
            <label style={{ paddingTop: 0 }} htmlFor="user-login">
              Логін
            </label>
          </div>
          <div className="form-input-block-element">
            <input
              className="form-control"
              type="text"
              id="user-login"
              name="user_login"
              placeholder="Ваш логін"
              value={userFormData.userName}
              onChange={(e) => {
                setUserFormData((prevData) => ({
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
            <label htmlFor="user-firstname">Ім'я</label>
          </div>
          <div className="form-input-block-element">
            <input
              className="form-control"
              type="text"
              id="user-firstname"
              name="user_firstname"
              placeholder="Ваше ім'я"
              value={userFormData.firstName}
              onChange={(e) => {
                setUserFormData((prevData) => ({
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
            <label htmlFor="user-email">Електронна пошта</label>
          </div>
          <div className="form-input-block-element">
            <input
              className="form-control"
              type="email"
              id="user-email"
              name="user_email"
              placeholder="Ваша електронна пошта"
              value={userFormData.email}
              onChange={(e) => {
                setUserFormData((prevData) => ({
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
              value={userFormData.phoneNumber}
              onChange={(e) => {
                setUserFormData((prevData) => ({
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
      </form>
      <button
        onClick={() => {
          validateUserFormData()
            .then((result) => {
              if (result) {
                console.log("The data is valid.");
                handleUserSaveClick();
              } else {
                console.log("The data is not valid.");
              }
            })
            .catch((error) => console.error(error));
        }}
        style={{ marginTop: 15 }}
        className="regular-button"
      >
        Зберегти
      </button>
      <button
        style={{ marginLeft: 10 }}
        className="regular-button"
        onClick={() => navigate("/account/profile")}
      >
        Назад
      </button>
      {changePasswordForm}
    </div>
  );
}
