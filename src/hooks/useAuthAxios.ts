import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { axiosCredentials } from "../repositories/axiosConfig";
import { getAccessToken } from "../helpers/accessTokenManagement";

export default function useAuthAxios() {
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosCredentials.interceptors.request.use(
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
            const newJwtAccessToken = await refresh();
            config.headers["Authorization"] = `Bearer ${newJwtAccessToken}`;
          } else {
            console.log("jwt has not expired yet");
            config.headers["Authorization"] = `Bearer ${jwtAccessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosCredentials.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosCredentials(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosCredentials.interceptors.request.eject(requestIntercept);
      axiosCredentials.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosCredentials;
}
