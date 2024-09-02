import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";

export function getAxiosInstance(withCredentials: boolean) {
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: withCredentials,
  });
}

export const axiosRegular = axios.create({ baseURL: BASE_API_URL });

export const axiosCredentials = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});
