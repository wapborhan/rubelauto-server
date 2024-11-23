import { useParams } from "react-router-dom";
import CusInfo from "./CusInfo";
import CusAccountInfo from "./CusAccountInfo";
import Loading from "../../../components/shared/Loading";
import { useGetSingleCustomerQuery } from "../../../redux/feature/api/customerApi";

const CustomerDetails = () => {
  const { cardNo } = useParams();
  const { data: singleCustomer } = useGetSingleCustomerQuery(cardNo);

  return (
    <div>
      <div className="customer">
        <div className="company text-center space-y-5">
          <h2 className="text-4xl font-bold">Customer Ledger</h2>
          <h2 className="text-3xl">Rubel Auto</h2>
        </div>
        <div className="customer-info">
          {singleCustomer ? (
            <>
              <CusInfo singleCustomer={singleCustomer?.data} />
              <CusAccountInfo singleCustomer={singleCustomer?.data} />
            </>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
