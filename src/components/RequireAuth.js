import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { user } = useSelector((state) => state.userState);

  if (!user) {
    // return <Navigate to="/" state={{ path: window.location.pathname }} />;
  }

  return children;
}

export default RequireAuth;
