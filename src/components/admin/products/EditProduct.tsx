import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ErrorInputProp, ProductDataProp } from "../../../helpers/Interfaces";
import { useState } from "react";
import { updateProduct } from "../../../repositories/productRepository";
import {
  validateCategoryId,
  validateDescription,
  validateMeasurementUnit,
  validateNameEdit,
  validatePrice,
  validateWeight,
} from "../../../validation/productValidation";

export default function EditProduct() {
  const loadedProduct: ProductDataProp = useLoaderData() as ProductDataProp;
  const [name, setName] = useState<string>(loadedProduct.name);
  const [categoryId, setCategoryId] = useState<string>(
    loadedProduct.categoryId.toString()
  );
  const [description, setDescription] = useState<string>(
    loadedProduct.description
  );
  const [price, setPrice] = useState<string>(loadedProduct.price.toString());
  const [weight, setWeight] = useState<string>(loadedProduct.weight.toString());
  const [measurementUnit, setMeasurementUnit] = useState<string>(
    loadedProduct.measurementUnit
  );
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
      await validateNameEdit(
        loadedProduct.name,
        name,
        nameErrorInput,
        setNameErrorInput
      )
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

  const handleEditClick = () => {
    updateProduct({
      id: loadedProduct.id,
      name: name,
      categoryId: parseInt(categoryId),
      description: description,
      price: parseFloat(price),
      weight: parseFloat(weight),
      measurementUnit: measurementUnit,
    })
      .then((updatedProduct) => {
        if (updatedProduct !== null) {
          console.log(
            `Product ${updatedProduct.name} with ID: ${updatedProduct.id} was updated`
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
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit a Product
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="product-id">ID</label>
          <input
            id="product-id"
            type="number"
            className="form-control"
            value={loadedProduct.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="product-name">Name</label>
          <input
            id="product-name"
            type="text"
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
            type="text"
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
            type="number"
            className="form-control"
            value={categoryId}
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
            to={"/admin/products"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
