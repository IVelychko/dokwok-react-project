import {
  isEmailTaken,
  isPhoneNumberTaken,
  isUserNameTaken,
} from "../repositories/authRepository";
import { ErrorInputProp } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

export async function validateUserNameCreate(
  userName: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (userName === null || userName === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a user name",
    });
    isValid = false;
  } else if (!RegularExpressions.UserName.test(userName)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct user name",
    });
    isValid = false;
  } else {
    try {
      const checker = await isUserNameTaken(userName);
      if (checker.isTaken) {
        setErrorInput({
          styles: { display: "block" },
          message: "The entered user name is already taken",
        });
        isValid = false;
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

export async function validateUserNameEdit(
  currentUserName: string,
  userName: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (userName === null || userName === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a user name",
    });
    isValid = false;
  } else if (!RegularExpressions.UserName.test(userName)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct user name",
    });
    isValid = false;
  } else {
    try {
      if (currentUserName !== userName) {
        const checker = await isUserNameTaken(userName);
        if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "The entered user name is already taken",
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
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (password === null || password === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a password",
    });
    isValid = false;
  } else if (!RegularExpressions.Password.test(password)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct password",
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
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (firstName === null || firstName === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a first name",
    });
    isValid = false;
  } else if (!RegularExpressions.FirstName.test(firstName)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct first name",
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

export async function validatePhoneNumberCreate(
  phoneNumber: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (phoneNumber === null || phoneNumber === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a phone number",
    });
    isValid = false;
  } else if (!RegularExpressions.PhoneNumber.test(phoneNumber)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct phone number",
    });
    isValid = false;
  } else {
    try {
      const checker = await isPhoneNumberTaken(phoneNumber);
      if (checker.isTaken) {
        setErrorInput({
          styles: { display: "block" },
          message: "The entered phone number is already taken",
        });
        isValid = false;
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

export async function validatePhoneNumberEdit(
  currentPhoneNumber: string,
  phoneNumber: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (phoneNumber === null || phoneNumber === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a phone number",
    });
    isValid = false;
  } else if (!RegularExpressions.PhoneNumber.test(phoneNumber)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct phone number",
    });
    isValid = false;
  } else {
    try {
      if (currentPhoneNumber !== phoneNumber) {
        const checker = await isPhoneNumberTaken(phoneNumber);
        if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "The entered phone number is already taken",
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

export async function validateEmailCreate(
  email: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (email === null || email === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter an email",
    });
    isValid = false;
  } else if (!RegularExpressions.Email.test(email)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct email",
    });
    isValid = false;
  } else {
    try {
      const checker = await isEmailTaken(email);
      if (checker.isTaken) {
        setErrorInput({
          styles: { display: "block" },
          message: "The entered email is already taken",
        });
        isValid = false;
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

export async function validateEmailEdit(
  currentEmail: string,
  email: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (email === null || email === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter an email",
    });
    isValid = false;
  } else if (!RegularExpressions.Email.test(email)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct email",
    });
    isValid = false;
  } else {
    try {
      if (currentEmail !== email) {
        const checker = await isEmailTaken(email);
        if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "The entered email is already taken",
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
