import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addCategory } from "../../functions/productFunctions";

export default function CreateCategory() {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  const validateFormData = () => {
    if (name === "" || name === null) {
      return false;
    }
    return true;
  };

  const handleCreateClick = () => {
    addCategory({
      name: name,
    })
      .then((addedCategory) => {
        console.log(
          `Category ${addedCategory.name} was added with ID: ${addedCategory.id}`
        );
        navigate("/admin/categories");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create a Category
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="category-name">Name</label>
          <input
            id="category-name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary admin-products-button"
            onClick={() => {
              if (validateFormData()) {
                console.log("The data is valid.");
                handleCreateClick();
              } else {
                console.log("The data is not valid.");
              }
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
