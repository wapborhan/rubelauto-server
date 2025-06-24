import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/feature/user/userSlice";
import { useSetUserMutation } from "../../redux/feature/api/userApi";
import { useEffect } from "react";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setUser, { isSuccess, isError, error }] = useSetUserMutation();
  const { email, name } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (name && email) {
      navigate("/dashboard");
    }
  }, [navigate, email, name]);

  const onSubmit = ({ name, email, photoURL, password }) => {
    dispatch(createUser({ name, email, photoURL, password }));
    const userInfo = {
      joinDate: new Date(),
      name: name,
      photo: photoURL,
      email: email,
      mobile: "",
      showRoom: "",
      designation: "",
      address: "",
      bloodGroup: "",
      userType: "user",
      isUpdated: false,
    };
    setUser(userInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/profile/edit");
    }
  }, [isSuccess, navigate, reset]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-lg z-10">
      <div className="p-5 bg-white md:flex-1">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">
          Create Account
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-500">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              autoFocus
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-500">
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              name="photoURL"
              autoFocus
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-gray-500">
              Email address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              autoFocus
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />{" "}
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-500"
              >
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 12,
                pattern: /(?=.*[A-Z])(?=.*[!@#-$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="password"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 12 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character (!@#$&*).
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              // disabled={disabled}
              value="Login"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="p-4 py-6 text-white bg-blue-500 md:w-6/12 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <Link to="/">
            {/* <img src="https://i.ibb.co/1LV8nQP/logo.png" alt="" /> */}
            Rubel Auto
          </Link>
        </div>
        <p className="mt-6 p-3 font-normal text-justify text-gray-300 md:mt-0">
          <b>Rubel Auto</b> is a trusted dealer of Runner Automobiles PLC.
        </p>
        <p className="flex flex-col items-center justify-center mt-10 text-center">
          <span>Do You have an account?</span>
          <Link to="/auth/signin" className="underline">
            Log In!
          </Link>
        </p>
        {/* <p className="mt-6 text-sm text-center text-gray-300">
          Read our
          <a href="#" className="underline">
            terms
          </a>
          and
          <a href="#" className="underline">
            conditions
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default SignUp;
