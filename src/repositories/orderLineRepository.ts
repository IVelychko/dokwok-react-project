import axios, { AxiosInstance } from "axios";
import { OrderLine } from "../models/dataTransferObjects";
import {
  AddOrderLineRequest,
  UpdateOrderLineRequest,
} from "../models/requests";
import { ErrorMessages } from "../helpers/constants";

export async function getAllOrderLines(authAxios: AxiosInstance) {
  try {
    const response = await authAxios.get<OrderLine[]>("order-lines");
    return response.data;
  } catch (error) {
    throw new Error("An error occured while getting all order lines");
  }
}

export async function getAllOrderLinesByOrderId(
  orderId: number,
  authAxios: AxiosInstance
): Promise<OrderLine[] | 401> {
  try {
    const response = await authAxios.get<OrderLine[]>(
      `orders/${orderId}/order-lines`
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

export async function getOrderLine(
  id: number,
  authAxios: AxiosInstance
): Promise<OrderLine | 404 | 401> {
  try {
    const response = await authAxios.get<OrderLine>(`order-lines/${id}`);
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

export async function getOrderLineByOrderAndProductIds(
  orderId: number,
  productId: number,
  authAxios: AxiosInstance
): Promise<OrderLine | 404 | 401> {
  try {
    const response = await authAxios.get<OrderLine>(
      `order-lines/${orderId}/${productId}`
    );
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

export async function addOrderLine(
  orderLine: AddOrderLineRequest,
  authAxios: AxiosInstance
): Promise<OrderLine | 400 | 401> {
  try {
    const response = await authAxios.post<OrderLine>("order-lines", orderLine);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
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

export async function updateOrderLine(
  orderLine: UpdateOrderLineRequest,
  authAxios: AxiosInstance
): Promise<OrderLine | 400 | 401 | 404> {
  try {
    const response = await authAxios.put<OrderLine>("order-lines", orderLine);
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

export async function deleteOrderLine(
  id: number,
  authAxios: AxiosInstance
): Promise<200 | 401 | 404> {
  try {
    await authAxios.delete(`order-lines/${id}`);
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
