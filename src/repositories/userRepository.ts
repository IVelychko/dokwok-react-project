import axios, { AxiosInstance } from "axios";
import { CheckIfTaken, User } from "../models/dataTransferObjects";
import {
  AddUserRequest,
  UpdateUserRequest,
  UserPasswordChangeAsAdminRequest,
  UserPasswordChangeRequest,
} from "../models/requests";
import { ErrorMessages, Roles } from "../helpers/constants";
import useRegularAxios from "../hooks/useRegularAxios";

export async function getAllUsers(
  authAxios: AxiosInstance
): Promise<User[] | 401> {
  try {
    const response = await authAxios.get<User[]>("users");
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

export async function getAllCustomers(
  authAxios: AxiosInstance
): Promise<User[] | 401> {
  try {
    const response = await authAxios.get<User[]>(
      `roles/${Roles.customer}/users`
    );
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
  id: number,
  authAxios: AxiosInstance
): Promise<User | 401 | 404> {
  try {
    const response = await authAxios.get<User>(`users/${id}`);
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
  id: number,
  authAxios: AxiosInstance
): Promise<User | 401 | 404> {
  try {
    const response = await authAxios.get<User>(
      `roles/${Roles.customer}/users/${id}`
    );
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
  authAxios: AxiosInstance
): Promise<User | 400 | 401> {
  try {
    const response = await authAxios.post("users", addUserRequest);
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
  authAxios: AxiosInstance
): Promise<User | 400 | 401 | 404> {
  try {
    const response = await authAxios.put<User>(`users`, updateUserRequest);
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
  authAxios: AxiosInstance
): Promise<boolean | 400 | 401 | 404> {
  try {
    await authAxios.put("users/password", passwordChangeRequest);
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
  authAxios: AxiosInstance
): Promise<boolean | 400 | 401 | 404> {
  try {
    await authAxios.put("users/password/as-admin", changePasswordRequest);
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
  id: number,
  authAxios: AxiosInstance
): Promise<200 | 401 | 404> {
  try {
    await authAxios.delete(`users/${id}`);
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
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get(`users/username/${userName}`);
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
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get(`users/email/${email}`);
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
  const axiosInstance = useRegularAxios();
  try {
    const response = await axiosInstance.get(`users/phone/${phoneNumber}`);
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
