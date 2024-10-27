import useAuth from "../../hooks/useAuth";

const Settings = () => {
  const { user } = useAuth;
  return <div>Settings</div>;
};

export default Settings;
