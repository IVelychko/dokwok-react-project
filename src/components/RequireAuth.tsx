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

    let userAllowed: boolean = false;
    auth.user.roles.forEach(userRole => {
        if (allowedRoles.find(allowedRole => allowedRole === userRole)) {
            userAllowed = true;
        }
    });
    console.log(`User with roles ${auth.user.roles} allowed: ${userAllowed}`);
    return userAllowed ? 
        <Outlet /> :
        <Navigate to={fallbackPath} state={{from: location }} replace />
}