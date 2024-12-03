import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, isUpdated, userType, isLoading } = useSelector(
    (state) => state.userStore
  );

  useEffect(() => {
    if (
      userType !== "admin" &&
      !isUpdated &&
      location.pathname !== "/profile/edit"
    ) {
      navigate("/profile/edit");
    }
  }, [userType, isUpdated, navigate, location.pathname]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (email) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;

PrivateRoute.propTypes = { children: PropTypes.object };
