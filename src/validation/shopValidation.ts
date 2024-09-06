import { isAddressTaken } from "../repositories/shopRepository";
import { ErrorInput } from "../helpers/Interfaces";
import { RegularExpressions } from "../helpers/constants";

export async function validateAddressCreate(
  street: string,
  building: string,
  streetErrorInput: ErrorInput,
  setStreetErrorInput: (errorInput: ErrorInput) => void,
  buildingErrorInput: ErrorInput,
  setBuildingErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  setStreetErrorInput({
    message: streetErrorInput.message,
    styles: { display: "none" },
  });
  setBuildingErrorInput({
    message: buildingErrorInput.message,
    styles: { display: "none" },
  });

  let isValid = true;
  if (street === null || street === "") {
    setStreetErrorInput({
      styles: { display: "block" },
      message: "Enter a street",
    });
    isValid = false;
  } else if (!RegularExpressions.Street.test(street)) {
    setStreetErrorInput({
      styles: { display: "block" },
      message: "Enter a correct street",
    });
    isValid = false;
  }

  if (building === null || building === "") {
    console.log("Empty or null building");
    setBuildingErrorInput({
      styles: { display: "block" },
      message: "Enter a building",
    });
    isValid = false;
  } else if (!RegularExpressions.Building.test(building)) {
    console.log("Incorrect building");
    setBuildingErrorInput({
      styles: { display: "block" },
      message: "Enter a correct building",
    });
    isValid = false;
  }

  if (isValid) {
    try {
      const checker = await isAddressTaken(street, building);
      if (checker === 400) {
        throw new Error("Bad Request");
      } else if (checker.isTaken) {
        setStreetErrorInput({
          styles: { display: "block" },
          message: "The entered street and building are already taken",
        });
        setBuildingErrorInput({
          styles: { display: "block" },
          message: "The entered street and building are already taken",
        });
        isValid = false;
      } else {
        setStreetErrorInput({
          message: streetErrorInput.message,
          styles: { display: "none" },
        });
        setBuildingErrorInput({
          message: buildingErrorInput.message,
          styles: { display: "none" },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return isValid;
}

export async function validateAddressEdit(
  currentStreet: string,
  currentBuilding: string,
  street: string,
  building: string,
  streetErrorInput: ErrorInput,
  setStreetErrorInput: (errorInput: ErrorInput) => void,
  buildingErrorInput: ErrorInput,
  setBuildingErrorInput: (errorInput: ErrorInput) => void
): Promise<boolean> {
  setStreetErrorInput({
    message: streetErrorInput.message,
    styles: { display: "none" },
  });
  setBuildingErrorInput({
    message: buildingErrorInput.message,
    styles: { display: "none" },
  });

  let isValid = true;
  if (street === null || street === "") {
    setStreetErrorInput({
      styles: { display: "block" },
      message: "Enter a street",
    });
    isValid = false;
  } else if (!RegularExpressions.Street.test(street)) {
    setStreetErrorInput({
      styles: { display: "block" },
      message: "Enter a correct street",
    });
    isValid = false;
  }

  if (building === null || building === "") {
    setBuildingErrorInput({
      styles: { display: "block" },
      message: "Enter a building",
    });
    isValid = false;
  } else if (!RegularExpressions.Building.test(building)) {
    setBuildingErrorInput({
      styles: { display: "block" },
      message: "Enter a correct building",
    });
    isValid = false;
  }

  if (isValid) {
    try {
      if (currentStreet !== street || currentBuilding !== building) {
        const checker = await isAddressTaken(street, building);
        if (checker === 400) {
          throw new Error("Bad Request");
        } else if (checker.isTaken) {
          setStreetErrorInput({
            styles: { display: "block" },
            message: "The entered street and building are already taken",
          });
          setBuildingErrorInput({
            styles: { display: "block" },
            message: "The entered street and building are already taken",
          });
          isValid = false;
        } else {
          setStreetErrorInput({
            message: streetErrorInput.message,
            styles: { display: "none" },
          });
          setBuildingErrorInput({
            message: buildingErrorInput.message,
            styles: { display: "none" },
          });
        }
      } else {
        setStreetErrorInput({
          message: streetErrorInput.message,
          styles: { display: "none" },
        });
        setBuildingErrorInput({
          message: buildingErrorInput.message,
          styles: { display: "none" },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return isValid;
}

export function validateOpeningTime(
  time: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (time === null || time === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter an opening time",
    });
    isValid = false;
  } else if (!RegularExpressions.Hour.test(time)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct opening time",
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

export function validateClosingTime(
  time: string,
  errorInput: ErrorInput,
  setErrorInput: (errorInput: ErrorInput) => void
): boolean {
  let isValid = true;
  if (time === null || time === "") {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a closing time",
    });
    isValid = false;
  } else if (!RegularExpressions.Hour.test(time)) {
    setErrorInput({
      styles: { display: "block" },
      message: "Enter a correct closing time",
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
