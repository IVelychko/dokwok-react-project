import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ProductDataProp } from "../../helpers/Interfaces";
import { useState } from "react";
import { updateProduct } from "../../functions/productFunctions";

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
  const navigate = useNavigate();

  const validateFormData = () => {
    if (name === "" || name === null) {
      return false;
    } else if (isNaN(parseInt(categoryId))) {
      return false;
    } else if (description === "" || description === null) {
      return false;
    } else if (isNaN(parseFloat(price))) {
      return false;
    }
    return true;
  };

  const handleEditClick = () => {
    updateProduct({
      id: loadedProduct.id,
      name: name,
      categoryId: parseInt(categoryId),
      description: description,
      price: parseFloat(price),
    })
      .then((updatedProduct) => {
        console.log(
          `Product ${updatedProduct.name} with ID: ${updatedProduct.id} was updated`
        );
        navigate("/admin/products");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit a Product
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="product-id">ID</label>
          <input
            id="product-id"
            className="form-control"
            value={loadedProduct.id}
            disabled
          />
        </div>
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
            to={"/admin/products"}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
