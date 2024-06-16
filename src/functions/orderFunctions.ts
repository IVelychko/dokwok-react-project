import axios from "axios";
import {
  DeliveryOrderFormProp,
  TakeawayOrderFormProp,
  OrderLinePostProp,
  OrderLineProp,
  OrderLinePutProp,
  OrderProp,
  OrderPutProp,
} from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function fetchAllOrders() {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderProp[]>("orders");
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting all orders.");
  }
}

export async function fetchUserOrders(userId: string) {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderProp[]>(
      `orders?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the orders of the user.");
  }
}

export async function fetchOrder(id: number): Promise<OrderProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderProp>(`orders/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function addDeliveryOrder(
  orderForm: DeliveryOrderFormProp
): Promise<OrderProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<OrderProp>(
      "orders/delivery",
      orderForm
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function addTakeawayOrder(
  orderForm: TakeawayOrderFormProp
): Promise<OrderProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<OrderProp>(
      "orders/takeaway",
      orderForm
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function updateOrder(
  orderForm: OrderPutProp
): Promise<OrderProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<OrderProp>("orders", orderForm);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function deleteOrder(id: number) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`orders/${id}`);
  } catch (error) {
    throw new Error("There was an error in deleting the order by id.");
  }
}

export async function fetchAllOrderLines() {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderLineProp[]>("orders/lines");
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting all order lines.");
  }
}

export async function fetchOrderLinesByOrder(orderId: number) {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderLineProp[]>(
      `orders/lines?orderId=${orderId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the lines of the order.");
  }
}

export async function fetchOrderLine(
  id: number
): Promise<OrderLineProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderLineProp>(
      `orders/lines/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function fetchOrderLineByOrderAndProductIds(
  orderId: number,
  productId: number
): Promise<OrderLineProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<OrderLineProp>(
      `orders/lines/${orderId}/${productId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function addOrderLine(
  orderLine: OrderLinePostProp
): Promise<OrderLineProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<OrderLineProp>(
      "orders/lines",
      orderLine
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function updateOrderLine(
  orderLine: OrderLinePutProp
): Promise<OrderLineProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<OrderLineProp>(
      "orders/lines",
      orderLine
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function deleteOrderLine(id: number) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`orders/lines/${id}`);
  } catch (error) {
    throw new Error("There was an error in deleting the order line by id.");
  }
}
