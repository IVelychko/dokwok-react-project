import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  AuthUserProp,
  ErrorInputProp,
  UserPasswordChangeAsAdminProp,
} from "../../../helpers/Interfaces";
import {
  updateCustomerPasswordAsAdmin,
  updateUser,
} from "../../../functions/userFunctions";
import {
  validateEmailEdit,
  validateFirstName,
  validatePassword,
  validatePhoneNumberEdit,
  validateUserNameEdit,
} from "../../../validation/userValidation";

export default function EditUser() {
  const loadedUser: AuthUserProp = useLoaderData() as AuthUserProp;
  const [userFormData, setUserFormData] = useState<AuthUserProp>({
    id: loadedUser.id,
    firstName: loadedUser.firstName,
    userName: loadedUser.userName,
    email: loadedUser.email,
    phoneNumber: loadedUser.phoneNumber,
  });
  const [passwordFormData, setPasswordFormData] =
    useState<UserPasswordChangeAsAdminProp>({
      userId: loadedUser.id,
      newPassword: "",
    });
  const [userFormErrorInput, setUserFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [passwordFormErrorInput, setPasswordFormErrorInput] =
    useState<ErrorInputProp>({
      styles: { visibility: "hidden", marginTop: 0 },
      message: "Incorrect data",
    });
  const [firstNameErrorInput, setFirstNameErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct first name",
    });
  const [userNameErrorInput, setUserNameErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct user name",
  });
  const [emailErrorInput, setEmailErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct email",
  });
  const [phoneErrorInput, setPhoneErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct phone number",
  });
  const [newPasswordErrorInput, setNewPasswordErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct password",
    });
  const navigate = useNavigate();

  const validateUserFormData = async () => {
    setUserFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateUserNameEdit(
        loadedUser.userName,
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
      await validatePhoneNumberEdit(
        loadedUser.phoneNumber,
        userFormData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      await validateEmailEdit(
        loadedUser.email,
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
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResult: boolean = validatePassword(
      passwordFormData.newPassword,
      newPasswordErrorInput,
      setNewPasswordErrorInput
    );
    return validationResult;
  };

  const handleEditUserDataClick = () => {
    updateUser(userFormData, true)
      .then((updatedUser) => {
        if (updatedUser !== null) {
          console.log(`User with ID: ${updatedUser.id} was updated`);
          navigate("/admin/users");
        } else {
          setUserFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible", marginTop: 0 },
          }));
        }
      })
      .catch((error) => console.error(error));
  };

  const handleEditPasswordClick = () => {
    updateCustomerPasswordAsAdmin(passwordFormData)
      .then((result) => {
        if (result === true) {
          console.log(`User password was updated`);
          navigate("/admin/users");
        } else {
          setPasswordFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible", marginTop: 0 },
          }));
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit a User
      </div>
      <div style={userFormErrorInput.styles} className="form-error-input">
        {userFormErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="user-id">ID</label>
          <input
            id="user-id"
            className="form-control"
            value={userFormData.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-firstname">First name</label>
          <input
            id="user-firstname"
            className="form-control"
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-username">User name</label>
          <input
            id="user-username"
            className="form-control"
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-email">Email</label>
          <input
            id="user-email"
            className="form-control"
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-phone">Phone number</label>
          <input
            id="user-phone"
            className="form-control"
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
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              validateUserFormData()
                .then((result) => {
                  if (result) {
                    console.log("The data is valid.");
                    handleEditUserDataClick();
                  } else {
                    console.log("The data is not valid.");
                  }
                })
                .catch((error) => console.error(error));
            }}
          >
            Save
          </button>
          <Link
            className="btn btn-secondary admin-products-button"
            to={"/admin/users"}
          >
            Cancel
          </Link>
        </div>
      </form>
      <div
        style={{ marginTop: "0.5rem" }}
        className="bg-warning text-white text-center p-1 editor-header"
      >
        Edit a Password
      </div>
      <div style={passwordFormErrorInput.styles} className="form-error-input">
        {passwordFormErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="user-password">New password</label>
          <input
            id="user-password"
            type="password"
            className="form-control"
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
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              if (validatePasswordFormData()) {
                console.log("The data is valid.");
                handleEditPasswordClick();
              } else {
                console.log("The data is not valid.");
              }
            }}
          >
            Save
          </button>
          <Link
            className="btn btn-secondary admin-products-button"
            to={"/admin/users"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
