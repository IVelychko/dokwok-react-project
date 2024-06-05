import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import { AuthUserProp } from "../helpers/Interfaces";

export async function fetchUserDataById(
  id: string | null
): Promise<AuthUserProp> {
  try {
    const apiUrl = id
      ? `${BASE_API_URL}/users/id/${id}`
      : `${BASE_API_URL}/users/id`;
    const response = await axios.get<AuthUserProp>(apiUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the user data.");
  }
}
