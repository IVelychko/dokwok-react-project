import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { useCallback, useState } from "react";
import { AuthUserProp, CartProp, RootLoaderData } from "../helpers/Interfaces";
import { ContextStateType } from "../hooks/hooks";

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

  const handleCartChange = useCallback((cart: CartProp) => {
    setCartProp(cart);
  }, []);

  const handleUserChange = useCallback((user: AuthUserProp) => {
    setAuthUserProp(user);
  }, []);

  return (
    <div className="flex-wrapper">
      <Header cartProp={cartProp} />
      <Outlet
        context={
          {
            cartProp,
            setCartProp: handleCartChange,
            authUserProp,
            setAuthUserProp: handleUserChange,
          } satisfies ContextStateType
        }
      />
      <Footer />
    </div>
  );
}
