import { createContext, ReactNode, useMemo, useState } from "react";
import { AuthData } from "../models/dataTransferObjects";

export const AuthContext = createContext<AuthContextState>({ auth: null, setAuth: _ => {} });

export interface AuthContextState {
  auth: AuthData | null;
  setAuth: ((auth: AuthData | null) => void);
}

interface Props {
    children: ReactNode | ReactNode[]
}

export default function AuthProvider({ children }: Readonly<Props>) {
    const [auth, setAuth] = useState<AuthData | null>(null);
    const authContextStateMemo = useMemo(() => ({ auth: auth, setAuth: setAuth }), [auth, setAuth])

    return <AuthContext.Provider value={authContextStateMemo}>
        {children}
    </AuthContext.Provider>
}