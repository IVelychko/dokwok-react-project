import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProductCategoryDataProp } from "../../helpers/Interfaces";
import { useState } from "react";
import { updateCategory } from "../../functions/productFunctions";

export default function EditCategory() {
  const loadedCategory: ProductCategoryDataProp =
    useLoaderData() as ProductCategoryDataProp;
  const [name, setName] = useState<string>(loadedCategory.name);
  const navigate = useNavigate();

  const validateFormData = () => {
    if (name === "" || name === null) {
      return false;
    }
    return true;
  };

  const handleEditClick = () => {
    updateCategory({
      id: loadedCategory.id,
      name: name,
    })
      .then((updatedCategory) => {
        console.log(
          `Category ${updatedCategory.name} with ID: ${updatedCategory.id} was updated`
        );
        navigate("/admin/categories");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit a Category
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="category-id">ID</label>
          <input
            id="category-id"
            className="form-control"
            value={loadedCategory.id}
            disabled
          />
        </div>
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
                console.log("The data is valid");
                handleEditClick();
              } else {
                console.log("The data is not valid");
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
