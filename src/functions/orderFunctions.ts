import axios from "axios";
import {
  OrderFormProp,
  OrderLinePostProp,
  OrderLineProp,
  OrderLinePutProp,
  OrderProp,
  OrderPutProp,
} from "../helpers/Interfaces";
import { BASE_API_URL } from "../helpers/constants";

export async function fetchAllOrders() {
  try {
    const response = await axios.get<OrderProp[]>(`${BASE_API_URL}/orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting all orders.");
  }
}

export async function fetchUserOrders(userId: string) {
  try {
    const response = await axios.get<OrderProp[]>(
      `${BASE_API_URL}/orders?userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the orders of the user.");
  }
}

export async function fetchOrder(id: number) {
  try {
    const response = await axios.get<OrderProp>(
      `${BASE_API_URL}/orders/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the order by id.");
  }
}

export async function addOrder(orderForm: OrderFormProp) {
  try {
    const response = await axios.post<OrderProp>(
      `${BASE_API_URL}/orders`,
      orderForm,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function updateOrder(orderForm: OrderPutProp) {
  try {
    const response = await axios.put<OrderProp>(
      `${BASE_API_URL}/orders`,
      orderForm,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in updating the item to the cart.");
  }
}

export async function deleteOrder(id: number) {
  try {
    await axios.delete(`${BASE_API_URL}/orders/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in deleting the order by id.");
  }
}

export async function fetchAllOrderLines() {
  try {
    const response = await axios.get<OrderLineProp[]>(
      `${BASE_API_URL}/orders/lines`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting all order lines.");
  }
}

export async function fetchOrderLinesByOrder(orderId: number) {
  try {
    const response = await axios.get<OrderLineProp[]>(
      `${BASE_API_URL}/orders/lines?orderId=${orderId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the lines of the order.");
  }
}

export async function fetchOrderLine(id: number) {
  try {
    const response = await axios.get<OrderLineProp>(
      `${BASE_API_URL}/orders/lines/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in getting the order line by id.");
  }
}

export async function addOrderLine(orderLine: OrderLinePostProp) {
  try {
    const response = await axios.post<OrderLineProp>(
      `${BASE_API_URL}/orders/lines`,
      orderLine,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the order line.");
  }
}

export async function updateOrderLine(orderLine: OrderLinePutProp) {
  try {
    const response = await axios.put<OrderLineProp>(
      `${BASE_API_URL}/orders/lines`,
      orderLine,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in updating the order line.");
  }
}

export async function deleteOrderLine(id: number) {
  try {
    await axios.delete(`${BASE_API_URL}/orders/lines/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in deleting the order line by id.");
  }
}
