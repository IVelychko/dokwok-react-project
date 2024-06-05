import axios from "axios";
import { BASE_API_URL } from "../helpers/constants";
import {
  AuthUserProp,
  LoginUserProp,
  RegisterUserProp,
} from "../helpers/Interfaces";

export async function login(loginUser: LoginUserProp) {
  try {
    await axios.post(`${BASE_API_URL}/users/login`, loginUser, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in trying to log in the user.");
  }
}

export async function register(registerUser: RegisterUserProp) {
  try {
    await axios.post(`${BASE_API_URL}/users/register`, registerUser, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in trying to register the user.");
  }
}

export async function isLoggedIn(): Promise<AuthUserProp | null> {
  try {
    const response = await axios.get<AuthUserProp>(
      `${BASE_API_URL}/users/isloggedin`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return null;
        } else {
          throw new Error("There was a server-side error.");
        }
      } else {
        throw new Error("The request never reached the server.");
      }
    } else {
      throw new Error("There was a non-axios related error.");
    }
  }
}

export async function logOut() {
  try {
    await axios.get(`${BASE_API_URL}/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("There was an error in logging out the user.");
  }
}
