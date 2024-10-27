import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useSingleStaff from "../../hooks/useSingleStaff";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom";

const StaffDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [singlestaff, refetch, isPending, isLoading] = useSingleStaff(email);

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
              src={singlestaff?.photo}
              alt={singlestaff?.name}
              className="w-32 rounded-2xl"
            />
          </div>
          <div className="d">Name: {singlestaff?.name}</div>
          <div className="d">Email: {singlestaff?.email}</div>
          <div className="d">Mobile: {singlestaff?.mobile}</div>
          <div className="d">Showroom: {singlestaff?.showRoom}</div>
          <div className="d">Designation: {singlestaff?.designation}</div>
          <div className="d">Blood Group: {singlestaff?.bloodGroup}</div>
          <div className="d">Address: {singlestaff?.address}</div>
          <div className="d">
            Joining Date:
            {moment(singlestaff?.joinDate).format("DD-MMM-YYYY")}
          </div>
        </div>
      )}
    </>
  );
};

export default StaffDetails;
