import Menu from "./components/menu/Menu";
import { ProductCategoryDataProp } from "./helpers/Interfaces";
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

export default function App() {
  return <RouterProvider router={router} />;
}
