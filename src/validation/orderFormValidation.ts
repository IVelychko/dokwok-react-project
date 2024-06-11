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

export function validatePhoneNumber(
  phoneNumber: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
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
      message: "Введіть вашу адресу доставки",
    });
    isValid = false;
  } else if (!RegularExpressions.Address.test(deliveryAddress)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Введіть вашу коректну адресу доставки",
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

export function validatePaymentType(
  paymentType: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
): boolean {
  let isValid = true;
  if (paymentType === null || paymentType === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Оберіть тип оплати",
    });
    isValid = false;
  } else if (!RegularExpressions.PaymentType.test(paymentType)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Оберіть коректний тип оплати",
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
