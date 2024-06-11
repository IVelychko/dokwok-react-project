import { fetchCustomerDataById } from "../functions/userFunctions";
import { ErrorInputProp } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

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

export function validatePhoneNumber(
  phoneNumber: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
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
    setErrorInput({
      message: errorInput.message,
      styles: { display: "none" },
    });
  }
  return isValid;
}

export function validateEmail(
  email: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
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
    setErrorInput({
      message: errorInput.message,
      styles: { display: "none" },
    });
  }
  return isValid;
}

export function validateDeliveryAddress(
  deliveryAddress: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (deliveryAddress === null || deliveryAddress === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a delivery address",
    });
    isValid = false;
  } else if (!RegularExpressions.Address.test(deliveryAddress)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct delivery address",
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

export async function validateUserId(
  userId: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): Promise<boolean> {
  let isValid = true;
  if (!RegularExpressions.Guid.test(userId)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct user ID",
    });
    isValid = false;
  } else {
    try {
      const user = await fetchCustomerDataById(userId, true);
      if (user === null) {
        setErrorInput({
          styles: { display: "block" },
          message: "There is no user with this ID",
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
