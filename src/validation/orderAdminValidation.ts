import { getShopById } from "../repositories/shopRepository";
import { getCustomerById } from "../repositories/userRepository";
import { ErrorInput } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";
import { AxiosInstance } from "axios";

export function validateFirstName(
  firstName: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
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
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
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
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
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

export async function validateDeliveryAddressAndShopId(
  deliveryAddress: string | null,
  shopId: string | null,
  addressErrorInput: ErrorInput,
  setAddressErrorInput: (errorInput: ErrorInput) => void,
  shopIdErrorInput: ErrorInput,
  setShopIdErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (
    (deliveryAddress === null || deliveryAddress === "") &&
    (shopId === null || shopId === "")
  ) {
    setAddressErrorInput({
      styles: { display: "block" },
      message:
        "You must enter delivery address or shop ID. Both cannot be empty",
    });
    setShopIdErrorInput({
      styles: { display: "block" },
      message:
        "You must enter delivery address or shop ID. Both cannot be empty",
    });
    isValid = false;
  } else if (
    deliveryAddress !== null &&
    deliveryAddress !== "" &&
    (shopId === null || shopId === "")
  ) {
    if (!RegularExpressions.Address.test(deliveryAddress)) {
      setAddressErrorInput({
        styles: { display: "block" },
        message: "Enter a correct delivery address",
      });
      isValid = false;
    } else {
      setAddressErrorInput({
        message: addressErrorInput.message,
        styles: { display: "none" },
      });
      setShopIdErrorInput({
        message: shopIdErrorInput.message,
        styles: { display: "none" },
      });
    }
  } else if (
    (deliveryAddress === null || deliveryAddress === "") &&
    shopId !== null &&
    shopId !== ""
  ) {
    if (isNaN(parseInt(shopId))) {
      setShopIdErrorInput({
        styles: { display: "block" },
        message: "Enter a number for shop ID",
      });
      isValid = false;
    } else if (parseInt(shopId) < 1) {
      setShopIdErrorInput({
        styles: { display: "block" },
        message: "Enter a correct shop ID",
      });
      isValid = false;
    } else {
      try {
        const shop = await getShopById(parseInt(shopId));
        if (shop === 404) {
          setShopIdErrorInput({
            styles: { display: "block" },
            message: "There is no shop with this ID",
          });
          isValid = false;
        } else {
          setAddressErrorInput({
            message: addressErrorInput.message,
            styles: { display: "none" },
          });
          setShopIdErrorInput({
            message: shopIdErrorInput.message,
            styles: { display: "none" },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else if (
    deliveryAddress !== null &&
    deliveryAddress !== "" &&
    shopId !== null &&
    shopId !== ""
  ) {
    setAddressErrorInput({
      styles: { display: "block" },
      message:
        "You must enter delivery address or shop ID. Both cannot be filled in",
    });
    setShopIdErrorInput({
      styles: { display: "block" },
      message:
        "You must enter delivery address or shop ID. Both cannot be filled in",
    });
    isValid = false;
  }
  return isValid;
}

export async function validateShopId(
  shopId: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (parseInt(shopId) < 1) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct shop ID",
    });
    isValid = false;
  } else {
    try {
      const shop = await getShopById(parseInt(shopId));
      if (shop === 404) {
        setErrorInput({
          styles: { display: "block" },
          message: "There is no shop with this ID",
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

export async function validateUserId(
  userId: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void,
  axiosInstance: AxiosInstance
): Promise<boolean> {
  let isValid = true;
  if (parseInt(userId) < 1) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct user ID",
    });
    isValid = false;
  } else {
    try {
      const user = await getCustomerById(parseInt(userId), axiosInstance);
      if (user === 404) {
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
