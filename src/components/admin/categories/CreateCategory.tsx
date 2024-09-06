import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorInput } from "../../../helpers/Interfaces";
import { validateNameCreate } from "../../../validation/categoryValidation";
import useAuthAxios from "../../../hooks/useAuthAxios";
import { addCategory } from "../../../repositories/productCategoryRepository";

export default function CreateCategory() {
  const authAxios = useAuthAxios();
  const [name, setName] = useState<string>("");
  const [formErrorInput, setFormErrorInput] = useState<ErrorInput>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [nameErrorInput, setNameErrorInput] = useState<ErrorInput>({
    styles: {
      display: "none",
    },
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
      await validateNameCreate(name, nameErrorInput, setNameErrorInput)
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
    addCategory({
      name: name,
    }, authAxios)
      .then((addedCategory) => {
        if (addedCategory !== 400 && addedCategory !== 401) {
          console.log(
            `Category ${addedCategory.name} was added with ID: ${addedCategory.id}`
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
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create a Category
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
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
            to={"/admin/categories"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
