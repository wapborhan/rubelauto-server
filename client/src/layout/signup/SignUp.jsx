import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/feature/user/userSlice";
import { useSetUserMutation } from "../../redux/feature/api/userApi";
import { useEffect, useState } from "react";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setUser, { isSuccess, isError, error }] = useSetUserMutation();
  const { email, name } = useSelector((state) => state.userStore);

  // 🔑 State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch("password");

  useEffect(() => {
    if (name && email) {
      navigate("/dashboard");
    }
  }, [navigate, email, name]);

  const onSubmit = ({ name, email, password }) => {
    dispatch(createUser({ name, email, password }));
    const userInfo = {
      joinDate: new Date(),
      name: name,
      photo: "",
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
        <h3 className="my-4 text-2xl text-center font-semibold text-gray-700">
          একাউন্ট তৈরি করুণ
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-500">নাম</label>
              {errors.name && <span className="text-red-600">নাম আবশ্যক</span>}
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="আপনার নাম"
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-500">
                ইমেইল
              </label>
              {errors.email && <p className="text-red-600">ইমেইল আবশ্যক</p>}
            </div>
            <input
              type="email"
              placeholder="আপনার ইমেইল @domain.com"
              {...register("email", { required: true })}
              className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-500">
                পাসওয়ার্ড
              </label>
              {errors.password?.type === "required" && (
                <p className="text-red-600">পাসওয়ার্ড আবশ্যক</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">
                  পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  পাসওয়ার্ড অবশ্যই ১৬ অক্ষরের কম হতে হবে
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  পাসওয়ার্ডে অবশ্যই বড় হাতের, ছোট হাতের, সংখ্যা এবং বিশেষ
                  অক্ষর (!@#$&*) থাকতে হবে।
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /(?=.*[A-Z])(?=.*[!@#-$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="পাসওয়ার্ড"
                className="w-full px-4 py-2 pr-10 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? (
                  <i className="pi pi-eye-slash"></i>
                ) : (
                  <i className="pi pi-eye"></i>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between">
              <label className="text-sm font-semibold text-gray-500">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              {/* {watch("confirmPassword") &&
                watch("confirmPassword") !== password && (
                  <p className="text-red-600">পাসওয়ার্ড মিলছে না।</p>
                )} */}

              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "আপনার পাসওয়ার্ড নিশ্চিত করুন",
                  validate: (value) =>
                    value === password || "পাসওয়ার্ড মিলছে না।",
                })}
                placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                className="w-full px-4 py-2 pr-10 transition duration-300 border border-gray-300 rounded focus:ring-4 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              >
                {showPassword ? (
                  <i className="pi pi-eye-slash"></i>
                ) : (
                  <i className="pi pi-eye"></i>
                )}
              </button>
            </div>

            {/* 🔴 Live password match error */}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-200"
            >
              একাউন্ট তৈরি করুণ
            </button>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="p-4 py-6 text-white bg-blue-500 md:w-6/12 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
        <div className="my-3 text-4xl font-bold tracking-wider text-center">
          <Link to="/">
            <img
              src="/images/logo/logo-squire.png"
              alt="Rubel Auto"
              className="w-40 bg-white p-2 rounded-lg mx-auto"
            />
          </Link>
        </div>
        {/* <p className="mt-6 p-3 font-normal text-justify text-gray-300 md:mt-0">
          <b>Rubel Auto</b> is a trusted dealer of Runner Automobiles PLC.
        </p> */}
        <p className="flex flex-col items-center justify-center mt-10 text-center">
          <span>আপনার কি অ্যাকাউন্ট আছে?</span>
          <Link to="/auth/signin" className="underline">
            লগিন করুণ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
