import { useNavigate } from "react-router-dom";
import { AuthUserStateType, useAuth } from "../../hooks/hooks";
import { useEffect } from "react";

export default function PersonalCabinet() {
  const authUserState: AuthUserStateType | null = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (authUserState !== null) {
      if (authUserState.authUser.token.length < 1) {
        navigate("/login", { replace: true });
      }
    }
  });

  return <div>Personal Restricted cabinet</div>;
}
