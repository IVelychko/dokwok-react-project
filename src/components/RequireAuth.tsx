import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
    allowedRoles: string[]
}

export default function RequireAuth({ allowedRoles }: Readonly<Props>) {
    const { auth } = useAuth();
    const location = useLocation();

    return auth !== null ?
        <Outlet /> :
        <Navigate to="/login" state={{from: location }} replace />
}