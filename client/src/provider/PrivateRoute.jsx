import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/shared/Loading";
// import { useDispatch, useSelector } from "react-redux";
// import { onAuthStateChanged } from "firebase/auth";
// import auth from "./firebase.config";
// import { setUser, toggleLoading } from "../redux/feature/user/userSlice";

const PrivateRoute = ({ children }) => {
  // const { email, isLoading } = useSelector((state) => state.userStore);
  // const pathname = useLocation();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       dispatch(
  //         setUser({
  //           email: user.email,
  //           name: user.displayName,
  //           isLoading: false,
  //           photo: user.photoURL,
  //         })
  //       );
  //       dispatch(toggleLoading(false));
  //     } else {
  //       dispatch(toggleLoading(false));
  //     }
  //   });
  // }, [dispatch]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (!isLoading && !email) {
  //   return <Navigate to="/signin" state={{ path: pathname }} />;
  // }

  // return children;

  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading) {
    return children;
  }

  return <Navigate to="/signin" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
