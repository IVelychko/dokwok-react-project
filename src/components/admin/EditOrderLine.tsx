import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { updateOrderLine } from "../../functions/orderFunctions";
import { OrderLineProp } from "../../helpers/Interfaces";

export default function EditOrderLine() {
  const loadedOrderLine: OrderLineProp = useLoaderData() as OrderLineProp;
  const [productId, setProductId] = useState<string>(
    loadedOrderLine.productId.toString()
  );
  const [quantity, setQuantity] = useState<string>(
    loadedOrderLine.quantity.toString()
  );
  const navigate = useNavigate();

  const validateFormData = () => {
    if (isNaN(parseInt(productId)) || isNaN(parseInt(quantity))) {
      return false;
    }
    return true;
  };

  const handleEditClick = () => {
    updateOrderLine({
      id: loadedOrderLine.id,
      orderId: loadedOrderLine.orderId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    })
      .then((updatedOrderLine) => {
        console.log(`Order line was updated with ID: ${updatedOrderLine.id}`);
        navigate(`/admin/orders/details/${loadedOrderLine.orderId}`);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="col">
      <div className="bg-warning text-white text-center p-1 editor-header">
        Edit an Order line
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="orderline-id">ID</label>
          <input
            id="orderline-id"
            className="form-control"
            value={loadedOrderLine.id}
            disabled
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="orderline-price">Total line price</label>
          <input
            id="orderline-price"
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
              if (validateFormData()) {
                console.log("The data is valid.");
                handleEditClick();
              } else {
                console.log("The data is not valid.");
              }
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
