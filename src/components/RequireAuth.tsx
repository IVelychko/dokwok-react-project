import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {
    allowedRoles: string[],
    fallbackPath: string
}

export default function RequireAuth({ allowedRoles, fallbackPath }: Readonly<Props>) {
    const { auth } = useAuth();
    const location = useLocation();
    
    if (auth === null) {
        console.log("User is not authorized");
        return <Navigate to={fallbackPath} state={{from: location }} replace />
    }

    const userAllowed = allowedRoles.includes(auth.user.userRole);
    console.log(`User with role ${auth.user.userRole} allowed: ${userAllowed}`);
    return userAllowed ? 
        <Outlet /> :
        <Navigate to={fallbackPath} state={{from: location }} replace />
}