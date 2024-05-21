import { useOutletContext } from "react-router-dom";
import { AuthUserProp, CartProp } from "../helpers/Interfaces";
import { useContext } from "react";
import { AuthContext } from "../App";

export type CartStateType = {
  cartProp: CartProp;
  setCartProp: (cartProp: CartProp) => void;
};

export type AuthUserStateType = {
  authUser: AuthUserProp;
  setAuthUser: (authUser: AuthUserProp) => void;
};

export function useCart() {
  return useOutletContext<CartStateType>();
}

export const useAuth = () => {
  return useContext<AuthUserStateType | null>(AuthContext);
};
