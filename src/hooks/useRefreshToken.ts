import {
  getAccessToken,
  storeAccessToken,
} from "../helpers/accessTokenManagement";
import { refreshToken } from "../repositories/authRepository";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const accessToken = getAccessToken();
    if (accessToken === null) {
      throw new Error("The access token is not stored");
    }
    const response = await refreshToken(accessToken);
    if (response === 400) {
      throw new Error("Bad Request");
    } else if (auth !== null && setAuth !== null) {
      auth.user = response;
      setAuth(auth);
      storeAccessToken(response.token);
    }
    return response.token;
  };
  return refresh;
}
