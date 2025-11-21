import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }
  return children;
};

export default PublicRoute;
