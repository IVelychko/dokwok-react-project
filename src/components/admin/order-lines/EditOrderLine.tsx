import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ErrorInput } from "../../../helpers/Interfaces";
import {
  validateProductIdEdit,
  validateQuantity,
} from "../../../validation/orderLineValidation";
import { OrderLine } from "../../../models/dataTransferObjects";
import useAuthAxios from "../../../hooks/useAuthAxios";
import { updateOrderLine } from "../../../repositories/orderLineRepository";

export default function EditOrderLine() {
  const authAxios = useAuthAxios();
  const loadedOrderLine: OrderLine = useLoaderData() as OrderLine;
  const [productId, setProductId] = useState<string>(
    loadedOrderLine.productId.toString()
  );
  const [quantity, setQuantity] = useState<string>(
    loadedOrderLine.quantity.toString()
  );
  const [formErrorInput, setFormErrorInput] = useState<ErrorInput>({
    styles: { visibility: "hidden", marginTop: 0 },
    message: "Incorrect data",
  });
  const [productIdErrorInput, setProductIdErrorInput] =
    useState<ErrorInput>({
      styles: { display: "none" },
      message: "Enter a correct product ID",
    });
  const [quantityErrorInput, setQuantityErrorInput] = useState<ErrorInput>({
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
      await validateProductIdEdit(
        loadedOrderLine.orderId,
        loadedOrderLine.productId,
        productId,
        productIdErrorInput,
        setProductIdErrorInput,
        authAxios
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

  const handleEditClick = () => {
    updateOrderLine({
      id: loadedOrderLine.id,
      orderId: loadedOrderLine.orderId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    }, authAxios)
      .then((updatedOrderLine) => {
        if (updatedOrderLine !== 400 && updatedOrderLine !== 401 && updatedOrderLine !== 404) {
          console.log(`Order line was updated with ID: ${updatedOrderLine.id}`);
          navigate(`/admin/orders/details/${loadedOrderLine.orderId}`);
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
        Edit an Order line
      </div>
      <div style={formErrorInput.styles} className="form-error-input">
        {formErrorInput.message}
      </div>
      <form>
        <div
          style={{ marginTop: 0 }}
          className="form-group admin-form-input-block"
        >
          <label htmlFor="orderline-id">ID</label>
          <input
            id="orderline-id"
            type="number"
            className="form-control"
            value={loadedOrderLine.id}
            disabled
          />
        </div>
        <div className="form-group admin-form-input-block">
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
        <div className="form-group admin-form-input-block">
          <label htmlFor="orderline-price">Total line price</label>
          <input
            id="orderline-price"
            type="number"
            className="form-control"
            value={loadedOrderLine.totalLinePrice}
            disabled
          />
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
            to={`/admin/orders/details/${loadedOrderLine.orderId}`}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
