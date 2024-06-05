import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { addOrderLine } from "../../functions/orderFunctions";

export default function CreateOrderLine() {
  const loadedOrderId: number = useLoaderData() as number;
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const navigate = useNavigate();

  const validateFormData = () => {
    if (isNaN(parseInt(productId)) || isNaN(parseInt(quantity))) {
      return false;
    }
    return true;
  };

  const handleCreateClick = () => {
    addOrderLine({
      orderId: loadedOrderId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    })
      .then((addedOrderLine) => {
        console.log(`Order line was added with ID: ${addedOrderLine.id}`);
        navigate(`/admin/orders/details/${loadedOrderId}`);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-primary text-white text-center p-1 editor-header">
        Create an Order line
      </div>
      <form>
        <div className="form-group">
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
        <div className="form-group">
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
            to={`/admin/orders/details/${loadedOrderId}`}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
