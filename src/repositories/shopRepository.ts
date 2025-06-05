import axios, { AxiosInstance } from "axios";
import { CheckIfTaken, Shop } from "../models/dataTransferObjects";
import { AddShopRequest, UpdateShopRequest } from "../models/requests";
import { ErrorMessages } from "../helpers/constants";
import useRegularAxios from "../hooks/useRegularAxios";

export async function getAllShops(): Promise<Shop[]> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get<Shop[]>("shops");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(ErrorMessages.serverSideError);
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function getShopById(id: number): Promise<Shop | 404> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get<Shop>(`shops/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 404) {
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

export async function addShop(
  shop: AddShopRequest,
  authAxios: AxiosInstance
): Promise<Shop | 400 | 401> {
  try {
    const response = await authAxios.post<Shop>("shops", shop);
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

export async function updateShop(
  shop: UpdateShopRequest,
  authAxios: AxiosInstance
): Promise<Shop | 400 | 401 | 404> {
  try {
    const response = await authAxios.put<Shop>("shops", shop);
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

export async function deleteShop(
  id: number,
  authAxios: AxiosInstance
): Promise<200 | 401 | 404> {
  try {
    await authAxios.delete(`shops/${id}`);
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

export async function isAddressTaken(
  street: string,
  building: string
): Promise<CheckIfTaken | 400> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get(
      `shops/address/${street}/${building}`
    );
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
