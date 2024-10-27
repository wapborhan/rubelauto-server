import { useParams } from "react-router-dom";
import useSingleLead from "../../hooks/useSingleLead";
import useSingleSuplier from "../../hooks/useSingleSuplier";

const SuplierDetails = () => {
  const { id } = useParams();
  const [singleSuplier] = useSingleSuplier(id);
  const {
    bssName,
    bssLogoUrl,
    empName,
    email,
    mobile,
    address,
    openingBalance,
    addedDate,
  } = singleSuplier;
  return (
    <>
      {/* <BackPage /> */}

      <fieldset className="mb-4 !p-10">
        <legend>Suplier Info</legend>
        <div className="lead my-5 grid gap-5 grid-cols-3 w-full justify-between">
          <div className="custdetail">
            <h3 className="mb-5">Suplier Details</h3>
            <ul className="w-full space-y-2">
              <li>
                <img src={bssLogoUrl} alt={bssName} />
              </li>
              <li>
                <span className="font-bold">Business Name:</span>{"  "}{bssName}
              </li>
              <li>
                <span className="font-bold">Employee Name:</span>
                {empName}
              </li>
              <li>
                <span className="font-bold">Mobile:</span>
                {mobile}
              </li>
              <li>
                <span className="font-bold">Email:</span>
                {email}
              </li>
              <li>
                <span className="font-bold">Address:</span>
                {address}
              </li>
            </ul>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default SuplierDetails;