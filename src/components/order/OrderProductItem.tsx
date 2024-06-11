import { CartLineProp } from "../../helpers/Interfaces";

interface Props {
  cartLine: CartLineProp;
}

export default function OrderProductItem({ cartLine }: Readonly<Props>) {
  const product = cartLine.product;

  return (
    <div className="order-products-item">
      <div className="order-products-item-content">
        <div className="order-products-info">
          <div className="order-products-item-content-img">
            <img
              alt="product"
              src="/src/assets/item-images/3-drakona-600x400.png"
            />
          </div>
          <div className="order-products-item-content-title">
            <div className="order-products-item-content-title-name">
              {product.name}
            </div>
            <div className="order-products-item-content-title-weight">
              {product.weight} {product.measurementUnit}
            </div>
          </div>
        </div>
        <div className="order-products-money">
          <div
            style={{
              marginRight: 0,
              marginLeft: "auto",
              fontWeight: 500,
              color: "#a6a6a6",
            }}
            className="order-products-quantity"
          >
            {cartLine.quantity} шт
          </div>
          <div className="order-products-price">
            <div>{cartLine.totalLinePrice}</div>
            <div className="order-products-price-currency">грн</div>
          </div>
        </div>
      </div>
    </div>
  );
}
