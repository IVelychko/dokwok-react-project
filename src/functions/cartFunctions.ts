import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import { CartProp } from "../helpers/Interfaces";

export async function fetchCart(): Promise<CartProp> {
  try {
    const response = await axios.get<CartProp>(`${BASE_API_URL}/cart`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was an error in fetching cart from the server.");
  }
}

export async function addItemToCart(productId: number, quantity: number) {
  try {
    const response = await axios.post<CartProp>(
      `${BASE_API_URL}/cart/item?productId=${productId}&quantity=${quantity}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function removeItemFromCart(productId: number, quantity: number) {
  try {
    const response = await axios.delete<CartProp>(
      `${BASE_API_URL}/cart/item?productId=${productId}&quantity=${quantity}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function removeLineFromCart(productId: number) {
  try {
    const response = await axios.delete<CartProp>(
      `${BASE_API_URL}/cart/line?productId=${productId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}

export async function clearCart() {
  try {
    await axios.delete(`${BASE_API_URL}/cart`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}
