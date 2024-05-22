import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import { AuthUserProp } from "../helpers/Interfaces";

export async function fetchUserDataById(
  id: string | null
): Promise<AuthUserProp> {
  const apiUrl = id
    ? `${BASE_API_URL}/users/id/${id}`
    : `${BASE_API_URL}/users/id`;
  const response = await axios.get<AuthUserProp>(apiUrl, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("There was an error fetching the user data.");
  }
  return response.data;
}
