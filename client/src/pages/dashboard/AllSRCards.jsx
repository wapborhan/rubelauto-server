import useLeads from "../../hooks/useLeads";
import useCustomers from "../../hooks/useCustomers";
import { Link } from "react-router-dom";
import useStock from "../../hooks/useStock";

const AllSRCards = () => {
  const [leads] = useLeads();
  const [customers] = useCustomers("running");
  const [stock] = useStock();
  return (
    <>
      <div className="flex items-center p-4 bg-white rounded">
        <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{leads.length}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total Leads</span>
            <span className="text-green-500 text-md font-semibold ml-2">
              <Link to="/lead/view">{"  >"}</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-white rounded">
        <div className="flex flex-shrink-0 items-center justify-center bg-red-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{customers.length}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Running Customer</span>
            <span className="text-red-500 text-md font-semibold ml-2">
              <Link to="/customer/running">{"  >"}</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-white rounded">
        <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
          <svg
            className="w-6 h-6 fill-current text-green-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-grow flex flex-col ml-4">
          <span className="text-xl font-bold">{stock.length}</span>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Total Stock</span>
            <span className="text-green-500 text-md font-semibold ml-2">
              <Link to="/purchase/view">
                {/* <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> */}
                {"  >"}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllSRCards;
