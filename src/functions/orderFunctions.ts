import axios from "axios";
import { OrderFormProp, OrderProp } from "../helpers/Interfaces";
import { BASE_API_URL } from "../helpers/constants";

export async function addOrder(orderForm: OrderFormProp) {
  const response = await axios.post<OrderProp>(
    `${BASE_API_URL}/orders`,
    orderForm,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("There was an error in adding the item to the cart.");
  }
  return response.data;
}
