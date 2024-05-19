import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProp } from "../Interfaces";
import { CartStateType } from "../hooks/hooks";
import { fetchCart } from "../functions/cartFunctions";

export default function RootLayout() {
  const [cartProp, setCartProp] = useState<CartProp>({
    lines: [],
    totalCartPrice: 0,
  });

  useEffect(() => {
    fetchCart()
      .then((cart) => setCartProp(cart))
      .catch((err) => console.error(err));
    console.log("RootLayout effect.");
  }, []);

  return (
    <div className="flex-wrapper">
      <Header cartProp={cartProp} />
      <Outlet context={{ cartProp, setCartProp } satisfies CartStateType} />
      <Footer />
    </div>
  );
}
