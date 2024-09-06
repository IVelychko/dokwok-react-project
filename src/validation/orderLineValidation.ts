import { getOrderLineByOrderAndProductIds } from "../repositories/orderLineRepository";
import { getProduct } from "../repositories/productRepository";
import { ErrorInput } from "../helpers/Interfaces";
import { AxiosInstance } from "axios";

export async function validateProductIdCreate(
  orderId: number,
  productId: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void,
  axiosInstance: AxiosInstance
): Promise<boolean> {
  let isValid = true;
  if (isNaN(parseInt(productId))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a product ID",
    });
    isValid = false;
  } else if (parseInt(productId) < 1) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct product ID",
    });
    isValid = false;
  } else {
    try {
      const product = await getProduct(parseInt(productId));
      if (product === 404) {
        setErrorInput({
          styles: { display: "block" },
          message: "There is no product with this ID",
        });
        return false;
      }
      const orderLine = await getOrderLineByOrderAndProductIds(
        orderId,
        parseInt(productId),
        axiosInstance
      );
      if (orderLine !== 404) {
        setErrorInput({
          styles: { display: "block" },
          message:
            "An order line with these order and product IDs already exists",
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

export async function validateProductIdEdit(
  orderId: number,
  currentProductId: number,
  productId: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void,
  axiosInstance: AxiosInstance
): Promise<boolean> {
  let isValid = true;
  if (isNaN(parseInt(productId))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a product ID",
    });
    isValid = false;
  } else if (parseInt(productId) < 1) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct product ID",
    });
    isValid = false;
  } else {
    try {
      if (currentProductId !== parseInt(productId)) {
        const product = await getProduct(parseInt(productId));
        if (product === 404) {
          setErrorInput({
            styles: { display: "block" },
            message: "There is no product with this ID",
          });
          return false;
        }
        const orderLine = await getOrderLineByOrderAndProductIds(
          orderId,
          parseInt(productId),
          axiosInstance
        );
        if (orderLine !== 404) {
          setErrorInput({
            styles: { display: "block" },
            message:
              "An order line with these order and product IDs already exists",
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

export function validateQuantity(
  quantity: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (isNaN(parseInt(quantity))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a quantity",
    });
    isValid = false;
  } else if (parseInt(quantity) < 0) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct quantity",
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
