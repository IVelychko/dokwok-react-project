import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../functions/productFunctions";
import { ErrorInputProp } from "../../helpers/Interfaces";
import {
  validateCategoryId,
  validateDescription,
  validateMeasurementUnit,
  validateNameCreate,
  validatePrice,
  validateWeight,
} from "../../validation/productValidation";

export default function CreateProduct() {
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [measurementUnit, setMeasurementUnit] = useState<string>("");
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [nameErrorInput, setNameErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct name",
  });
  const [descriptionErrorInput, setDescriptionErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct description",
    });
  const [categoryIdErrorInput, setCategoryIdErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct category ID",
    });
  const [priceErrorInput, setPriceErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct price",
  });
  const [weightErrorInput, setWeightErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct weight",
  });
  const [measurementUnitErrorInput, setMeasurementUnitErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct measurement unit",
    });
  const navigate = useNavigate();

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateNameCreate(name, nameErrorInput, setNameErrorInput)
    );
    validationResults.push(
      validateDescription(
        description,
        descriptionErrorInput,
        setDescriptionErrorInput
      )
    );
    validationResults.push(
      await validateCategoryId(
        categoryId,
        categoryIdErrorInput,
        setCategoryIdErrorInput
      )
    );
    validationResults.push(
      validatePrice(price, priceErrorInput, setPriceErrorInput)
    );
    validationResults.push(
      validateWeight(weight, weightErrorInput, setWeightErrorInput)
    );
    validationResults.push(
      validateMeasurementUnit(
        measurementUnit,
        measurementUnitErrorInput,
        setMeasurementUnitErrorInput
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

  const handleCreateClick = () => {
    addProduct({
      name: name,
      categoryId: parseInt(categoryId),
      description: description,
      price: parseFloat(price),
      weight: parseFloat(weight),
      measurementUnit: measurementUnit,
    })
      .then((addedProduct) => {
        if (addedProduct !== null) {
          console.log(
            `Product ${addedProduct.name} was added with ID: ${addedProduct.id}`
          );
          navigate("/admin/products");
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
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create a Product
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="product-name">Name</label>
          <input
            id="product-name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={nameErrorInput.styles} className="error-input">
          {nameErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-desc">Description</label>
          <input
            id="product-desc"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div style={descriptionErrorInput.styles} className="error-input">
          {descriptionErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-category-id">Category ID</label>
          <input
            id="product-category-id"
            className="form-control"
            value={categoryId}
            type="number"
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          />
        </div>
        <div style={categoryIdErrorInput.styles} className="error-input">
          {categoryIdErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div style={priceErrorInput.styles} className="error-input">
          {priceErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-weight">Weight</label>
          <input
            id="product-weight"
            type="number"
            className="form-control"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>
        <div style={weightErrorInput.styles} className="error-input">
          {weightErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-measurement-unit">Measurement unit</label>
          <input
            id="product-measurement-unit"
            type="text"
            className="form-control"
            value={measurementUnit}
            onChange={(e) => {
              setMeasurementUnit(e.target.value);
            }}
          />
        </div>
        <div style={measurementUnitErrorInput.styles} className="error-input">
          {measurementUnitErrorInput.message}
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
                    handleCreateClick();
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
            to={"/admin/products"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
