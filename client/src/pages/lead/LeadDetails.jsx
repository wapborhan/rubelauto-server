import { useParams } from "react-router-dom";
import BackPage from "../../components/shared/BackPage";
import { Fragment } from "react";
import { useGetSingleLeadQuery } from "../../redux/feature/api/leadApi";

const LeadDetails = () => {
  const { id } = useParams();
  const { data: singleLead } = useGetSingleLeadQuery(id);

  return (
    <>
      <BackPage
        linkFirst="/contact/lead/view"
        textFirst="Lead"
        textSecond="Lead Details"
      />

      <fieldset className="mb-4 !p-10">
        <legend>Lead Info</legend>
        <div className="lead my-5 grid gap-5 grid-cols-3 w-full justify-between">
          <div className="custdetail">
            <h3 className="mb-5">Customer Details</h3>
            <ul className="w-full space-y-2">
              <li>
                <span className="font-bold">Status:</span>
                {singleLead?.data.status}
              </li>
              <li>
                <span className="font-bold">Name:</span>
                {singleLead?.data.name}
              </li>
              <li>
                <span className="font-bold">Father Name:</span>
                {singleLead?.data.coname}
              </li>
              <li>
                <span className="font-bold">Mobile:</span>
                {singleLead?.data.number}
              </li>
              <li>
                <span className="font-bold">Address:</span>
                {/* {singleLead?.data.address} */}
              </li>
              <li>
                <span className="font-bold">NID:</span>
                {singleLead?.data.nid}
              </li>
              <li>
                <span className="font-bold">Location:</span>
                {singleLead?.data.location}
              </li>
              <li>
                <span className="font-bold">Media:</span>
                {singleLead?.data.media}
              </li>
            </ul>
          </div>

          {singleLead?.data?.guarantor
            ? singleLead?.data?.guarantor.map((item, idx) => {
                console.log(item?.guarantor1);
                return (
                  <Fragment key={idx}>
                    <div className="guarantr1">
                      <h3 className="mb-5">Guarantor 1</h3>
                      <div className="w-full space-y-2">
                        <ul className="list space-y-4">
                          <li>
                            <span className="font-bold">Name:</span>
                            {item?.guarantor1?.name}
                          </li>
                          <li>
                            <span className="font-bold">Father Name:</span>
                            {item?.guarantor1?.coname}
                          </li>
                          <li>
                            <span className="font-bold">Mobile:</span>
                            {item?.guarantor1?.mobile}
                          </li>
                          <li>
                            <span className="font-bold">Address:</span>
                            {item?.guarantor1?.address}
                          </li>
                          <li>
                            <span className="font-bold">NID:</span>
                            {item?.guarantor1?.nid}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="guarantr1">
                      <h3 className="mb-5">Guarantor 2</h3>
                      <div className="w-full space-y-2">
                        <ul className="list space-y-4">
                          <li>
                            <span className="font-bold">Name:</span>
                            {item?.guarantor2?.name}
                          </li>
                          <li>
                            <span className="font-bold">Father Name:</span>
                            {item?.guarantor2?.coname}
                          </li>
                          <li>
                            <span className="font-bold">Mobile:</span>
                            {item?.guarantor2?.mobile}
                          </li>
                          <li>
                            <span className="font-bold">Address:</span>
                            {item?.guarantor2?.address}
                          </li>
                          <li>
                            <span className="font-bold">NID:</span>
                            {item?.guarantor2?.nid}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Fragment>
                );
              })
            : ""}
        </div>
      </fieldset>
    </>
  );
};

export default LeadDetails;
