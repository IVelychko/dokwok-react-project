import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  ErrorInputProp,
  ProductCategoryDataProp,
} from "../../../helpers/Interfaces";
import { useState } from "react";
import { updateCategory } from "../../../functions/productFunctions";
import { validateNameEdit } from "../../../validation/categoryValidation";

export default function EditCategory() {
  const loadedCategory: ProductCategoryDataProp =
    useLoaderData() as ProductCategoryDataProp;
  const [name, setName] = useState<string>(loadedCategory.name);
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: {
      visibility: "hidden",
      marginTop: 0,
    },
    message: "Incorrect data",
  });
  const [nameErrorInput, setNameErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct name",
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
        loadedCategory.name,
        name,
        nameErrorInput,
        setNameErrorInput
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
    updateCategory({
      id: loadedCategory.id,
      name: name,
    })
      .then((updatedCategory) => {
        if (updatedCategory !== null) {
          console.log(
            `Category ${updatedCategory.name} with ID: ${updatedCategory.id} was updated`
          );
          navigate("/admin/categories");
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
        Edit a Category
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="category-id">ID</label>
          <input
            id="category-id"
            type="number"
            className="form-control"
            value={loadedCategory.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="category-name">Name</label>
          <input
            id="category-name"
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
            to={"/admin/categories"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
