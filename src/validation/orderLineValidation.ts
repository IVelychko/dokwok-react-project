import { fetchOrderLineByOrderAndProductIds } from "../repositories/orderRepository";
import { getProduct } from "../repositories/productRepository";
import { ErrorInputProp } from "../helpers/Interfaces";

export async function validateProductIdCreate(
  orderId: number,
  productId: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
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
      if (product === null) {
        setErrorInput({
          styles: { display: "block" },
          message: "There is no product with this ID",
        });
        return false;
      }
      const orderLine = await fetchOrderLineByOrderAndProductIds(
        orderId,
        parseInt(productId)
      );
      if (orderLine !== null) {
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
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
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
        if (product === null) {
          setErrorInput({
            styles: { display: "block" },
            message: "There is no product with this ID",
          });
          return false;
        }
        const orderLine = await fetchOrderLineByOrderAndProductIds(
          orderId,
          parseInt(productId)
        );
        if (orderLine !== null) {
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
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
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
