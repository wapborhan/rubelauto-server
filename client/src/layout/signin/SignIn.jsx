import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/feature/user/userSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await dispatch(loginUser({ email, password }));
    if (result) {
      navigate(location?.state ? location?.state : "/dashboard");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <Link to="/">
              {/* <img src="https://i.ibb.co/1LV8nQP/logo.png" alt="" /> */}
              Rubel Auto
            </Link>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            With the power of K-WD, you can now focus only on functionaries for
            your digital products, while leaving the UI design on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>{"Don't"} have an account?</span>
            <Link to="/signup" className="underline">
              Get Started!
            </Link>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form onSubmit={handleLogin} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-semibold text-gray-500">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                autoFocus
                defaultValue="test@gmail.com"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
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
                placeholder="password"
                defaultValue="Abc@123"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className=" flex  justify-center gap-3">
              <Button
                type="submit"
                label="Log in"
                icon="pi pi-check"
                loading={loading}
                // onClick={load}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {/* {loading ? (
                  <span className="flex justify-center gap-3">
                    <span>Logging in...</span>
                  </span>
                ) : (
                  "Log in"
                )} */}
              </Button>
            </div>
            {/* <div className="flex flex-col space-y-5">
              <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
              </span>
              <div className="flex flex-col space-y-4">
                <SocialSignIn />
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
