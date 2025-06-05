import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { AuthData, AuthorizedUser } from "../models/dataTransferObjects";
import { AxiosInstance } from "axios";
import {
  getAccessToken,
  storeAccessToken,
} from "../helpers/accessTokenManagement";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../repositories/authRepository";
import { getUserId, storeUserId } from "../helpers/userIdManagement";
import { axiosCredentials } from "../repositories/axiosConfig";
import { getUserById } from "../repositories/userRepository";

function setAxiosRequestInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.request.use(
    async (config) => {
      if (!config.headers["Authorization"]) {
        const jwtAccessToken = getAccessToken();
        if (jwtAccessToken === null) {
          throw new Error("The access token is not stored");
        }
        const decodedJwt = jwtDecode(jwtAccessToken);
        const jwtExpirySecondsUnixEpoch = decodedJwt.exp ?? 0;
        const currentSecondsUnixEpoch = Math.floor(Date.now() / 1000);
        console.log(`Decoded exp: ${decodedJwt.exp}`);
        console.log(`Current: ${currentSecondsUnixEpoch}`);
        if (currentSecondsUnixEpoch > jwtExpirySecondsUnixEpoch) {
          console.log("jwt expired");
          const user = await refreshToken(jwtAccessToken);
          if (user === 400) {
            throw new Error("Bad Request");
          }
          storeAccessToken(user.token);
          storeUserId(user.id);
          config.headers["Authorization"] = `Bearer ${user.token}`;
        } else {
          console.log("jwt has not expired yet");
          config.headers["Authorization"] = `Bearer ${jwtAccessToken}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

function setAxiosResponseInterceptor(axiosInstance: AxiosInstance) {
  return axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const jwtAccessToken = getAccessToken();
        if (jwtAccessToken === null) {
          throw new Error("The access token is not stored");
        }
        const user = await refreshToken(jwtAccessToken);
        if (user === 400) {
          throw new Error("Bad Request");
        }
        storeAccessToken(user.token);
        storeUserId(user.id);
        prevRequest.headers["Authorization"] = `Bearer ${user.token}`;
        return axiosCredentials(prevRequest);
      }
      return Promise.reject(error);
    }
  );
}

function ejectAxiosRequestInterceptor(
  axiosInstance: AxiosInstance,
  id: number
) {
  axiosInstance.interceptors.request.eject(id);
}

function ejectAxiosResponseInterceptor(
  axiosInstance: AxiosInstance,
  id: number
) {
  axiosInstance.interceptors.response.eject(id);
}

async function getAuthorizedUser() {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;
  try {
    const userId = getUserId();
    const accessToken = getAccessToken();
    requestIntercept = setAxiosRequestInterceptor(axiosCredentials);
    responseIntercept = setAxiosResponseInterceptor(axiosCredentials);
    if (userId !== null && accessToken !== null) {
      const user = await getUserById(userId, axiosCredentials);
      if (user !== 401 && user !== 404) {
        console.log(`Retrieved user by id ${user.id} in AuthProvider`);
        const authUser: AuthorizedUser = {
          id: user.id,
          firstName: user.firstName,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: accessToken,
          userRoleId: user.userRoleId,
          userRole: user.userRole,
        };
        return authUser;
      }
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    if (requestIntercept !== null) {
      ejectAxiosRequestInterceptor(axiosCredentials, requestIntercept);
    }
    if (responseIntercept !== null) {
      ejectAxiosResponseInterceptor(axiosCredentials, responseIntercept);
    }
  }
}

export default function LoadAuth() {
  const { auth, setAuth } = useAuth();
  if (auth === null) {
    getAuthorizedUser().then((authUser) => {
      const authData: AuthData | null =
        authUser === null
          ? null
          : {
              user: authUser,
            };
      setAuth(authData);
    });
  }
  return <Outlet />;
}
