import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import AllSRCards from "./AllSRCards";
import Card from "./Card";
import useSingleStaff from "../../hooks/useSingleStaff";

const Dashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [singlestaff, refetch, isLoading, isPending] = useSingleStaff(email);

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <div className="head mb-5">
        <h1 className="font-normal text-2xl">
          Showroom: <span className="font-bold">{singlestaff?.showRoom}</span>
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full mx-auto ">
        <AllSRCards />
      </div>
      <div className="mt-8">
        <Card />
      </div>
    </div>
  );
};

export default Dashboard;
