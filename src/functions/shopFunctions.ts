import axios from "axios";
import { CheckIfTaken, ShopPostProp, ShopProp } from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function fetchShops() {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<ShopProp[]>("shops");
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the shops data.");
  }
}

export async function fetchShopById(id: number): Promise<ShopProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<ShopProp>(`shops/${id}`);
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

export async function addShop(shop: ShopPostProp): Promise<ShopProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<ShopProp>("shops", shop);
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

export async function updateShop(shop: ShopProp): Promise<ShopProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<ShopProp>("shops", shop);
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

export async function deleteShop(id: number) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`shops/${id}`);
  } catch (error) {
    throw new Error("There was an error deleting the shop data.");
  }
}

export async function isAddressTaken(
  street: string,
  building: string
): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(
      `shops/isAddressTaken/${street}/${building}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the shop address.");
  }
}
