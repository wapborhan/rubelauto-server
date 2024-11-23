import moment from "moment";
import { useSelector } from "react-redux";

const Profile = () => {
  const {
    photo,
    name,
    email,
    mobile,
    showRoom,
    designation,
    bloodGroup,
    address,
    joinDate,
  } = useSelector((state) => state.userStore);

  return (
    <>
      <div className="flex flex-col justify-center gap-3 items-start w-full">
        <div className="d">
          <img src={photo} alt={name} className="w-32 rounded-2xl" />
        </div>
        <div className="d">Name: {name}</div>
        <div className="d">Email: {email}</div>
        <div className="d">Mobile: {mobile}</div>
        <div className="d">Showroom: {showRoom}</div>
        <div className="d">Designation: {designation}</div>
        <div className="d">Blood Group: {bloodGroup}</div>
        <div className="d">Address: {address}</div>
        <div className="d">
          Joining Date:
          {moment(joinDate).format("DD-MMM-YYYY")}
        </div>
      </div>
    </>
  );
};

export default Profile;
