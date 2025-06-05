import axios, { AxiosInstance } from "axios";
import { Order } from "../models/dataTransferObjects";
import {
  AddDeliveryOrderRequest,
  AddTakeawayOrderRequest,
  UpdateOrderRequest,
} from "../models/requests";
import { ErrorMessages } from "../helpers/constants";
import useRegularAxios from "../hooks/useRegularAxios";

export async function getAllOrders(
  authAxios: AxiosInstance
): Promise<Order[] | 401> {
  try {
    const response = await authAxios.get<Order[]>("orders");
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
  userId: number,
  authAxios: AxiosInstance
): Promise<Order[] | 401> {
  try {
    const response = await authAxios.get<Order[]>(`users/${userId}/orders`);
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
  authAxios: AxiosInstance
): Promise<Order | 401 | 404> {
  try {
    const response = await authAxios.get<Order>(`orders/${id}`);
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
  const axiosInstance = useRegularAxios();
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
  const axiosInstance = useRegularAxios();
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
  authAxios: AxiosInstance
): Promise<Order | 400 | 401 | 404> {
  try {
    const response = await authAxios.put<Order>("orders", order);
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
  authAxios: AxiosInstance
): Promise<200 | 401 | 404> {
  try {
    await authAxios.delete(`orders/${id}`);
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
