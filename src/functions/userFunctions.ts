import axios from "axios";
import {
  AuthUserProp,
  RegisterUserProp,
  UserPasswordChangeAsAdminProp,
  UserPasswordChangeProp,
} from "../helpers/Interfaces";
import { getAxiosInstance } from "./axiosConfig";

export async function fetchUsers(): Promise<AuthUserProp[]> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp[]>("users");
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the user data.");
  }
}

export async function fetchCustomers(): Promise<AuthUserProp[]> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp[]>("users/customers");
    return response.data;
  } catch (error) {
    throw new Error("There was an error fetching the customer data.");
  }
}

export async function fetchUserDataById(
  id: string,
  isAdmin: boolean
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp>(
      `users/id/${id}?isAdmin=${isAdmin}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
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

export async function fetchCustomerDataById(
  id: string,
  isAdmin: boolean
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get<AuthUserProp>(
      `users/customers/id/${id}?isAdmin=${isAdmin}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
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

export async function addUser(
  user: RegisterUserProp
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("users", user);
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

export async function updateUser(
  user: AuthUserProp,
  isAdmin: boolean
): Promise<AuthUserProp | null> {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.put<AuthUserProp>(
      `users?isAdmin=${isAdmin}`,
      user
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

export async function updateCustomerPassword(
  prop: UserPasswordChangeProp
): Promise<boolean> {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.put("users/password", prop);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return false;
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

export async function updateCustomerPasswordAsAdmin(
  prop: UserPasswordChangeAsAdminProp
): Promise<boolean> {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.put("users/password/asAdmin", prop);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          return false;
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

export async function deleteUserById(id: string) {
  const axiosInstance = getAxiosInstance();
  try {
    await axiosInstance.delete(`users/${id}`);
  } catch (error) {
    throw new Error("There was an error deleting the user data.");
  }
}
