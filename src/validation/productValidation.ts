import { isProductNameTaken } from "../repositories/productRepository";
import { ErrorInput } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";
import { getProductCategory } from "../repositories/productCategoryRepository";

export async function validateNameCreate(
  name: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (name === null || name === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a name",
    });
    isValid = false;
  } else if (!RegularExpressions.RegularString.test(name)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct name",
    });
    isValid = false;
  } else {
    try {
      const checker = await isProductNameTaken(name);
      if (checker === 400) {
        throw new Error("Bad Request");
      } else if (checker.isTaken) {
        setErrorInput({
          styles: { display: "block" },
          message: "The entered name is already taken",
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

export async function validateNameEdit(
  currentProductName: string,
  name: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (name === null || name === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a name",
    });
    isValid = false;
  } else if (!RegularExpressions.RegularString.test(name)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct name",
    });
    isValid = false;
  } else {
    try {
      if (currentProductName !== name) {
        const checker = await isProductNameTaken(name);
        if (checker === 400) {
          throw new Error("Bad Request");
        } else if (checker.isTaken) {
          setErrorInput({
            styles: { display: "block" },
            message: "The entered name is already taken",
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

export function validateDescription(
  description: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (description === null || description === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a description",
    });
    isValid = false;
  } else if (!RegularExpressions.RegularString.test(description)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct description",
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

export async function validateCategoryId(
  categoryId: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  let isValid = true;
  if (isNaN(parseInt(categoryId))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a category ID",
    });
    isValid = false;
  } else if (parseInt(categoryId) < 1) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct category ID",
    });
    isValid = false;
  } else {
    try {
      const category = await getProductCategory(parseInt(categoryId));
      if (category === 404) {
        setErrorInput({
          styles: { display: "block" },
          message: "There is no category with this ID",
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

export function validatePrice(
  price: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (isNaN(parseFloat(price))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a price",
    });
    isValid = false;
  } else if (parseFloat(price) < 0) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct price",
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

export function validateWeight(
  weight: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (isNaN(parseFloat(weight))) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a weight",
    });
    isValid = false;
  } else if (parseFloat(weight) < 0) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct weight",
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

export function validateMeasurementUnit(
  measurementUnit: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (measurementUnit === null || measurementUnit === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a measurement unit",
    });
    isValid = false;
  } else if (!RegularExpressions.RegularString.test(measurementUnit)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct measurement unit",
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
