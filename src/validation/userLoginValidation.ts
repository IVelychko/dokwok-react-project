import { ErrorInputProp } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

export function validateUserName(
  userName: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (userName === null || userName === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш логін",
    });
    isValid = false;
  } else if (!RegularExpressions.UserName.test(userName)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш коректний логін",
    });
    isValid = false;
  } else {
    setErrorInput({
      message: errorInput.message,
      styles: { display: "none" },
    });
  }
  return isValid;
}

export function validatePassword(
  password: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (password === null || password === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш пароль",
    });
    isValid = false;
  } else if (!RegularExpressions.Password.test(password)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш коректний пароль",
    });
    isValid = false;
  } else {
    setErrorInput({
      message: errorInput.message,
      styles: { display: "none" },
    });
  }
  return isValid;
}
