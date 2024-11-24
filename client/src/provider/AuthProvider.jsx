import { createContext, useEffect, useState } from "react";
import { deleteUser, onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.config";
import { useDispatch } from "react-redux";
import { setUser, toggleLoading } from "../redux/feature/user/userSlice";
import { useGetUserByEmailQuery } from "../redux/feature/api/userApi";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [mainUser, setMainUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data: user } = useGetUserByEmailQuery(mainUser?.email);

  const deleteUserFromFRB = () => {
    return deleteUser(mainUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setMainUser(currentUser);
      if (currentUser && mainUser) {
        dispatch(
          setUser({
            name: user?.data?.name,
            photo: user?.data?.photo,
            email: user?.data?.email,
            joinDate: user?.data?.joinDate,
            mobile: user?.data?.mobile,
            showRoom: user?.data?.showRoom,
            designation: user?.data?.designation,
            bloodGroup: user?.data?.bloodGroup,
            address: user?.data?.address,
            userType: user?.data?.userType,
            isUpdated: false,
            isLoading: false,
          })
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }

      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [dispatch, mainUser, user]);

  const authInfo = {
    mainUser,
    loading,
    deleteUserFromFRB,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
