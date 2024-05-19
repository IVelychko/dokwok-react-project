import axios from "axios";
import { BASE_API_URL } from "../constants";
import { ProductCategoryDataProp, ProductDataProp } from "../Interfaces";

export async function fetchProductCategoryData() {
  const response = await axios.get<ProductCategoryDataProp[]>(
    `${BASE_API_URL}/products/categories`
  );
  if (response.status !== 200) {
    throw new Error("There was an error fetching the product category data.");
  }
  return response.data;
}

export async function fetchProductData(productCategoryId: number | null) {
  const apiUrl = productCategoryId
    ? `${BASE_API_URL}/products?categoryId=${productCategoryId}`
    : `${BASE_API_URL}/products`;
  const response = await axios.get<ProductDataProp[]>(apiUrl);
  if (response.status !== 200) {
    throw new Error("There was an error fetching the product data.");
  }
  return response.data;
}
