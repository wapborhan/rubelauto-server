import { Outlet } from "react-router-dom";

const AuthLay = () => {
  return (
    <div
      className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center"
      style={{
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"
        style={{
          backdropFilter: "blur(5px)",
        }}
      ></div>
      <Outlet />
    </div>
  );
};

export default AuthLay;
