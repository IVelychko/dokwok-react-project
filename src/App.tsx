import Menu from "./components/menu/Menu";
import { AuthUserProp, ProductCategoryDataProp } from "./helpers/Interfaces";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import {
  fetchProductCategoryData,
  fetchProductData,
} from "./functions/fetchDataFunctions";
import Cart from "./components/cart/Cart";
import OrderForm from "./components/order/OrderForm";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import PersonalCabinet from "./components/personal_cabinet/PersonalCabinet";
import { createContext, useMemo, useState } from "react";
import { AuthUserStateType } from "./hooks/hooks";

const getRoutes = (productCategories: ProductCategoryDataProp[]) => {
  const childrenRoutes: RouteObject[] = [];

  childrenRoutes.push({
    index: true,
    element: <Menu heading="Всі пропозиції" />,
    loader: async () => await fetchProductData(null),
  });
  childrenRoutes.push({
    path: "/cart",
    element: <Cart />,
  });
  childrenRoutes.push({
    path: "/order",
    element: <OrderForm />,
  });
  childrenRoutes.push({
    path: "/login",
    element: <Login />,
  });
  childrenRoutes.push({
    path: "/register",
    element: <Register />,
  });
  childrenRoutes.push({
    path: "/personal-cabinet",
    element: <PersonalCabinet />,
  });
  productCategories.forEach((category) => {
    childrenRoutes.push({
      path: `/${category.name.toLowerCase().replace(" ", "-")}`,
      element: <Menu heading={category.name} />,
      loader: async () => await fetchProductData(category.id),
    });
  });

  const routes: RouteObject[] = [];
  routes.push({
    path: "/",
    element: <RootLayout />,
    children: childrenRoutes,
  });

  return routes;
};

let routes: RouteObject[] = [];
try {
  const productCategories = await fetchProductCategoryData();
  routes = getRoutes(productCategories);
} catch (error) {
  console.error(error);
}

const router = createBrowserRouter(routes);

export const AuthContext = createContext<AuthUserStateType | null>(null);

export default function App() {
  const [authUser, setAuthUser] = useState<AuthUserProp>({
    firstName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    token: "",
  });

  const contextValue = useMemo<AuthUserStateType>(
    () => ({
      authUser,
      setAuthUser,
    }),
    [authUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}
