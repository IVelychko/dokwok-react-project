import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorInputProp, RegisterUserProp } from "../../../helpers/Interfaces";
import { addUser } from "../../../functions/userFunctions";
import {
  validateEmailCreate,
  validateFirstName,
  validatePassword,
  validatePhoneNumberCreate,
  validateUserNameCreate,
} from "../../../validation/userValidation";

export default function CreateUser() {
  const [formData, setFormData] = useState<RegisterUserProp>({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
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
  const [passwordErrorInput, setPasswordErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct password",
  });
  const navigate = useNavigate();

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateUserNameCreate(
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
      await validatePhoneNumberCreate(
        formData.phoneNumber,
        phoneErrorInput,
        setPhoneErrorInput
      )
    );
    validationResults.push(
      await validateEmailCreate(
        formData.email,
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

  const handleCreateClick = () => {
    addUser(formData)
      .then((addedUser) => {
        if (addedUser !== null) {
          console.log(
            `User ${addedUser.userName} was added with ID: ${addedUser.id}`
          );
          navigate("/admin/users");
        } else {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible", marginTop: 0 },
          }));
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create a User
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="user-firstname">First name</label>
          <input
            id="user-firstname"
            type="text"
            className="form-control"
            value={formData.firstName}
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-username">User name</label>
          <input
            id="user-username"
            type="text"
            className="form-control"
            value={formData.userName}
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-email">Email</label>
          <input
            id="user-email"
            type="email"
            className="form-control"
            value={formData.email}
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-phone">Phone number</label>
          <input
            id="user-phone"
            type="text"
            className="form-control"
            value={formData.phoneNumber}
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="user-password">Password</label>
          <input
            type="password"
            id="user-password"
            className="form-control"
            value={formData.password}
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
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              validateFormData()
                .then((result) => {
                  if (result) {
                    console.log("The data is valid.");
                    handleCreateClick();
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
    </div>
  );
}
