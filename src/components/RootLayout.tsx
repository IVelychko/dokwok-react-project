import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { useCallback, useState } from "react";
import {
  AuthUserProp,
  CartProp,
  RootLoaderData,
  ShopProp,
} from "../helpers/Interfaces";
import { ContextState } from "../hooks/hooks";

export default function RootLayout() {
  const rootLoaderData: RootLoaderData = useLoaderData() as RootLoaderData;
  const [cartProp, setCartProp] = useState<CartProp>(rootLoaderData.cart);
  const [authUserProp, setAuthUserProp] = useState<AuthUserProp>(
    rootLoaderData.user ?? {
      id: "",
      firstName: "",
      userName: "",
      email: "",
      phoneNumber: "",
    }
  );
  const [shopsProp, setShopsProp] = useState<ShopProp[]>(rootLoaderData.shops);

  const handleCartChange = useCallback((cart: CartProp) => {
    setCartProp(cart);
  }, []);

  const handleUserChange = useCallback((user: AuthUserProp) => {
    setAuthUserProp(user);
  }, []);

  const handleShopsChange = useCallback((shops: ShopProp[]) => {
    setShopsProp(shops);
  }, []);

  return (
    <div className="flex-wrapper">
      <Header cartProp={cartProp} isUserLoggedIn={authUserProp.id !== ""} />
      <Outlet
        context={
          {
            cartProp,
            setCartProp: handleCartChange,
            authUserProp,
            setAuthUserProp: handleUserChange,
            shopsProp,
            setShopsProp: handleShopsChange,
          } satisfies ContextState
        }
      />
      <Footer />
    </div>
  );
}
