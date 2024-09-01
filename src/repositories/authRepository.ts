import axios from "axios";
import { AuthorizedUser, User } from "../models/dataTransferObjects";
import {
  LoginCustomerRequest,
  LoginAdminRequest,
  RegisterUserRequest,
} from "../models/requests";
import { getAxiosInstance } from "./axiosConfig";
import { ErrorMessages } from "../helpers/constants";

export async function customerLogin(
  loginCustomerRequest: LoginCustomerRequest
): Promise<AuthorizedUser | 400 | 404> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.post(
      "users/authorization/customers/login",
      loginCustomerRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 404) {
          return 404;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function adminLogin(
  loginAdminRequest: LoginAdminRequest
): Promise<AuthorizedUser | 400 | 404> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.post(
      "users/authorization/admins/login",
      loginAdminRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 404) {
          return 404;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function register(
  registerUserRequest: RegisterUserRequest
): Promise<AuthorizedUser | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.post(
      "users/authorization/register",
      registerUserRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function refreshToken(
  token: string
): Promise<AuthorizedUser | 400> {
  const axiosInstance = getAxiosInstance(true);
  try {
    const response = await axiosInstance.post(
      "users/authorization/refreshToken",
      { token: token }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else {
          throw new Error(ErrorMessages.serverSideError);
        }
      } else {
        throw new Error(ErrorMessages.errorNeverReached);
      }
    } else {
      throw new Error(ErrorMessages.nonAxiosRelatedError);
    }
  }
}

export async function isCustomerTokenValid(): Promise<User | null> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get<AuthorizedUser>(
      "users/customers/isTokenValid",
      { headers: { Authorization: "" } }
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

export async function isAdminTokenValid(): Promise<AuthorizedUser | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthorizedUser>(
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
