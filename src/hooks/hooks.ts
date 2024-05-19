import { useOutletContext } from "react-router-dom";
import { CartProp } from "../Interfaces";

export type CartStateType = {
  cartProp: CartProp;
  setCartProp: (cartProp: CartProp) => void;
};

export function useCart() {
  return useOutletContext<CartStateType>();
}
