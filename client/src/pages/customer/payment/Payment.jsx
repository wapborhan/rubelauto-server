import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DatePick from "../../../components/shared/DatePick";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import { useGetAccountQuery } from "../../../redux/feature/api/accountApi";
import Loading from "../../../components/shared/Loading";
import {
  useGetSingleCustomerQuery,
  useSetInstallmentMutation,
} from "../../../redux/feature/api/customerApi";

const Payment = () => {
  const toast = useRef(null);
  const [selectedType, setSelectedType] = useState(null);
  const [date, setDate] = useState(new Date());
  const [coments, setComents] = useState(undefined);
  const navigate = useNavigate();
  const { cardNo } = useParams();
  const { data: singleCustomer } = useGetSingleCustomerQuery(cardNo);
  const { name } = useSelector((state) => state.userStore);
  const { data: allAccounts, isLoading, error } = useGetAccountQuery();
  const [setPost, { data: insData, isSuccess, isError, error: insError }] =
    useSetInstallmentMutation();

  console.log(insData);

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Installment Addeded Complited",
        life: 3000,
      });
      setTimeout(() => {
        navigate(`/customer/view/${cardNo}`);
      }, 3000);
    }
  }, [isSuccess, navigate, cardNo]);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: insError?.data?.message || "Something went wrong",
        life: 3000,
      });
    }
  }, [isError, insError]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error fetching accounts: {error.message}</p>;

  const paymentTypeList = [
    {
      name: "Cash",
      code: "cash",
      remainingBalance: 0,
    },
    ...allAccounts,
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // const date = today;
    const amount = form.amount.value;
    const voucher = form.voucher.value;
    const receiver = name;
    const showroom = singleCustomer?.data?.showRoom;
    const type = selectedType?.code;

    const installmentData = {
      cardNo,
      showroom,
      date,
      amount,
      voucher,
      receiver,
      type,
      coments,
    };

    setPost(installmentData);
  };

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="sect py-4 w-full mx-auto">
        <div className="content mb-4">
          <h2 className="text-center text-3xl"> Add Installment</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Customer Info</legend>
          <div className="card mt-4 grid lg:grid-cols-4 mx-auto w-full text-center">
            <h1>Card No: {singleCustomer?.data?.cardno}</h1>
            <h1>Name: {singleCustomer?.data?.customerInfo?.name}</h1>
            <h1>Product: {singleCustomer?.data?.productInfo?.type}</h1>
            <h1>Chassiss: {singleCustomer?.data?.productInfo?.chassis}</h1>
          </div>
        </fieldset>

        <Toast ref={toast} />
        <form onSubmit={handleSubmit}>
          <div className="form  lg:mx-36 my-10 space-y-4">
            <fieldset className="mb-4 p-4">
              <legend>Installment Form</legend>
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Date</span>
                  </label>
                  {/* <input
                    type="text"
                    name="date"
                    placeholder={today}
                    className="input input-bordered w-full"
                    disabled
                  /> */}
                  <DatePick
                    dateValue={date}
                    setDateValue={setDate}
                    iconShow={false}
                    endDate={9999}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Receiver</span>
                  </label>
                  {/* <Dropdown
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.value)}
                  options={user}
                  optionLabel="name"
                  placeholder="Payment Type"
                  className="w-full md:w-14rem"
                /> */}
                  <input
                    type="text"
                    name="date"
                    placeholder={name}
                    className="input input-bordered w-full"
                    disabled
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Amount</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Installment Amount"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Voucher</span>
                  </label>
                  <input
                    type="text"
                    name="voucher"
                    placeholder="Voucher Number"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Type</span>
                  </label>
                  <Dropdown
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.value)}
                    options={paymentTypeList}
                    optionLabel="name"
                    placeholder="Payment Type"
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>
              <div className="third flex gap-5 lg:flex-nowrap flex-wrap justify-between">
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

              <div className="submit mb-4">
                <input
                  type="submit"
                  value="Add Installment"
                  className="rounded-lg font-h2 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
                />
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
