import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";

export function getAxiosInstance() {
  const instance = axios.create();
  instance.defaults.baseURL = BASE_API_URL;
  instance.defaults.withCredentials = true;
  return instance;
}
