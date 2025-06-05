import axios, { AxiosInstance } from "axios";
import { CheckIfTaken, ProductCategory } from "../models/dataTransferObjects";
import { ErrorMessages } from "../helpers/constants";
import {
  AddProductCategoryRequest,
  UpdateProductCategoryRequest,
} from "../models/requests";
import useRegularAxios from "../hooks/useRegularAxios";

export async function getAllProductCategories(): Promise<ProductCategory[]> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get<ProductCategory[]>("categories");
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

export async function getProductCategory(
  id: number
): Promise<ProductCategory | 404> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get<ProductCategory>(
      `categories/${id}`
    );
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

export async function addCategory(
  category: AddProductCategoryRequest,
  authAxios: AxiosInstance
): Promise<ProductCategory | 400 | 401> {
  try {
    const response = await authAxios.post<ProductCategory>(
      "categories",
      category
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

export async function updateCategory(
  category: UpdateProductCategoryRequest,
  authAxios: AxiosInstance
): Promise<ProductCategory | 400 | 401 | 404> {
  try {
    const response = await authAxios.put<ProductCategory>(
      "categories",
      category
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

export async function deleteCategory(
  id: number,
  authAxios: AxiosInstance
): Promise<200 | 401 | 404> {
  try {
    await authAxios.delete(`categories/${id}`);
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

export async function isCategoryNameTaken(
  name: string
): Promise<CheckIfTaken | 400> {
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get(`categories/name/${name}`);
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
