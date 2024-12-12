import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase.config";
import { useDispatch } from "react-redux";
import { setUser, toggleLoading } from "../redux/feature/user/userSlice";
import { useGetUserByEmailQuery } from "../redux/feature/api/userApi";

const AuthProvider = ({ children }) => {
  const [mainUser, setMainUser] = useState(null);
  const dispatch = useDispatch();
  const { data: user } = useGetUserByEmailQuery(mainUser?.email);

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
            isUpdated: user?.data?.isUpdated,
            isLoading: false,
          })
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [dispatch, mainUser, user]);

  return children;
};

export default AuthProvider;
