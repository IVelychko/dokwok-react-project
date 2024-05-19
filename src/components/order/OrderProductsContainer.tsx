import { ReactNode } from "react";
import { CartProp } from "../../Interfaces";
import OrderProductItem from "./OrderProductItem";

interface Props {
  cart: CartProp;
}

export default function OrderProductsContainer({ cart }: Readonly<Props>) {
  const orderProductItemComponents: ReactNode[] = [];
  cart.lines.forEach((line) => {
    orderProductItemComponents.push(
      <OrderProductItem key={line.product.id} cartLine={line} />
    );
  });
  return (
    <div className="order-products-container">{orderProductItemComponents}</div>
  );
}
