import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { user } = useSelector((state) => state.userState);
  const navigate = useNavigate();

  if (!user) {
    // return navigate("/", { state: { path: window.location.pathname } });
    return Navigate({ to: "/", state: { path: window.location.pathname } });
  }

  return children;
}

export default RequireAuth;
