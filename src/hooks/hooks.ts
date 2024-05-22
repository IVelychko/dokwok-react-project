import { useOutletContext } from "react-router-dom";
import { AuthUserProp, CartProp } from "../helpers/Interfaces";

export type ContextStateType = {
  cartProp: CartProp;
  setCartProp: (cartProp: CartProp) => void;
  authUserProp: AuthUserProp;
  setAuthUserProp: (authUserProp: AuthUserProp) => void;
};

export function useMyContext() {
  return useOutletContext<ContextStateType>();
}
