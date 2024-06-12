import Menu from "./components/menu/Menu";
import {
  AuthUserProp,
  CartProp,
  OrderProp,
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
  fetchProduct,
  fetchProductCategory,
  fetchProductCategoryData,
  fetchProductData,
} from "./functions/productFunctions";
import Cart from "./components/cart/Cart";
import OrderForm from "./components/order/OrderForm";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import AccountLayout from "./components/account/AccountLayout";
import Profile from "./components/account/Profile";
import OrderHistory from "./components/account/OrderHistory";
import { isAdminLoggedIn, isCustomerLoggedIn } from "./functions/authFunctions";
import { fetchCart } from "./functions/cartFunctions";
import ErrorPage from "./components/ErrorPage";
import {
  fetchAllOrders,
  fetchOrder,
  fetchOrderLine,
  fetchUserOrders,
} from "./functions/orderFunctions";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProducts from "./components/admin/products/AdminProducts";
import ProductDetails from "./components/admin/products/ProductDetails";
import CreateProduct from "./components/admin/products/CreateProduct";
import EditProduct from "./components/admin/products/EditProduct";
import AdminCategories from "./components/admin/categories/AdminCategories";
import CategoryDetails from "./components/admin/categories/CategoryDetails";
import CreateCategory from "./components/admin/categories/CreateCategory";
import EditCategory from "./components/admin/categories/EditCategory";
import AdminOrders from "./components/admin/orders/AdminOrders";
import OrderDetails from "./components/admin/orders/OrderDetails";
import EditOrder from "./components/admin/orders/EditOrder";
import OrderLineDetails from "./components/admin/order-lines/OrderLineDetails";
import CreateOrderLine from "./components/admin/order-lines/CreateOrderLine";
import EditOrderLine from "./components/admin/order-lines/EditOrderLine";
import AdminUsers from "./components/admin/users/AdminUsers";
import {
  fetchCustomerDataById,
  fetchCustomers,
} from "./functions/userFunctions";
import UserDetails from "./components/admin/users/UserDetails";
import AdminLogin from "./components/authorization/AdminLogin";
import CreateUser from "./components/admin/users/CreateUser";
import EditUser from "./components/admin/users/EditUser";
import EditProfile from "./components/account/EditProfile";
import { Categories } from "./helpers/constants";

const getRoutes = () => {
  const childrenRoutes: RouteObject[] = [];

  childrenRoutes.push({
    path: "account",
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
        loader: async () => {
          try {
            const user = await isAdminLoggedIn();
            if (user !== null) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            console.error(error);
            return redirect("/error");
          }
        },
      },
      {
        path: "orders",
        element: <OrderHistory />,
        loader: async () => {
          try {
            const user = await isCustomerLoggedIn();
            if (user == null) {
              return redirect("/login");
            }
            const userOrders = await fetchUserOrders(user.id);
            return userOrders;
          } catch (error) {
            console.error(error);
            return redirect("/error");
          }
        },
      },
    ],
    loader: async () => {
      try {
        const user = await isCustomerLoggedIn();
        if (user == null) {
          return redirect("/login");
        }
        return user;
      } catch (error) {
        console.error(error);
        return redirect("/error");
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
    path: "food-set",
    element: <Menu heading="Сети" />,
    loader: async () => await fetchProductData(Categories.foodSet),
  });
  childrenRoutes.push({
    path: "noodles",
    element: <Menu heading="Локшина" />,
    loader: async () => await fetchProductData(Categories.noodles),
  });
  childrenRoutes.push({
    path: "roll",
    element: <Menu heading="Роли" />,
    loader: async () => await fetchProductData(Categories.roll),
  });
  childrenRoutes.push({
    path: "cold-beverage",
    element: <Menu heading="Прохолодні напої" />,
    loader: async () => await fetchProductData(Categories.coldBeverage),
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
  // productCategories.forEach((category) => {
  //   childrenRoutes.push({
  //     path: `/${category.name.toLowerCase().replace(" ", "-")}`,
  //     element: <Menu heading={category.name} />,
  //     loader: async () => await fetchProductData(category.id),
  //   });
  // });

  const routes: RouteObject[] = [];
  routes.push(
    {
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
          user = await isCustomerLoggedIn();
        } catch (error) {
          console.error(error);
        }
        const rootLoaderData: RootLoaderData = { cart, user };
        return rootLoaderData;
      },
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "products",
          element: <AdminProducts />,
          loader: async () => {
            try {
              const data = await fetchProductData(null);
              console.log("Items were fetched for the admin products page.");
              return data;
            } catch (error) {
              console.error(error);
              const emptyArray: ProductDataProp[] = [];
              return emptyArray;
            }
          },
        },
        {
          index: true,
          element: <AdminProducts />,
          loader: async () => {
            try {
              const data = await fetchProductData(null);
              console.log("Items were fetched for the admin products page.");
              return data;
            } catch (error) {
              console.error(error);
              const emptyArray: ProductDataProp[] = [];
              return emptyArray;
            }
          },
        },
        {
          path: "products/details/:id",
          element: <ProductDetails />,
          loader: async ({ params }) => {
            try {
              const id = params.id;
              const data = await fetchProduct(parseInt(id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              console.log("Items were fetched for the admin products page.");
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "products/create",
          element: <CreateProduct />,
        },
        {
          path: "products/edit/:id",
          element: <EditProduct />,
          loader: async ({ params }) => {
            try {
              const data = await fetchProduct(parseInt(params.id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "categories",
          element: <AdminCategories />,
          loader: async () => {
            try {
              const data = await fetchProductCategoryData();
              console.log("Items were fetched for the admin categories page.");
              return data;
            } catch (error) {
              console.error(error);
              const emptyArray: ProductCategoryDataProp[] = [];
              return emptyArray;
            }
          },
        },
        {
          path: "categories/details/:id",
          element: <CategoryDetails />,
          loader: async ({ params }) => {
            try {
              const id = params.id;
              const data = await fetchProductCategory(parseInt(id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              console.log("Items were fetched for the admin categories page.");
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "categories/create",
          element: <CreateCategory />,
        },
        {
          path: "categories/edit/:id",
          element: <EditCategory />,
          loader: async ({ params }) => {
            try {
              const data = await fetchProductCategory(
                parseInt(params.id ?? "0")
              );
              if (data === null) {
                return redirect("/error");
              }
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "orders",
          element: <AdminOrders />,
          loader: async () => {
            try {
              const data = await fetchAllOrders();
              console.log("Items were fetched for the admin orders page.");
              return data;
            } catch (error) {
              console.error(error);
              const emptyArray: OrderProp[] = [];
              return emptyArray;
            }
          },
        },
        {
          path: "orders/details/:id",
          element: <OrderDetails />,
          loader: async ({ params }) => {
            try {
              const id = params.id;
              const data = await fetchOrder(parseInt(id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              console.log("Items were fetched for the admin orders page.");
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "orders/edit/:id",
          element: <EditOrder />,
          loader: async ({ params }) => {
            try {
              const data = await fetchOrder(parseInt(params.id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "order-lines/details/:id",
          element: <OrderLineDetails />,
          loader: async ({ params }) => {
            try {
              const id = params.id;
              const data = await fetchOrderLine(parseInt(id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              console.log("Items were fetched for the admin order lines page.");
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "order-lines/create/order/:orderId",
          element: <CreateOrderLine />,
          loader: async ({ params }) => {
            const parsedId = parseInt(params.orderId ?? "0");
            if (parsedId === 0) {
              return redirect("/error");
            }
            return params.orderId;
          },
        },
        {
          path: "order-lines/edit/:id",
          element: <EditOrderLine />,
          loader: async ({ params }) => {
            try {
              const data = await fetchOrderLine(parseInt(params.id ?? "0"));
              if (data === null) {
                return redirect("/error");
              }
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "users",
          element: <AdminUsers />,
          loader: async () => {
            try {
              const data = await fetchCustomers();
              console.log("Items were fetched for the admin users page.");
              return data;
            } catch (error) {
              console.error(error);
              const emptyArray: AuthUserProp[] = [];
              return emptyArray;
            }
          },
        },
        {
          path: "users/details/:id",
          element: <UserDetails />,
          loader: async ({ params }) => {
            try {
              const id = params.id;
              const data = await fetchCustomerDataById(id ?? "", true);
              if (data === null) {
                return redirect("/error");
              }
              console.log("Items were fetched for the admin users page.");
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
        {
          path: "users/create",
          element: <CreateUser />,
        },
        {
          path: "users/edit/:id",
          element: <EditUser />,
          loader: async ({ params }) => {
            try {
              const data = await fetchCustomerDataById(params.id ?? "", true);
              if (data === null) {
                return redirect("/error");
              }
              return data;
            } catch (error) {
              console.error(error);
              return redirect("/error");
            }
          },
        },
      ],
      loader: async () => {
        try {
          const user = await isAdminLoggedIn();
          if (user == null) {
            return redirect("/admin/login");
          }
          return user;
        } catch (error) {
          console.error(error);
          return redirect("/error");
        }
      },
    }
  );

  return routes;
};

let routes: RouteObject[] = [];
try {
  // const productCategories = await fetchProductCategoryData();
  routes = getRoutes();
} catch (error) {
  console.error(error);
}

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
