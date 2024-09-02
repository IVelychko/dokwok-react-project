import { createContext, ReactNode, useState } from "react";
import { AuthData } from "../models/dataTransferObjects";

export const AuthContext = createContext<AuthContextState>({ auth: null, setAuth: null });

export interface AuthContextState {
  auth: AuthData | null;
  setAuth: ((auth: AuthData | null) => void) | null;
}

interface Props {
    children: ReactNode | ReactNode[]
}

export default function AuthProvider({ children }: Readonly<Props>) {
    const [auth, setAuth] = useState<AuthData | null>(null);

    return <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
        {children}
    </AuthContext.Provider>
}