import {
  isEmailTaken,
  isPhoneNumberTaken,
  isUserNameTaken,
} from "../repositories/userRepository";
import { ErrorInput } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

export async function validateUserName(
  currentUserName: string,
  userName: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
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
    try {
      if (currentUserName !== userName) {
        const checker = await isUserNameTaken(userName);
        if (checker === 400) {
          throw new Error("BadRequest");
        } else if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "Введений логін вже зайнятий",
          });
          isValid = false;
        } else {
          setErrorInput({
            message: errorInput.message,
            styles: { display: "none" },
          });
        }
      } else {
        setErrorInput({
          message: errorInput.message,
          styles: { display: "none" },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return isValid;
}

export function validatePassword(
  password: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
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

export function validateFirstName(
  firstName: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (firstName === null || firstName === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваше ім'я",
    });
    isValid = false;
  } else if (!RegularExpressions.FirstName.test(firstName)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваше коректне ім'я",
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

export async function validatePhoneNumber(
  currentPhoneNumber: string,
  phoneNumber: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (phoneNumber === null || phoneNumber === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш номер телефону",
    });
    isValid = false;
  } else if (!RegularExpressions.PhoneNumber.test(phoneNumber)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть ваш коректний номер телефону",
    });
    isValid = false;
  } else {
    try {
      if (currentPhoneNumber !== phoneNumber) {
        const checker = await isPhoneNumberTaken(phoneNumber);
        if (checker === 400) {
          throw new Error("BadRequest");
        } else if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "Введений номер телефону вже зайнятий",
          });
          isValid = false;
        } else {
          setErrorInput({
            message: errorInput.message,
            styles: { display: "none" },
          });
        }
      } else {
        setErrorInput({
          message: errorInput.message,
          styles: { display: "none" },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return isValid;
}

export async function validateEmail(
  currentEmail: string,
  email: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (email === null || email === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть вашу електронну пошту",
    });
    isValid = false;
  } else if (!RegularExpressions.Email.test(email)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть вашу коректну електронну пошту",
    });
    isValid = false;
  } else {
    try {
      if (currentEmail !== email) {
        const checker = await isEmailTaken(email);
        if (checker === 400) {
          throw new Error("BadRequest");
        } else if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "Введена електронна пошта вже зайнята",
          });
          isValid = false;
        } else {
          setErrorInput({
            message: errorInput.message,
            styles: { display: "none" },
          });
        }
      } else {
        setErrorInput({
          message: errorInput.message,
          styles: { display: "none" },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return isValid;
}
