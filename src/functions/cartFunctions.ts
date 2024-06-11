import { CartProp } from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function fetchCart(): Promise<CartProp> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<CartProp>("cart");
    return response.data;
  } catch (error) {
    throw new Error("There was an error in fetching cart from the server.");
  }
}

export async function addItemToCart(productId: number, quantity: number) {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post<CartProp>(
      `cart/item?productId=${productId}&quantity=${quantity}`,
      null
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function removeItemFromCart(productId: number, quantity: number) {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.delete<CartProp>(
      `cart/item?productId=${productId}&quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function removeLineFromCart(productId: number) {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.delete<CartProp>(
      `cart/line?productId=${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function clearCart() {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete("cart");
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}
