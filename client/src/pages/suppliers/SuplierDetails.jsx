import { useParams } from "react-router-dom";
import { useGetSingleSupplierQuery } from "../../redux/feature/api/supplierApi";
import Loading from "../../components/shared/Loading";
import ViewSuplier from "./ViewSuplier";
import SupplierDetailPur from "./SupplierDetailPur";

const SuplierDetails = () => {
  const { id } = useParams();
  const {
    data: singleSuplier,
    isLoading,
    isError,
  } = useGetSingleSupplierQuery(id);

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (isError || !singleSuplier?.data) {
    return <p>Error loading supplier details. Please try again later.</p>;
  }
  const {
    bssName,
    bssLogoUrl,
    empName,
    email,
    mobile,
    address,
    openingBalance,
    addedDate,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = singleSuplier?.data;

  console.log(singleSuplier?.data);

  return (
    <>
      {/* <BackPage /> */}

      <fieldset className="mb-4 !p-10">
        <legend>Suplier Info</legend>
        <h3 className="mb-5">Suplier Details</h3>
        <div className="supplier my-5 grid grid-cols-4 gap-5">
          <div className="image">
            <img src={bssLogoUrl} alt={bssName} />
          </div>
          <div className="info">
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Business Name:</span>
              {bssName}
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Employee Name:</span>
              {empName}
            </div>
          </div>
          <div className="info">
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Mobile:</span>
              {mobile}
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Email:</span>
              {email}
            </div>
          </div>
          <div className="info">
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Address:</span>
              {address}
            </div>{" "}
            <div className="flex items-center justify-between gap-2 w-full">
              <span className="font-bold">Due:</span>
              12000
            </div>
          </div>
        </div>
      </fieldset>
      <SupplierDetailPur supplierId={id} />
    </>
  );
};

export default SuplierDetails;
