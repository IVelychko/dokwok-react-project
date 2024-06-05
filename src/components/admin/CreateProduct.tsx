import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../functions/productFunctions";

export default function CreateProduct() {
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const navigate = useNavigate();

  const validateFormData = () => {
    if (
      name === "" ||
      name === null ||
      isNaN(parseInt(categoryId)) ||
      description === "" ||
      description === null ||
      isNaN(parseFloat(price))
    ) {
      return false;
    }
    return true;
  };

  const handleCreateClick = () => {
    addProduct({
      name: name,
      categoryId: parseInt(categoryId),
      description: description,
      price: parseFloat(price),
    })
      .then((addedProduct) => {
        console.log(
          `Product ${addedProduct.name} was added with ID: ${addedProduct.id}`
        );
        navigate("/admin/products");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create a Product
      </div>
      <form>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
            to={"/admin/products"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
