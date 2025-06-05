import { createContext, ReactNode, useMemo, useState } from "react";
import { AuthData, AuthorizedUser, User } from "../models/dataTransferObjects";
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
// import { getAccessToken } from "../helpers/accessTokenManagement";
// import { jwtDecode } from "jwt-decode";
// import { getUserById } from "../repositories/userRepository";
// import useAuthAxios from "../hooks/useAuthAxios";
// import { getUserId } from "../helpers/userIdManagement";

export const AuthContext = createContext<AuthContextState>({
  auth: null,
  setAuth: (_) => {},
});

export interface AuthContextState {
  auth: AuthData | null;
  setAuth: (auth: AuthData | null) => void;
}

interface Props {
  children: ReactNode | ReactNode[];
}

export default function AuthProvider({ children }: Readonly<Props>) {
  // const accessToken = getAccessToken();
  // let authData: AuthData | null = null;
  // if (accessToken !== null) {
  //     const decodedJwt = jwtDecode(accessToken);
  //     const userId = (decodedJwt as { id: number }).id;
  //     getUserById(userId, useAuthAxios()).then(user => {
  //         if (user !== 401 && user !== 404) {
  //             authData = { user }
  //         }
  //     });
  // }

  const [auth, setAuth] = useState<AuthData | null>(null);
  const authContextStateMemo = useMemo(
    () => ({ auth: auth, setAuth: setAuth }),
    [auth, setAuth]
  );

  return (
    <AuthContext.Provider value={authContextStateMemo}>
      {children}
    </AuthContext.Provider>
  );
}
