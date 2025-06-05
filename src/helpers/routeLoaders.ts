import { Params, redirect } from "react-router-dom";
import { getAllShops, getShopById } from "../repositories/shopRepository";
import { getAllProducts, getProduct } from "../repositories/productRepository";
import {
  getAllProductCategories,
  getProductCategory,
} from "../repositories/productCategoryRepository";
import { axiosLoader } from "../repositories/axiosConfig";
import { getAccessToken, storeAccessToken } from "./accessTokenManagement";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../repositories/authRepository";
import { getUserId, storeUserId } from "./userIdManagement";
import { AxiosInstance } from "axios";
import {
  getAllOrders,
  getAllUserOrders,
  getOrder,
} from "../repositories/orderRepository";
import {
  getAllCustomers,
  getCustomerById,
} from "../repositories/userRepository";
import { getOrderLine } from "../repositories/orderLineRepository";

interface PathParameters {
  params: Params<string>;
}

function setAxiosRequestInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.request.use(
    async (config) => {
      if (!config.headers["Authorization"]) {
        const jwtAccessToken = getAccessToken();
        if (jwtAccessToken === null) {
          throw new Error("The access token is not stored");
        }
        const decodedJwt = jwtDecode(jwtAccessToken);
        const jwtExpirySecondsUnixEpoch = decodedJwt.exp ?? 0;
        const currentSecondsUnixEpoch = Math.floor(Date.now() / 1000);
        console.log(`Decoded exp: ${decodedJwt.exp}`);
        console.log(`Current: ${currentSecondsUnixEpoch}`);
        if (currentSecondsUnixEpoch > jwtExpirySecondsUnixEpoch) {
          console.log("jwt expired");
          const user = await refreshToken(jwtAccessToken);
          if (user === 400) {
            throw new Error("Bad Request");
          }
          storeAccessToken(user.token);
          storeUserId(user.id);
          config.headers["Authorization"] = `Bearer ${user.token}`;
        } else {
          console.log("jwt has not expired yet");
          config.headers["Authorization"] = `Bearer ${jwtAccessToken}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

function setAxiosResponseInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const jwtAccessToken = getAccessToken();
        if (jwtAccessToken === null) {
          throw new Error("The access token is not stored");
        }
        const user = await refreshToken(jwtAccessToken);
        if (user === 400) {
          throw new Error("Bad Request");
        }
        storeAccessToken(user.token);
        storeUserId(user.id);
        prevRequest.headers["Authorization"] = `Bearer ${user.token}`;
        return axiosLoader(prevRequest);
      }
      return Promise.reject(error);
    }
  );
}

function ejectAxiosRequestInterceptor(
  axiosInstance: AxiosInstance,
  id: number
) {
  axiosInstance.interceptors.request.eject(id);
}

function ejectAxiosResponseInterceptor(
  axiosInstance: AxiosInstance,
  id: number
) {
  axiosInstance.interceptors.response.eject(id);
}

export async function rootRouteLoader() {
  try {
    return await getAllShops();
  } catch (error) {
    console.error(error);
    return redirect("/error");
  }
}

export async function orderHistoryRouteLoader() {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    const userId = getUserId();
    if (userId === null) {
      throw new Error("User is not authorized");
    }
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const userOrders = await getAllUserOrders(userId, axiosLoader);
    if (userOrders === 401) {
      throw new Error("User is not authorized");
    }
    return userOrders;
  } catch (error) {
    console.error(error);
    return redirect("/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function productsRouteLoader(categoryId: number | null) {
  try {
    return await getAllProducts(categoryId);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function adminProductDetailsRouteLoader({
  params,
}: PathParameters) {
  try {
    const data = await getProduct(parseInt(params.id ?? "0"));
    if (data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin products page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditProductRouteLoader({ params }: PathParameters) {
  try {
    const data = await getProduct(parseInt(params.id ?? "0"));
    if (data === 404) {
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
    const data = await getAllProductCategories();
    console.log("Items were fetched for the admin categories page.");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function adminCategoryDetailsRouteLoader({
  params,
}: PathParameters) {
  try {
    const data = await getProductCategory(parseInt(params.id ?? "0"));
    if (data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin categories page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditCategoryRouteLoader({ params }: PathParameters) {
  try {
    const data = await getProductCategory(parseInt(params.id ?? "0"));
    if (data === 404) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminOrdersRouteLoader() {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getAllOrders(axiosLoader);
    if (data === 401) {
      throw new Error("User is not authorized");
    }
    console.log("Items were fetched for the admin orders page.");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminOrderDetailsRouteLoader({ params }: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getOrder(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin orders page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminEditOrderRouteLoader({ params }: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getOrder(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminOrderLineDetailsRouteLoader({
  params,
}: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getOrderLine(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin order lines page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminCreateOrderLineRouteLoader({
  params,
}: PathParameters) {
  const parsedId = parseInt(params.orderId ?? "0");
  if (parsedId === 0) {
    return redirect("/admin/error");
  }
  return params.orderId;
}

export async function adminEditOrderLineRouteLoader({
  params,
}: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getOrderLine(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminUsersRouteLoader() {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getAllCustomers(axiosLoader);
    if (data === 401) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin users page.");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminUserDetailsRouteLoader({ params }: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getCustomerById(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin users page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminEditUserRouteLoader({ params }: PathParameters) {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    requestIntercept = setAxiosRequestInterceptor(axiosLoader);
    responseIntercept = setAxiosResponseInterceptor(axiosLoader);
    const data = await getCustomerById(parseInt(params.id ?? "0"), axiosLoader);
    if (data === 401 || data === 404) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
    }
  }
}

export async function adminShopsRouteLoader() {
  try {
    const data = await getAllShops();
    console.log("Items were fetched for the admin shops page.");
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function adminShopDetailsRouteLoader({ params }: PathParameters) {
  try {
    const data = await getShopById(parseInt(params.id ?? "0"));
    if (data === 404) {
      return redirect("/admin/error");
    }
    console.log("Items were fetched for the admin shops page.");
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

export async function adminEditShopRouteLoader({ params }: PathParameters) {
  try {
    const data = await getShopById(parseInt(params.id ?? "0"));
    if (data === 404) {
      return redirect("/admin/error");
    }
    return data;
  } catch (error) {
    console.error(error);
    return redirect("/admin/error");
  }
}

// export async function currentAuthUserRouteLoader() {
//   let requestIntercept: number | null = null;
//   let responseIntercept: number | null = null;
//   try {
//     const userId = getUserId();
//     const accessToken = getAccessToken();
//     requestIntercept = setAxiosRequestInterceptor(axiosLoader);
//     responseIntercept = setAxiosResponseInterceptor(axiosLoader);
//     if (userId !== null && accessToken !== null) {
//       const user = await getUserById(userId, axiosLoader);
//       if (user !== 401 && user !== 404) {
//         console.log(`Retrieved user by id ${user.id} in current user loader`);
//         const authUser: AuthorizedUser = {
//           id: user.id,
//           firstName: user.firstName,
//           userName: user.userName,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           token: accessToken,
//           userRoleId: user.userRoleId,
//           userRole: user.userRole,
//         };
//         return authUser;
//       }
//     }
//     return null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   } finally {
//     if (requestIntercept !== null) {
//       ejectAxiosRequestInterceptor(axiosLoader, requestIntercept);
//     }
//     if (responseIntercept !== null) {
//       ejectAxiosResponseInterceptor(axiosLoader, responseIntercept);
//     }
//   }
// }
