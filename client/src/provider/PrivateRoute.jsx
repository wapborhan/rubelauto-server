import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { mainUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (mainUser) {
    return children;
  }

  if (loading) {
    return children;
  }

  return <Navigate to="/signin" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = { children: PropTypes.object };
