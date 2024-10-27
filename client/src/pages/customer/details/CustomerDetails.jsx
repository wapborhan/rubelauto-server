import { useParams } from "react-router-dom";
import CusInfo from "./CusInfo";
import CusAccountInfo from "./CusAccountInfo";
import useSingleCustomer from "../../../hooks/useSingleCustomer";
import Loading from "../../../components/shared/Loading";

const CustomerDetails = () => {
  const { cardNo } = useParams();
  const [singleCustomer] = useSingleCustomer(cardNo);

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
              <CusInfo singleCustomer={singleCustomer} />
              <CusAccountInfo singleCustomer={singleCustomer} />
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
