import { ReactNode, useEffect, useState } from "react";
import { CartProp } from "../../helpers/Interfaces";
import OrderProductItem from "./OrderProductItem";

interface Props {
  cart: CartProp;
}

export default function OrderProductsContainer({ cart }: Readonly<Props>) {
  const orderProductItemComponents: ReactNode[] = [];
  const [expanded, setExpanded] = useState<boolean>(false);
  const [expandable, setExpandable] = useState<boolean>(false);

  useEffect(() => {
    setExpandable(cart.lines.length > 1);
  }, [cart.lines.length]);

  if (expandable) {
    if (expanded) {
      cart.lines.forEach((line) => {
        orderProductItemComponents.push(
          <OrderProductItem key={line.product.id} cartLine={line} />
        );
      });
    } else {
      orderProductItemComponents.push(
        <OrderProductItem
          key={cart.lines[0].product.id}
          cartLine={cart.lines[0]}
        />
      );
    }
  } else {
    cart.lines.forEach((line) => {
      orderProductItemComponents.push(
        <OrderProductItem key={line.product.id} cartLine={line} />
      );
    });
  }
  const expandButtonName = expanded ? "Показати менше" : "Показати всі";
  return (
    <>
      <div className="order-products-container">
        {orderProductItemComponents}
      </div>
      {expandable ? (
        <button
          onClick={() => {
            setExpanded(!expanded);
          }}
          className="order-product-expand-button"
        >
          {expandButtonName}
        </button>
      ) : null}
    </>
  );
}
