import axios from "axios";
import { OrderLine } from "../models/dataTransferObjects";
import { getAxiosInstance } from "./axiosConfig";
import {
  AddOrderLineRequest,
  UpdateOrderLineRequest,
} from "../models/requests";
import { ErrorMessages } from "../helpers/constants";

export async function getAllOrderLines(token: string) {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<OrderLine[]>("orders/lines");
    return response.data;
  } catch (error) {
    throw new Error("An error occured while getting all order lines");
  }
}

export async function getAllOrderLinesByOrderId(
  orderId: number,
  token: string
): Promise<OrderLine[] | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<OrderLine[]>(
      `orders/lines?orderId=${orderId}`
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
  token: string
): Promise<OrderLine | 404 | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<OrderLine>(`orders/lines/${id}`);
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
  token: string
): Promise<OrderLine | 404 | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<OrderLine>(
      `orders/lines/${orderId}/${productId}`
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
  token: string
): Promise<OrderLine | 400 | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.post<OrderLine>(
      "orders/lines",
      orderLine
    );
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
  token: string
): Promise<OrderLine | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.put<OrderLine>(
      "orders/lines",
      orderLine
    );
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
  token: string
): Promise<200 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.delete(`orders/lines/${id}`);
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
