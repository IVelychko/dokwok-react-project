import { ReactNode } from "react";
import { CartProp } from "../../Interfaces";
import CartItem from "./CartItem";
import {
  addItemToCart,
  removeItemFromCart,
  removeLineFromCart,
} from "../../functions/cartFunctions";

interface Props {
  cart: CartProp;
  setCart: (cartProp: CartProp) => void;
}

export default function CartContainer({ cart, setCart }: Readonly<Props>) {
  const handleAddProduct = (itemId: number, quantity: number) => {
    addItemToCart(itemId, quantity)
      .then((cart) => {
        setCart(cart);
        console.log("Item was added to the cart in Cart.tsx");
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveProduct = (itemId: number, quantity: number) => {
    removeItemFromCart(itemId, quantity)
      .then((cart) => {
        setCart(cart);
        console.log("Item was removed from the cart in Cart.tsx");
      })
      .catch((error) => console.error(error));
  };

  const handleRemoveLine = (itemId: number) => {
    removeLineFromCart(itemId)
      .then((cart) => {
        setCart(cart);
        console.log("Line was removed from the cart in Cart.tsx");
      })
      .catch((error) => console.error(error));
  };

  const cartItemComponents: ReactNode[] = [];
  cart.lines.forEach((line) => {
    cartItemComponents.push(
      <CartItem
        key={line.product.id}
        cartLine={line}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        onRemoveLine={handleRemoveLine}
      />
    );
  });

  return <div className="cart-container">{cartItemComponents}</div>;
}
