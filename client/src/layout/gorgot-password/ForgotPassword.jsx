import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/feature/user/userSlice";
import { Messages } from "primereact/messages";

const ForgotPassword = () => {
  const msgs = useRef(null);
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

    // const result = dispatch(forgotPassword(email));
    try {
      const result = await dispatch(forgotPassword(email));
      if (forgotPassword.fulfilled.match(result)) {
        console.log(result.payload);
        if (msgs.current) {
          msgs.current.clear();
          msgs.current.show({
            severity: "success",
            sticky: true,
            content: (
              <>
                <div className="ml-2">
                  We sent to reset link to your email <b>{email}</b>
                </div>
              </>
            ),
          });
        }
        // navigate(location?.state?.from || "/auth/signin");
        setLoading(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white rounded-2xl shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-sm z-10">
      <div className="p-12 bg-white md:flex-1">
        <h3 className="my-4 !text-4xl text-center font-semibold text-gray-700">
          Forgot Password?
        </h3>
        <Messages ref={msgs} />
        <div className="my-6 text-lg">
          Please enter your email address to search for your account.
        </div>
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

          <div className=" flex  justify-end gap-3">
            <Link
              label="Login"
              to="/auth/signin"
              className="px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Log in
            </Link>

            <Button
              type="submit"
              label="Search"
              icon="pi pi-check"
              loading={loading}
              className="px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4 justify-around flex"
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
