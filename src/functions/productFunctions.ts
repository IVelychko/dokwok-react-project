import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import {
  ProductCategoryDataProp,
  ProductCategoryPostData,
  ProductDataProp,
  ProductPostData,
  ProductPutData,
} from "../helpers/Interfaces";

export async function fetchProductCategoryData() {
  try {
    const response = await axios.get<ProductCategoryDataProp[]>(
      `${BASE_API_URL}/products/categories`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product category data.");
  }
}

export async function fetchProductCategory(id: number) {
  try {
    const response = await axios.get<ProductCategoryDataProp>(
      `${BASE_API_URL}/products/categories/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product category data.");
  }
}

export async function addCategory(category: ProductCategoryPostData) {
  try {
    const apiUrl = `${BASE_API_URL}/products/categories`;
    const response = await axios.post<ProductCategoryDataProp>(
      apiUrl,
      category,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error adding the category data.");
  }
}

export async function updateCategory(category: ProductCategoryDataProp) {
  try {
    const apiUrl = `${BASE_API_URL}/products/categories`;
    const response = await axios.put<ProductCategoryDataProp>(
      apiUrl,
      category,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error updating the category data.");
  }
}

export async function deleteCategory(id: number) {
  try {
    const apiUrl = `${BASE_API_URL}/products/categories/${id}`;
    await axios.delete(apiUrl, { withCredentials: true });
  } catch (error) {
    throw new Error("There was an error deleting the category data.");
  }
}

export async function fetchProductData(productCategoryId: number | null) {
  try {
    const apiUrl = productCategoryId
      ? `${BASE_API_URL}/products?categoryId=${productCategoryId}`
      : `${BASE_API_URL}/products`;
    const response = await axios.get<ProductDataProp[]>(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product data.");
  }
}

export async function fetchProduct(id: number) {
  try {
    const apiUrl = `${BASE_API_URL}/products/${id}`;
    const response = await axios.get<ProductDataProp>(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the product data by id.");
  }
}

export async function addProduct(product: ProductPostData) {
  try {
    const apiUrl = `${BASE_API_URL}/products`;
    const response = await axios.post<ProductDataProp>(apiUrl, product, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was an error adding the product data.");
  }
}

export async function updateProduct(product: ProductPutData) {
  try {
    const apiUrl = `${BASE_API_URL}/products`;
    const response = await axios.put<ProductDataProp>(apiUrl, product, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was an error updating the product data.");
  }
}

export async function deleteProduct(id: number) {
  try {
    const apiUrl = `${BASE_API_URL}/products/${id}`;
    await axios.delete(apiUrl, { withCredentials: true });
  } catch (error) {
    throw new Error("There was an error deleting the product data.");
  }
}
