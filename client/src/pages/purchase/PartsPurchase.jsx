import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";
import { useGetSupplierQuery } from "../../redux/feature/api/supplierApi";
import { useSetpartsPurchaseMutation } from "../../redux/feature/api/purchaseApi";
import DatePick from "../../components/shared/DatePick";

const PartsPurchase = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { data: allSuplier } = useGetSupplierQuery();
  const [setPost, { isSuccess, isError, error }] =
    useSetpartsPurchaseMutation();
  const [memoDate, setMemoDate] = useState(new Date());
  const [receiveDate, setReceiveDate] = useState(new Date());
  const [suplier, setSuplier] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const MemoNo = form.MemoNo.value;
    const amount = form.amount.value;
    const transport = form.transport.value;
    const notes = form.notes.value;

    const inputData = {
      supplierId: suplier?._id,
      supplier: suplier?._id,
      memoDate,
      MemoNo,
      amount,
      transport,
      notes,
      receiveDate,
    };
    // console.log(inputData);
    setPost(inputData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Product Added",
      });
      setTimeout(() => {
        navigate("/purchase/parts/view");
      }, 3000);
      // form.reset();
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: error || "Error adding Product.",
      });
    }
  }, [isError, error]);
  const partsSupplier = allSuplier?.data?.filter(
    (item) => item?.prodType === "Parts" || item?.prodType === "All"
  );

  console.log(partsSupplier);

  return (
    <div className="addProduct">
      <Toast
        ref={toast}
        pt={{
          message: ({ index }) => ({
            className: `bg-yellow-${((index > 5 && 5) || index || 1) * 100}`,
          }),
        }}
      />
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <div className="content space-y-5">
          <h2 className="text-center text-3xl mb-10">Purchase Parts</h2>
        </div>

        <fieldset>
          <legend>Purchase Parts</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Supplier</span>
                  </label>
                  <SearchAbleDropDown
                    state={suplier}
                    setState={setSuplier}
                    data={partsSupplier}
                    requir={true}
                    config={{
                      optLabel: "bssName",
                      placeHolder: "Select Suplier",
                    }}
                    // disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Memo Date</span>
                  </label>
                  <DatePick
                    dateValue={memoDate}
                    setDateValue={setMemoDate}
                    iconShow={false}
                    endDate={9999}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Memo No</span>
                  </label>
                  <input
                    type="text"
                    name="MemoNo"
                    placeholder="Enter Memo No"
                    className="input input-bordered w-full"
                  />
                </div>{" "}
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Received Date</span>
                  </label>
                  <DatePick
                    dateValue={receiveDate}
                    setDateValue={setReceiveDate}
                    iconShow={false}
                    endDate={9999}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Transport</span>
                  </label>
                  <input
                    type="text"
                    name="transport"
                    placeholder="Enter Transport Name"
                    className="input input-bordered w-full"
                  />
                </div>{" "}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Amount</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter AMount"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Notes</span>
                  </label>
                  <textarea
                    type="text"
                    name="notes"
                    placeholder="Notes ..."
                    className="input input-bordered w-full h-28"
                    // required
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  type="submit"
                  value="Add Product"
                  className="rounded-lg font-h2 mt-4 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
                />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default PartsPurchase;
