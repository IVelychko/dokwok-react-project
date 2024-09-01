import axios from "axios";
import { Order } from "../models/dataTransferObjects";
import {
  AddDeliveryOrderRequest,
  AddTakeawayOrderRequest,
  UpdateOrderRequest,
} from "../models/requests";
import { getAxiosInstance } from "./axiosConfig";
import { ErrorMessages } from "../helpers/constants";

export async function getAllOrders(token: string): Promise<Order[] | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<Order[]>("orders");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function getAllUserOrders(
  userId: string,
  token: string
): Promise<Order[] | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<Order[]>(
      `orders?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function getOrder(
  id: number,
  token: string
): Promise<Order | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<Order>(`orders/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
          return 404;
        } else if (error.response.status === 401) {
          return 401;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function addDeliveryOrder(
  order: AddDeliveryOrderRequest
): Promise<Order | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.post<Order>("orders/delivery", order);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function addTakeawayOrder(
  order: AddTakeawayOrderRequest
): Promise<Order | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.post<Order>("orders/takeaway", order);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function updateOrder(
  order: UpdateOrderRequest,
  token: string
): Promise<Order | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.put<Order>("orders", order);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 401) {
          return 401;
        } else if (error.response.status === 404) {
          return 404;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function deleteOrder(
  id: number,
  token: string
): Promise<200 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.delete(`orders/${id}`);
    return 200;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
        } else if (error.response.status === 404) {
          return 404;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}
