import { isCategoryNameTaken } from "../repositories/productRepository";
import { ErrorInputProp } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

export async function validateNameCreate(
  name: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
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
      const checker = await isCategoryNameTaken(name);
      if (checker.isTaken) {
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
  currentCategoryName: string,
  name: string,
  errorInput: ErrorInputProp,
  setErrorInput: (errorInput: ErrorInputProp) => void
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
      if (currentCategoryName !== name) {
        const checker = await isCategoryNameTaken(name);
        if (checker.isTaken) {
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
