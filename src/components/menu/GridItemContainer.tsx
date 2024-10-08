import { Product } from "../../models/dataTransferObjects";

interface Props {
  products: Product[] | null;
  onAddToCart: (productId: number, quantity: number) => void;
}

export default function GridItemContainer({
  products,
  onAddToCart,
}: Readonly<Props>) {
  let gridItems;
  if (products !== null && products.length > 0) {
    gridItems = products.map((product) => (
      <div key={product.id} className="grid-item">
        <div className="item-content">
          <div className="image-block">
            <img
              alt="product-img"
              src={`/src/assets/item-images/${product.name}.png`}
            />
          </div>
          <div className="item-title">{product.name}</div>
          <div className="item-description">{product.description}</div>
          <div style={{ marginTop: 7 }} className="item-description">
            {product.weight} {product.measurementUnit}
          </div>
        </div>
        <div className="buy">
          <button
            onClick={() => onAddToCart(product.id, 1)}
            className="button-to-cart"
          >
            В кошик
          </button>
          <div className="price">{product.price} грн</div>
        </div>
      </div>
    ));
  } else {
    gridItems = <h3>Продуктів для відображення не існує</h3>;
  }
  return <div className="grid-container">{gridItems}</div>;
}
