import Menu from "./components/menu/Menu";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Cart from "./components/cart/Cart";
import OrderForm from "./components/order/OrderForm";
import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import AccountLayout from "./components/account/AccountLayout";
import Profile from "./components/account/Profile";
import OrderHistory from "./components/account/OrderHistory";
import ErrorPage from "./components/ErrorPage";
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
import UserDetails from "./components/admin/users/UserDetails";
import AdminLogin from "./components/authorization/AdminLogin";
import CreateUser from "./components/admin/users/CreateUser";
import EditUser from "./components/admin/users/EditUser";
import EditProfile from "./components/account/EditProfile";
import AdminErrorPage from "./components/admin/AdminErrorPage";
import AboutUs from "./components/AboutUs";
import Contacts from "./components/Contacts";
import AdminShops from "./components/admin/shops/AdminShops";
import ShopDetails from "./components/admin/shops/ShopDetails";
import CreateShop from "./components/admin/shops/CreateShop";
import EditShop from "./components/admin/shops/EditShop";
import { 
  adminCategoriesRouteLoader, 
  adminCategoryDetailsRouteLoader, 
  adminCreateOrderLineRouteLoader, 
  adminEditCategoryRouteLoader, 
  adminEditOrderLineRouteLoader, 
  adminEditOrderRouteLoader, 
  adminEditProductRouteLoader, 
  adminEditShopRouteLoader, 
  adminEditUserRouteLoader, 
  adminOrderDetailsRouteLoader,
  adminOrderLineDetailsRouteLoader, 
  adminOrdersRouteLoader, 
  adminProductDetailsRouteLoader, 
  adminShopDetailsRouteLoader, 
  adminShopsRouteLoader, 
  adminUserDetailsRouteLoader, 
  adminUsersRouteLoader, 
  orderHistoryRouteLoader,
  productsRouteLoader,
  rootRouteLoader } from "./helpers/routeLoaders";
import AuthProvider from './components/AuthProvider';
import RequireAuth from "./components/RequireAuth";
import { Categories, Roles } from "./helpers/constants";

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<RootLayout />} loader={rootRouteLoader}>
      <Route element={<RequireAuth allowedRoles={[Roles.customer, Roles.admin]} fallbackPath="/login" />}>
        <Route path="account" element={<AccountLayout />} >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="orders" element={<OrderHistory />} loader={orderHistoryRouteLoader} />
        </Route>
      </Route>
      <Route index element={<Menu heading="Всі пропозиції" />} loader={() => productsRouteLoader(null)} />
      <Route path="food-set" element={<Menu heading="Сети" />} loader={() => productsRouteLoader(Categories.foodSet)} />
      <Route path="noodles" element={<Menu heading="Локшина" />} loader={() => productsRouteLoader(Categories.noodles)} />
      <Route path="roll" element={<Menu heading="Роли" />} loader={() => productsRouteLoader(Categories.roll)} />
      <Route path="pizza" element={<Menu heading="Піца" />} loader={() => productsRouteLoader(Categories.pizza)} />
      <Route path="cold-beverage" element={<Menu heading="Прохолодні напої" />} loader={() => productsRouteLoader(Categories.coldBeverage)} />
      <Route path="cart" element={<Cart />} />
      <Route path="order" element={<OrderForm />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="error" element={<ErrorPage />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="contacts" element={<Contacts />} />
    </Route>
    <Route path="/admin">
      <Route path="login" element={<AdminLogin />} />
      <Route path="error" element={<AdminErrorPage />} />
    </Route>
    <Route element={<RequireAuth allowedRoles={[Roles.admin]} fallbackPath="/admin/login" />} >
      <Route path="/admin" element={<AdminLayout />} >
        <Route path="products" element={<AdminProducts />} loader={() => productsRouteLoader(null)} />
        <Route index element={<AdminProducts />} loader={() => productsRouteLoader(null)} />
        <Route path="products/details/:id" element={<ProductDetails />} loader={adminProductDetailsRouteLoader} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} loader={adminEditProductRouteLoader} />
        <Route path="categories" element={<AdminCategories />} loader={adminCategoriesRouteLoader} />
        <Route path="categories/details/:id" element={<CategoryDetails />} loader={adminCategoryDetailsRouteLoader} />
        <Route path="categories/create" element={<CreateCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} loader={adminEditCategoryRouteLoader} />
        <Route path="orders" element={<AdminOrders />} loader={adminOrdersRouteLoader} />
        <Route path="orders/details/:id" element={<OrderDetails />} loader={adminOrderDetailsRouteLoader} />
        <Route path="orders/edit/:id" element={<EditOrder />} loader={adminEditOrderRouteLoader} />
        <Route path="order-lines/details/:id" element={<OrderLineDetails />} loader={adminOrderLineDetailsRouteLoader} />
        <Route path="order-lines/create/order/:orderId" element={<CreateOrderLine />} loader={adminCreateOrderLineRouteLoader} />
        <Route path="order-lines/edit/:id" element={<EditOrderLine />} loader={adminEditOrderLineRouteLoader} />
        <Route path="users" element={<AdminUsers />} loader={adminUsersRouteLoader} />
        <Route path="users/details/:id" element={<UserDetails />} loader={adminUserDetailsRouteLoader} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="users/edit/:id" element={<EditUser />} loader={adminEditUserRouteLoader} />
        <Route path="shops" element={<AdminShops />} loader={adminShopsRouteLoader} />
        <Route path="shops/details/:id" element={<ShopDetails />} loader={adminShopDetailsRouteLoader} />
        <Route path="shops/create" element={<CreateShop />} />
        <Route path="shops/edit/:id" element={<EditShop />} loader={adminEditShopRouteLoader} />
      </Route>
    </Route>
  </Route>
));

export default function App() {
  return (<AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>);
}
