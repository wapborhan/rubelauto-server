import PartsDashboard from "./parts/PartsDashboard";
import AllSRCards from "./showroom/AllSRCards";
import Card from "./showroom/Card";
import { useSelector } from "react-redux";
import ShowroomDashboard from "./showroom/ShowroomDashboard";

const Dashboard = () => {
  const { showRoom } = useSelector((state) => state.userStore);

  return (
    <div>
      <div className="head mb-5">
        <h1 className="font-normal text-2xl">
          Showroom: <span className="font-bold">{showRoom}</span>
        </h1>
      </div>
      {showRoom === "Parts" ? <PartsDashboard /> : <ShowroomDashboard />}
    </div>
  );
};

export default Dashboard;
