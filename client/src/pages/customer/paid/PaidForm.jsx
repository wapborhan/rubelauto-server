import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useSingleStaff from "../../../hooks/useSingleStaff";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

const PaidForm = ({ postData }) => {
  const { user } = useAuth();
  const [singlestaff] = useSingleStaff(user?.email);
  const [seizedCost, setSeizedCost] = useState();
  const [coments, setComents] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputData = {
      type: "paid",
      paidDate: new Date(),
      // seizedCost,
      staff: singlestaff?.name,
      coments,
    };

    postData(inputData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form  lg:mx-36 my-10 space-y-4">
        <fieldset className="mb-4 p-4">
          <legend>Paid Form</legend>
          <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Date</span>
              </label>
              <input
                type="text"
                name="seizedDate"
                placeholder={new Date()}
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Paid By</span>
              </label>
              <input
                type="text"
                name="seizedDate"
                placeholder={singlestaff?.name}
                className="input input-bordered w-full"
                disabled
              />
            </div>
            {
              /* <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Discounts</span>
              </label>
              <InputNumber
                inputId="locale-indian"
                value={seizedCost}
                onValueChange={(e) => setSeizedCost(e.value)}
                locale="en-IN"
                className="input pl-0 pr-0 input-bordered w-full"
              />
            </div> */
            }
          </div>
          <div className="third flex gap-5 my-4 lg:flex-nowrap flex-wrap justify-between">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Coments</span>
              </label>
              <div className="card flex justify-content-center">
                <InputTextarea
                  value={coments}
                  onChange={(e) => setComents(e.target.value)}
                  rows={5}
                  cols={30}
                  placeholder="Coments"
                  className="input input-bordered w-full h-20"
                />
              </div>
            </div>
          </div>
          <div className="submit my-4">
            <input
              type="submit"
              value="Add to Paid List"
              className="rounded-lg font-h2 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
            />
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default PaidForm;
