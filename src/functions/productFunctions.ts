import axios from "axios";
import {
  CheckIfTaken,
  ProductCategoryDataProp,
  ProductCategoryPostData,
  ProductDataProp,
  ProductPostData,
  ProductPutData,
} from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function fetchProductCategoryData() {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<ProductCategoryDataProp[]>(
      "products/categories"
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product category data.");
  }
}

export async function fetchProductCategory(
  id: number
): Promise<ProductCategoryDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<ProductCategoryDataProp>(
      `products/categories/${id}`
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

export async function addCategory(
  category: ProductCategoryPostData
): Promise<ProductCategoryDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<ProductCategoryDataProp>(
      "products/categories",
      category
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
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

export async function updateCategory(
  category: ProductCategoryDataProp
): Promise<ProductCategoryDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<ProductCategoryDataProp>(
      "products/categories",
      category
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

export async function deleteCategory(id: number) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`products/categories/${id}`);
  } catch (error) {
    throw new Error("There was an error deleting the category data.");
  }
}

export async function fetchProductData(productCategoryId: number | null) {
  const axiosInstance = getAxiosInstance();
  try {
    const apiUrl = productCategoryId
      ? `products?categoryId=${productCategoryId}`
      : "products";
    const response = await axiosInstance.get<ProductDataProp[]>(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product data.");
  }
}

export async function fetchProduct(
  id: number
): Promise<ProductDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<ProductDataProp>(`products/${id}`);
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

export async function addProduct(
  product: ProductPostData
): Promise<ProductDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<ProductDataProp>(
      "products",
      product
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
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

export async function updateProduct(
  product: ProductPutData
): Promise<ProductDataProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<ProductDataProp>(
      "products",
      product
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

export async function deleteProduct(id: number) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`products/${id}`);
  } catch (error) {
    throw new Error("There was an error deleting the product data.");
  }
}

export async function isProductNameTaken(name: string): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(`products/isNameTaken/${name}`);
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the name.");
  }
}

export async function isCategoryNameTaken(name: string): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(
      `products/categories/isNameTaken/${name}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the name.");
  }
}
