import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";

export function getAxiosInstance(
  withCredentials: boolean,
  authorizationToken: string | null = null
) {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: withCredentials,
  });
  if (authorizationToken !== null) {
    instance.defaults.headers["Authorization"] = authorizationToken;
  }

  return instance;
}
