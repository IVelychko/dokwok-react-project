import axios from "axios";
import { CheckIfTaken, Product } from "../models/dataTransferObjects";
import { AddProductRequest, UpdateProductRequest } from "../models/requests";
import { getAxiosInstance } from "./axiosConfig";
import { ErrorMessages } from "../helpers/constants";

export async function getAllProducts(
  productCategoryId: number | null
): Promise<Product[]> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const apiUrl = productCategoryId
      ? `products?categoryId=${productCategoryId}`
      : "products";
    const response = await axiosInstance.get<Product[]>(apiUrl);
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

export async function getProduct(id: number): Promise<Product | 404> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get<Product>(`products/${id}`);
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

export async function addProduct(
  product: AddProductRequest,
  token: string
): Promise<Product | 400 | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.post<Product>("products", product);
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

export async function updateProduct(
  product: UpdateProductRequest,
  token: string
): Promise<Product | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.put<Product>("products", product);
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

export async function deleteProduct(
  id: number,
  token: string
): Promise<200 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.delete(`products/${id}`);
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

export async function isProductNameTaken(
  name: string
): Promise<CheckIfTaken | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get(`products/isNameTaken/${name}`);
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
