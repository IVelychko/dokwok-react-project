import { CartLineProp } from "../../helpers/Interfaces";

interface Props {
  cartLine: CartLineProp;
  onRemoveLine: (itemId: number) => void;
  onRemoveProduct: (itemId: number, quantity: number) => void;
  onAddProduct: (itemId: number, quantity: number) => void;
}

export default function CartItem({
  cartLine,
  onAddProduct,
  onRemoveLine,
  onRemoveProduct,
}: Readonly<Props>) {
  const product = cartLine.product;

  return (
    <div className="cart-item">
      <div className="cart-item-content">
        <div className="cart-info">
          <div className="cart-item-content-img">
            <img
              alt="product"
              src="/src/assets/item-images/3-drakona-600x400.png"
            />
          </div>
          <div className="cart-item-content-title">
            <div className="cart-item-content-title-name">{product.name}</div>
            <div className="cart-item-content-title-weight">
              {product.weight} {product.measurementUnit}
            </div>
          </div>
          <button
            className="cart-remove-button"
            onClick={() => onRemoveLine(product.id)}
          >
            x
          </button>
        </div>
        <div className="cart-money">
          <div className="cart-quantity-button">
            <button
              className="cart-minus-button"
              onClick={() => onRemoveProduct(product.id, 1)}
            >
              -
            </button>
            <div>{cartLine.quantity} шт</div>
            <button
              className="cart-plus-button"
              onClick={() => onAddProduct(product.id, 1)}
            >
              +
            </button>
          </div>
          <div className="cart-price">
            <div>{cartLine.totalLinePrice}</div>
            <div className="cart-price-currency">грн</div>
          </div>
        </div>
      </div>
    </div>
  );
}
