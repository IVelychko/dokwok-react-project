import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthUserProp, CartProp } from "../helpers/Interfaces";
import { ContextStateType } from "../hooks/hooks";
import { fetchCart } from "../functions/cartFunctions";
import { fetchUserDataById } from "../functions/userFunctions";

export default function RootLayout() {
  const [cartProp, setCartProp] = useState<CartProp>({
    lines: [],
    totalCartPrice: 0,
  });
  const [authUserProp, setAuthUserProp] = useState<AuthUserProp>({
    id: "",
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchCart()
      .then((cart) => setCartProp(cart))
      .catch((err) => console.error(err));
    fetchUserDataById(null)
      .then((user) => {
        setAuthUserProp(user);
        console.log("User was set in RootLayout.");
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex-wrapper">
      <Header cartProp={cartProp} />
      <Outlet
        context={
          {
            cartProp,
            setCartProp,
            authUserProp,
            setAuthUserProp,
          } satisfies ContextStateType
        }
      />
      <Footer />
    </div>
  );
}
