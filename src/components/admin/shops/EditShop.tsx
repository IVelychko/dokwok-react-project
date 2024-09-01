import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ErrorInputProp, ShopProp } from "../../../helpers/Interfaces";
import {
  validateAddressEdit,
  validateClosingTime,
  validateOpeningTime,
} from "../../../validation/shopValidation";
import { updateShop } from "../../../repositories/shopRepository";

export default function EditShop() {
  const loadedShop: ShopProp = useLoaderData() as ShopProp;
  const [street, setStreet] = useState<string>(loadedShop.street);
  const [building, setBuilding] = useState<string>(loadedShop.building);
  const [openingTime, setOpeningTime] = useState<string>(
    loadedShop.openingTime
  );
  const [closingTime, setClosingTime] = useState<string>(
    loadedShop.closingTime
  );
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [streetErrorInput, setStreetErrorInput] = useState<ErrorInputProp>({
    styles: {
      display: "none",
    },
    message: "Enter a correct street",
  });
  const [buildingErrorInput, setBuildingErrorInput] = useState<ErrorInputProp>({
    styles: {
      display: "none",
    },
    message: "Enter a correct building",
  });
  const [openingTimeErrorInput, setOpeningTimeErrorInput] =
    useState<ErrorInputProp>({
      styles: {
        display: "none",
      },
      message: "Enter a correct opening time",
    });
  const [closingTimeErrorInput, setClosingTimeErrorInput] =
    useState<ErrorInputProp>({
      styles: {
        display: "none",
      },
      message: "Enter a correct closing time",
    });
  const navigate = useNavigate();

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateAddressEdit(
        loadedShop.street,
        loadedShop.building,
        street,
        building,
        streetErrorInput,
        setStreetErrorInput,
        buildingErrorInput,
        setBuildingErrorInput
      )
    );
    validationResults.push(
      validateOpeningTime(
        openingTime,
        openingTimeErrorInput,
        setOpeningTimeErrorInput
      )
    );
    validationResults.push(
      validateClosingTime(
        closingTime,
        closingTimeErrorInput,
        setClosingTimeErrorInput
      )
    );

    let isValid = true;
    for (const result of validationResults) {
      if (!result) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleEditClick = () => {
    updateShop({
      id: loadedShop.id,
      street: street,
      building: building,
      openingTime: openingTime,
      closingTime: closingTime,
    })
      .then((updatedShop) => {
        if (updatedShop !== null) {
          navigate("/admin/shops");
        } else {
          setFormErrorInput((prevData) => ({
            ...prevData,
            styles: { visibility: "visible", marginTop: 0 },
          }));
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit a Shop
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="shop-id">ID</label>
          <input
            id="shop-id"
            type="number"
            className="form-control"
            value={loadedShop.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="shop-street">Street</label>
          <input
            id="shop-street"
            type="text"
            className="form-control"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
            }}
          />
        </div>
        <div style={streetErrorInput.styles} className="error-input">
          {streetErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="shop-building">Building</label>
          <input
            id="shop-building"
            type="text"
            className="form-control"
            value={building}
            onChange={(e) => {
              setBuilding(e.target.value);
            }}
          />
        </div>
        <div style={buildingErrorInput.styles} className="error-input">
          {buildingErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="shop-opening-time">Opening time</label>
          <input
            id="shop-opening-time"
            type="text"
            className="form-control"
            value={openingTime}
            onChange={(e) => {
              setOpeningTime(e.target.value);
            }}
          />
        </div>
        <div style={openingTimeErrorInput.styles} className="error-input">
          {openingTimeErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="shop-closing-time">Closing time</label>
          <input
            id="shop-closing-time"
            type="text"
            className="form-control"
            value={closingTime}
            onChange={(e) => {
              setClosingTime(e.target.value);
            }}
          />
        </div>
        <div style={closingTimeErrorInput.styles} className="error-input">
          {closingTimeErrorInput.message}
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              validateFormData()
                .then((result) => {
                  if (result) {
                    console.log("The data is valid.");
                    handleEditClick();
                  } else {
                    console.log("The data is not valid.");
                  }
                })
                .catch((error) => console.error(error));
            }}
          >
            Save
          </button>
          <Link
            className="btn btn-secondary admin-products-button"
            to={"/admin/shops"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
