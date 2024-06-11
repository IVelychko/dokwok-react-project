import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { addOrderLine } from "../../functions/orderFunctions";
import { ErrorInputProp } from "../../helpers/Interfaces";
import {
  validateProductIdCreate,
  validateQuantity,
} from "../../validation/orderLineValidation";

export default function CreateOrderLine() {
  const loadedOrderId: number = useLoaderData() as number;
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [formErrorInput, setFormErrorInput] = useState<ErrorInputProp>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [productIdErrorInput, setProductIdErrorInput] =
    useState<ErrorInputProp>({
      styles: { display: "none" },
      message: "Enter a correct product ID",
    });
  const [quantityErrorInput, setQuantityErrorInput] = useState<ErrorInputProp>({
    styles: { display: "none" },
    message: "Enter a correct quantity",
  });
  const navigate = useNavigate();

  const validateFormData = async () => {
    setFormErrorInput((prevData) => ({
      ...prevData,
      styles: { visibility: "hidden", marginTop: 0 },
    }));
    const validationResults: boolean[] = [];
    validationResults.push(
      await validateProductIdCreate(
        loadedOrderId,
        productId,
        productIdErrorInput,
        setProductIdErrorInput
      )
    );
    validationResults.push(
      validateQuantity(quantity, quantityErrorInput, setQuantityErrorInput)
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
    addOrderLine({
      orderId: loadedOrderId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    })
      .then((addedOrderLine) => {
        if (addedOrderLine !== null) {
          console.log(`Order line was added with ID: ${addedOrderLine.id}`);
          navigate(`/admin/orders/details/${loadedOrderId}`);
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
        Create an Order line
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="orderline-productid">Product ID</label>
          <input
            type="number"
            id="orderline-productid"
            className="form-control"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
            }}
          />
        </div>
        <div style={productIdErrorInput.styles} className="error-input">
          {productIdErrorInput.message}
        </div>
        <div className="form-group admin-form-input-block">
          <label htmlFor="orderline-quantity">Quantity</label>
          <input
            type="number"
            id="orderline-quantity"
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div style={quantityErrorInput.styles} className="error-input">
          {quantityErrorInput.message}
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
            to={`/admin/orders/details/${loadedOrderId}`}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
