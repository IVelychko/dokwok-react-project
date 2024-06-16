import { useOutletContext } from "react-router-dom";
import { AuthUserProp, CartProp, ShopProp } from "../helpers/Interfaces";

export type ContextStateType = {
  cartProp: CartProp;
  setCartProp: (cartProp: CartProp) => void;
  authUserProp: AuthUserProp;
  setAuthUserProp: (authUserProp: AuthUserProp) => void;
  shopsProp: ShopProp[];
  setShopsProp: (shopsProp: ShopProp[]) => void;
};

export function useMyContext() {
  return useOutletContext<ContextStateType>();
}
