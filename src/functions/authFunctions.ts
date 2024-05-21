import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import {
  AuthUserProp,
  LoginUserProp,
  RegisterUserProp,
} from "../helpers/Interfaces";

export async function login(loginUser: LoginUserProp): Promise<AuthUserProp> {
  const response = await axios.post<AuthUserProp>(
    `${BASE_API_URL}/users/login`,
    loginUser
  );
  if (response.status !== 200) {
    throw new Error("There was an error in trying to log in the user.");
  }
  return response.data;
}

export async function register(
  registerUser: RegisterUserProp
): Promise<AuthUserProp> {
  const response = await axios.post<AuthUserProp>(
    `${BASE_API_URL}/users/register`,
    registerUser
  );
  if (response.status !== 200) {
    throw new Error("There was an error in trying to register the user.");
  }
  return response.data;
}
