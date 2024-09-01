import { Params, redirect } from "react-router-dom";
import { Cart } from "../models/dataTransferObjects";
import { Categories } from "./constants";

interface PathParameters {
  params: Params<string>;
}

export async function rootRouteLoader() {
  let cart: Cart;
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
  let shops: ShopProp[];
  try {
    shops = await getAllShops();
  } catch (error) {
    console.error(error);
    return redirect("/error");
  }
  const rootLoaderData: RootLoaderData = { cart, user, shops };
  return rootLoaderData;
}

export async function editProfileRouteLoader() {
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
}

export async function orderHistoryRouteLoader() {
  try {
    const user = await isCustomerLoggedIn();
    if (user == null) {
      return redirect("/login");
    }
    const userOrders = await getAllUserOrders(user.id);
    return userOrders;
  } catch (error) {
    console.error(error);
    return redirect("/error");
  }
}

export async function accountLayoutRouteLoader() {
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
}

export async function allMenuRouteLoader() {
  try {
    const data = await getAllProducts(null);
    console.log("Items were fetched for the main page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: ProductDataProp[] = [];
    return emptyArray;
  }
}

export async function foodSetMenuRouteLoader() {
  return await getAllProducts(Categories.foodSet);
}

export async function noodlesMenuRouteLoader() {
  return await getAllProducts(Categories.noodles);
}

export async function rollsMenuRouteLoader() {
  return await getAllProducts(Categories.roll);
}

export async function pizzaMenuRouteLoader() {
  return await getAllProducts(Categories.pizza);
}

export async function coldBeverageMenuRouteLoader() {
  return await getAllProducts(Categories.coldBeverage);
}

export async function adminProductsRouteLoader() {
  try {
    const data = await getAllProducts(null);
    console.log("Items were fetched for the admin products page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: ProductDataProp[] = [];
    return emptyArray;
  }
}

export async function adminProductDetailsRouteLoader() {
  try {
    const id = params.id;
    const data = await getProduct(parseInt(id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin products page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditProductRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const data = await getProduct(parseInt(pathParameters.params.id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminCategoriesRouteLoader() {
  try {
    const data = await fetchProductCategoryData();
    console.log("Items were fetched for the admin categories page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: ProductCategoryDataProp[] = [];
    return emptyArray;
  }
}

export async function adminCategoryDetailsRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const id = pathParameters.params.id;
    const data = await fetchProductCategory(parseInt(id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin categories page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditCategoryRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const data = await fetchProductCategory(
      parseInt(pathParameters.params.id ?? "0")
    );
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminOrdersRouteLoader() {
  try {
    const data = await getAllOrders();
    console.log("Items were fetched for the admin orders page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: OrderProp[] = [];
    return emptyArray;
  }
}

export async function adminOrderDetailsRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const id = pathParameters.params.id;
    const data = await getOrder(parseInt(id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin orders page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditOrderRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const data = await getOrder(parseInt(params.id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminOrderLineDetailsRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const id = pathParameters.params.id;
    const data = await fetchOrderLine(parseInt(id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin order lines page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminCreateOrderLineRouteLoader(
  pathParameters: PathParameters
) {
  const parsedId = parseInt(params.orderId ?? "0");
  if (parsedId === 0) {
    return redirect("/admin/error");
  }
  return pathParameters.params.orderId;
}

export async function adminEditOrderLineRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const data = await fetchOrderLine(
      parseInt(pathParameters.params.id ?? "0")
    );
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminUsersRouteLoader() {
  try {
    const data = await getAllCustomers();
    console.log("Items were fetched for the admin users page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: AuthUserProp[] = [];
    return emptyArray;
  }
}

export async function adminUserDetailsRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const id = pathParameters.params.id;
    const data = await getCustomerById(id ?? "", true);
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin users page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditUserRouteLoader(pathParameters: PathParameters) {
  try {
    const data = await getCustomerById(pathParameters.params.id ?? "", true);
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminShopsRouteLoader() {
  try {
    const data = await getAllShops();
    console.log("Items were fetched for the admin shops page.");
    return data;
  } catch (error) {
    console.error(error);
    const emptyArray: ShopProp[] = [];
    return emptyArray;
  }
}

export async function adminShopDetailsRouteLoader(
  pathParameters: PathParameters
) {
  try {
    const data = await getShopById(parseInt(pathParameters.params.id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin shops page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditShopRouteLoader(pathParameters: PathParameters) {
  try {
    const data = await getShopById(parseInt(pathParameters.params.id ?? "0"));
    if (data === null) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminRootRouteLoader() {
  try {
    const user = await isAdminLoggedIn();
    if (user == null) {
      return redirect("/admin/login");
    }
    return user;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}
