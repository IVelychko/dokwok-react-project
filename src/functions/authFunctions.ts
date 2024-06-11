import axios from "axios";
import {
  AuthUserProp,
  CheckIfTaken,
  LoginUserProp,
  RegisterUserProp,
} from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function customerLogin(
  loginUser: LoginUserProp
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post(
      "users/customers/login",
      loginUser
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
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

export async function adminLogin(
  loginUser: LoginUserProp
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("users/admins/login", loginUser);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
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

export async function register(
  registerUser: RegisterUserProp
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("users/register", registerUser);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
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

export async function isCustomerLoggedIn(): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp>(
      "users/customers/isloggedin"
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

export async function isAdminLoggedIn(): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp>(
      "users/admins/isloggedin"
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
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.get("users/logout");
  } catch (error) {
    throw new Error("There was an error in logging out the user.");
  }
}

export async function isUserNameTaken(userName: string): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(
      `users/customers/isUserNameTaken/${userName}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the username.");
  }
}

export async function isEmailTaken(email: string): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(
      `users/customers/isEmailTaken/${email}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the email.");
  }
}

export async function isPhoneNumberTaken(
  phoneNumber: string
): Promise<CheckIfTaken> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(
      `users/customers/isPhoneTaken/${phoneNumber}`
    );
    return response.data;
  } catch (error) {
    throw new Error("There was an error in checking the phone number.");
  }
}
