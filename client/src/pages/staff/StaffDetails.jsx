import { useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useGetSingleStaffQuery } from "../../redux/feature/api/staffApi";

const StaffDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const {
    data: singlestaff,
    refetch,
    isLoading,
  } = useGetSingleStaffQuery(email);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <div className="flex flex-col justify-center gap-3 items-left w-full">
          <div className="d">
            <img
              src={singlestaff?.data.photo}
              alt={singlestaff?.data.name}
              className="w-32 rounded-2xl"
            />
          </div>
          <div className="d">Name: {singlestaff?.data.name}</div>
          <div className="d">Email: {singlestaff?.data.email}</div>
          <div className="d">Mobile: {singlestaff?.data.mobile}</div>
          <div className="d">Showroom: {singlestaff?.data.showRoom}</div>
          <div className="d">Designation: {singlestaff?.data.designation}</div>
          <div className="d">Blood Group: {singlestaff?.data.bloodGroup}</div>
          <div className="d">Address: {singlestaff?.data.address}</div>
          <div className="d">
            Joining Date:
            {moment(singlestaff?.data.joinDate).format("DD-MMM-YYYY")}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffDetails;
