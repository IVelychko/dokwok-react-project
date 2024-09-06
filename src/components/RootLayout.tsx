import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { createContext, useCallback, useMemo, useState } from "react";
import {
  Cart,
  Shop,
} from "../models/dataTransferObjects";
import { getCart } from "../repositories/cartManagement";

export const RootContext = createContext<RootContextState>({
  shops: [],
  setShops: _ => {},
  cart: { totalCartPrice: 0, lines: [] },
  setCart: _ => {}
});

export interface RootContextState {
  shops: Shop[];
  setShops: (shops: Shop[]) => void;
  cart: Cart;
  setCart: (cart: Cart) => void;
}

export default function RootLayout() {
  const loadedShops: Shop[] = useLoaderData() as Shop[];
  const [shops, setShops] = useState<Shop[]>(loadedShops);
  const [cart, setCart] = useState<Cart>(getCart());

  const handleShopsChange = useCallback((shops: Shop[]) => {
    setShops(shops);
  }, []);

  const handleCartChange = useCallback((cart: Cart) => {
    setCart(cart);
  }, []);

  const rootContextStateMemo = useMemo<RootContextState>(() => ({
    shops: shops,
    setShops: handleShopsChange,
    cart: cart,
    setCart: handleCartChange
  }), [shops, handleShopsChange, cart, handleCartChange]);

  return (
    <div className="flex-wrapper">
      <RootContext.Provider value={rootContextStateMemo}>
        <Header />
        <Outlet />
        <Footer />
      </RootContext.Provider>
    </div>
  );
}
