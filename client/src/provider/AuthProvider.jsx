import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "./firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUser, toggleLoading } from "../redux/feature/user/userSlice";
import { useGetUserByEmailQuery } from "../redux/feature/api/userApi";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [mainUser, setMainUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const { data: user } = useGetUserByEmailQuery(mainUser?.email);

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const deleteUserFromFRB = () => {
    return deleteUser(mainUser);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setMainUser(currentUser);
      if (currentUser && mainUser) {
        dispatch(
          setUser({
            name: currentUser?.displayName,
            photo: currentUser?.photoURL,
            email: currentUser?.email,
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
      // console.log("current user", currentUser);
      // get token and store client
      //   const userInfo = { email: currentUser?.email };
      //   axiosPublic.post("/auth", userInfo).then((res) => {
      //     if (res.data.token) {
      //       localStorage.setItem("access-token", res.data?.token);
      //       setLoading(false);
      //     } else {
      //       // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
      //       localStorage.removeItem("access-token");
      //       setLoading(false);
      //     }
      //   });
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [dispatch, mainUser, user]);

  const authInfo = {
    mainUser,
    loading,
    logIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    deleteUserFromFRB,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
