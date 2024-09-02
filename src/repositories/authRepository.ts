import axios from "axios";
import { AuthorizedUser } from "../models/dataTransferObjects";
import {
  LoginCustomerRequest,
  LoginAdminRequest,
  RegisterUserRequest,
} from "../models/requests";
import { ErrorMessages } from "../helpers/constants";
import useRegularAxios from "../hooks/useRegularAxios";
import { getAxiosInstance } from "./axiosConfig";

export async function customerLogin(
  loginCustomerRequest: LoginCustomerRequest
): Promise<AuthorizedUser | 400 | 404> {
  const axiosInstance = useRegularAxios();
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
  const axiosInstance = useRegularAxios();
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
  const axiosInstance = useRegularAxios();
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

export async function logOut(): Promise<200 | 400> {
  const axiosInstance = getAxiosInstance(true);
  try {
    await axiosInstance.get("users/authorization/logout");
    return 200;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
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
