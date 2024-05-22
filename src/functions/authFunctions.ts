import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import {
  AuthUserProp,
  LoginUserProp,
  RegisterUserProp,
} from "../helpers/Interfaces";

export async function login(loginUser: LoginUserProp) {
  const response = await axios.post(`${BASE_API_URL}/users/login`, loginUser, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("There was an error in trying to log in the user.");
  }
}

export async function register(registerUser: RegisterUserProp) {
  const response = await axios.post(
    `${BASE_API_URL}/users/register`,
    registerUser,
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error("There was an error in trying to register the user.");
  }
}

export async function isLoggedIn(): Promise<AuthUserProp> {
  const response = await axios.get<AuthUserProp>(
    `${BASE_API_URL}/users/isloggedin`,
    { withCredentials: true }
  );
  if (response.status === 401) {
    throw new Error("The user is not authorized.");
  } else if (response.status === 500) {
    throw new Error("There was a server-side error.");
  }
  return response.data;
}

export async function logOut() {
  const response = await axios.get(`${BASE_API_URL}/users/logout`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("There was an error in logging out the user.");
  }
}
