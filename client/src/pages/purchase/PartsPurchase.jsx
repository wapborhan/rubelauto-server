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
        severity: "error",
        summary: "Error",
        detail: error?.data?.message || "Error adding Product.",
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
          <h2 className="text-center text-3xl mb-10">পার্টস ক্রয়</h2>
        </div>

        <fieldset>
          <legend>পার্টস ক্রয়</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">সাপ্লালায়ার</span>
                  </label>
                  <SearchAbleDropDown
                    state={suplier}
                    setState={setSuplier}
                    data={partsSupplier}
                    requir={true}
                    config={{
                      optLabel: "bssName",
                      placeHolder: "সিলেক্ট সাপ্লালায়ার",
                    }}
                    // disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">মেমো তারিখ</span>
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
                    <span className="label-text font-bold">মেমো নম্বর</span>
                  </label>
                  <input
                    type="text"
                    name="MemoNo"
                    placeholder="মেমো নম্বর"
                    className="input input-bordered w-full"
                  />
                </div>{" "}
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">গ্রহন তারিখ</span>
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
                    <span className="label-text font-bold">পরিবহন</span>
                  </label>
                  <input
                    type="text"
                    name="transport"
                    placeholder="পরিবহন নাম"
                    className="input input-bordered w-full"
                  />
                </div>{" "}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">পরিমাণ</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="পরিমাণ (টাকা)"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">মন্তব্য</span>
                  </label>
                  <textarea
                    type="text"
                    name="notes"
                    placeholder="মন্তব্য ..."
                    className="input input-bordered w-full h-28"
                    // required
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  type="submit"
                  value="ক্রয় করুন"
                  className="rounded-lg font-h2 mt-4 border-2-[#331A15] bg-primary w-full p-3 font-bold text-[18px] text-white cursor-pointer"
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
