import axios from "axios";
import { CheckIfTaken, User } from "../models/dataTransferObjects";
import {
  AddUserRequest,
  UpdateUserRequest,
  UserPasswordChangeAsAdminRequest,
  UserPasswordChangeRequest,
} from "../models/requests";
import { getAxiosInstance } from "./axiosConfig";
import { ErrorMessages } from "../helpers/constants";

export async function getAllUsers(token: string): Promise<User[] | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<User[]>("users");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
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

export async function getAllCustomers(token: string): Promise<User[] | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<User[]>("users/customers");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
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

export async function getUserById(
  id: string,
  token: string
): Promise<User | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<User>(`users/id/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
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

export async function getCustomerById(
  id: string,
  token: string
): Promise<User | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.get<User>(`users/customers/id/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
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

export async function addUser(
  addUserRequest: AddUserRequest,
  token: string
): Promise<User | 400 | 401> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.post("users", addUserRequest);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 401) {
          return 401;
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

export async function updateUser(
  updateUserRequest: UpdateUserRequest,
  token: string
): Promise<User | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    const response = await axiosInstance.put<User>(`users`, updateUserRequest);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 401) {
          return 401;
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

export async function updateCustomerPassword(
  passwordChangeRequest: UserPasswordChangeRequest,
  token: string
): Promise<boolean | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.put("users/password", passwordChangeRequest);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 401) {
          return 401;
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

export async function updateCustomerPasswordAsAdmin(
  changePasswordRequest: UserPasswordChangeAsAdminRequest,
  token: string
): Promise<boolean | 400 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.put("users/password/asAdmin", changePasswordRequest);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          return 400;
        } else if (error.response.status === 401) {
          return 401;
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

export async function deleteUserById(
  id: string,
  token: string
): Promise<200 | 401 | 404> {
  const axiosInstance = getAxiosInstance(false, token);
  try {
    await axiosInstance.delete(`users/${id}`);
    return 200;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return 401;
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

export async function isUserNameTaken(
  userName: string
): Promise<CheckIfTaken | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get(
      `users/customers/isUserNameTaken/${userName}`
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

export async function isEmailTaken(email: string): Promise<CheckIfTaken | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get(
      `users/customers/isEmailTaken/${email}`
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

export async function isPhoneNumberTaken(
  phoneNumber: string
): Promise<CheckIfTaken | 400> {
  const axiosInstance = getAxiosInstance(false);
  try {
    const response = await axiosInstance.get(
      `users/customers/isPhoneTaken/${phoneNumber}`
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
