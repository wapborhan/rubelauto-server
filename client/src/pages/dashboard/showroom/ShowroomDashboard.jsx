import AllSRCards from "./AllSRCards";
import Card from "./Card";

const ShowroomDashboard = () => {
  return (
    <>
      {" "}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 w-full mx-auto ">
        <AllSRCards />
      </div>
      {/* <div className="mt-8">
        <Card />
      </div> */}
    </>
  );
};

export default ShowroomDashboard;
