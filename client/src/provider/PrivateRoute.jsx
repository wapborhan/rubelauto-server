import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { mainUser, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { isUpdated, userType } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (
      userType !== "admin" &&
      !isUpdated &&
      location.pathname !== "/profile/edit"
    ) {
      navigate("/profile/edit");
    }
  }, [userType, isUpdated, navigate, location.pathname]);

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
