import Menu from "./components/menu/Menu";
import {
  AuthUserProp,
  CartProp,
  ProductCategoryDataProp,
  ProductDataProp,
  RootLoaderData,
} from "./helpers/Interfaces";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
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
import AccountLayout from "./components/account/AccountLayout";
import Profile from "./components/account/Profile";
import OrderHistory from "./components/account/OrderHistory";
import { isLoggedIn } from "./functions/authFunctions";
import { fetchCart } from "./functions/cartFunctions";
import ErrorPage from "./components/ErrorPage";
import { fetchUserOrders } from "./functions/orderFunctions";

const getRoutes = (productCategories: ProductCategoryDataProp[]) => {
  const childrenRoutes: RouteObject[] = [];

  childrenRoutes.push({
    path: "account",
    element: <AccountLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <OrderHistory />,
        loader: async () => {
          try {
            const user = await isLoggedIn();
            const userOrders = await fetchUserOrders(user.id);
            return userOrders;
          } catch (error) {
            console.error(error);
            return redirect("/login");
          }
        },
      },
    ],
    loader: async () => {
      try {
        const user = await isLoggedIn();
        return user;
      } catch (error) {
        console.error(error);
        return redirect("/login");
      }
    },
  });

  childrenRoutes.push({
    index: true,
    element: <Menu heading="Всі пропозиції" />,
    loader: async () => {
      try {
        const data = await fetchProductData(null);
        console.log("Items were fetched for the main page.");
        return data;
      } catch (error) {
        console.error(error);
        const emptyArray: ProductDataProp[] = [];
        return emptyArray;
      }
    },
  });
  childrenRoutes.push({
    path: "cart",
    element: <Cart />,
  });
  childrenRoutes.push({
    path: "order",
    element: <OrderForm />,
  });
  childrenRoutes.push({
    path: "login",
    element: <Login />,
  });
  childrenRoutes.push({
    path: "register",
    element: <Register />,
  });
  childrenRoutes.push({
    path: "error",
    element: <ErrorPage />,
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
    loader: async () => {
      let cart: CartProp;
      try {
        cart = await fetchCart();
      } catch (error) {
        console.error(error);
        return redirect("/error");
      }
      let user: AuthUserProp | null = null;
      try {
        user = await isLoggedIn();
      } catch (error) {
        console.error(error);
      }
      const rootLoaderData: RootLoaderData = { cart, user };
      return rootLoaderData;
    },
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
