import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/feature/user/userSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name } = useSelector((state) => state.userStore);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name && email) {
      navigate("/dashboard");
    }
  }, [navigate, email, name]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    console.log(email);

    const result = dispatch(forgotPassword(email));
    console.log(result);

    if (result) {
      // navigate(location?.state?.from || "/auth/signin");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md z-10">
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
          <Link to="/auth/signin" className="underline">
            Login
          </Link>
        </p>
      </div>
      <div className="p-5 bg-white md:flex-1">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">
          Forgot Password
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

          <div className=" flex  justify-center gap-3">
            <Button
              type="submit"
              label="Submit"
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
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
