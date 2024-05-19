import axios from "axios";
import { BASE_API_URL } from "../constants";
import { CartProp } from "../Interfaces";

export async function fetchCart(): Promise<CartProp> {
  const response = await axios.get<CartProp>(`${BASE_API_URL}/cart`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("There was an error in fetching cart from the server.");
  }
  return response.data;
}

export async function addItemToCart(productId: number, quantity: number) {
  const response = await axios.post<CartProp>(
    `${BASE_API_URL}/cart/item?productId=${productId}&quantity=${quantity}`,
    null,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("There was an error in adding the item to the cart.");
  }
  return response.data;
}

export async function removeItemFromCart(productId: number, quantity: number) {
  const response = await axios.delete<CartProp>(
    `${BASE_API_URL}/cart/item?productId=${productId}&quantity=${quantity}`,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("There was an error in adding the item to the cart.");
  }
  return response.data;
}

export async function removeLineFromCart(productId: number) {
  const response = await axios.delete<CartProp>(
    `${BASE_API_URL}/cart/line?productId=${productId}`,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("There was an error in adding the item to the cart.");
  }
  return response.data;
}

export async function clearCart() {
  const response = await axios.delete(`${BASE_API_URL}/cart`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("There was an error in adding the item to the cart.");
  }
}
