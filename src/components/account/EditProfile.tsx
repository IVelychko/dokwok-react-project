import { ReactNode, useState } from "react";
import {
  ErrorInput
} from "../../helpers/Interfaces";
import {
  updateCustomerPassword,
  updateUser,
} from "../../repositories/userRepository";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validatePhoneNumber,
  validateUserName,
} from "../../validation/editProfileValidation";
import useAuth from "../../hooks/useAuth";
import { Roles } from "../../helpers/constants";
import { UpdateUserRequest, UserPasswordChangeRequest } from "../../models/requests";
import useAuthAxios from "../../hooks/useAuthAxios";

export default function EditProfile() {
  const { auth, setAuth } = useAuth();
  const user = auth!.user;
  const isAdmin = user.roles.includes(Roles.admin);
  const navigate = useNavigate();
  const authAxios = useAuthAxios();
  const [userFormData, setUserFormData] = useState<UpdateUserRequest>({
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
  const [passwordFormData, setPasswordFormData] =
    useState<UserPasswordChangeRequest>({
      userId: user.id,
      oldPassword: "",
      newPassword: "",
    });
  const [userFormErrorInput, setUserFormErrorInput] = useState<ErrorInput>({
    styles: { visibility: "hidden" },
    message: "Введені некоректні дані",
  });
  const [passwordFormErrorInput, setPasswordFormErrorInput] =
    useState<ErrorInput>({
      styles: { visibility: "hidden" },
      message: "Введені некоректні дані",
    });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInput>({
      styles: { display: "none" },
      message: "Введене некоректне ім'я",
    });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введений некоректний логін",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введена некоректна електронна пошта",
  });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInput>({
    styles: { display: "none" },
    message: "Введений некоректний номер телефону",
  });
  const [newPasswordErrorInput, setNewPasswordErrorInput] =
    useState<ErrorInput>({
      styles: { display: "none" },
      message: "Введений некоректний пароль",
    });
  const [oldPasswordErrorInput, setOldPasswordErrorInput] =
    useState<ErrorInput>({
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
        user.userName,
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
        user.phoneNumber,
        userFormData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      await validateEmail(
        user.email,
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
    updateUser(userFormData, authAxios)
      .then((updatedUser) => {
        if (updatedUser !== 400 && updatedUser !== 401 && updatedUser !== 404) {
          user.email = updatedUser.email;
          user.firstName = updatedUser.firstName;
          user.phoneNumber = updatedUser.phoneNumber;
          user.userName = updatedUser.userName;
          setAuth({ user: user });
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
    updateCustomerPassword(passwordFormData, authAxios)
      .then((result) => {
        if (result === true) {
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
