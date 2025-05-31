import AllSRCards from "./AllSRCards";
import Card from "./Card";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { showRoom } = useSelector((state) => state.userStore);

  return (
    <div>
      <div className="head mb-5">
        <h1 className="font-normal text-2xl">
          Showroom: <span className="font-bold">{showRoom}</span>
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 w-full mx-auto ">
        <AllSRCards />
      </div>
      <div className="mt-8">
        <Card />
      </div>
    </div>
  );
};

export default Dashboard;
