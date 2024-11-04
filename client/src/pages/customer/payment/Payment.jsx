import { useNavigate, useParams } from "react-router-dom";
import useSingleCustomer from "../../../hooks/useSingleCustomer";
import usePaymentType from "../../../hooks/data/usePaymentType";
import { useRef, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import useSingleStaff from "../../../hooks/useSingleStaff";
import useAccount from "../../../hooks/useAccount";

const Payment = () => {
  const toast = useRef(null);
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState(null);
  const [coments, setComents] = useState(undefined);
  const axiosPublic = useAxiosPublic();
  const today = new Date();
  const navigate = useNavigate();
  const { cardNo } = useParams();
  const [singleCustomer] = useSingleCustomer(cardNo);
  const [singlestaff] = useSingleStaff(user?.email);
  const [allAccounts, refetch, isLoading, isPending] = useAccount()

  const paymentTypeList = [
    {
      name: "Cash",
      code: "cash",
      remainingBalance:0
    },
    ...allAccounts
  ]

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Installment Addeded Complited",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Installment Not Posted",
      life: 3000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = today;
    const amount = form.amount.value;
    const voucher = form.voucher.value;
    const receiver = singlestaff?.name;
    const showroom = singleCustomer?.showRoom;
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

    // console.log(installmentData);

    axiosPublic
      .post(`/installment/`, installmentData)
      .then((data) => {
        if (data.status === 200) {
          showSuccess();
          setTimeout(() => {
            navigate(`/customer/view/${cardNo}`);
          }, 3000);
        } else {
          showError();
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
            <h1>Card No: {singleCustomer?.cardno}</h1>
            <h1>Name: {singleCustomer?.customerInfo?.name}</h1>
            <h1>Product: {singleCustomer?.productInfo?.type}</h1>
            <h1>Chassiss: {singleCustomer?.productInfo?.chassis}</h1>
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
                  <input
                    type="text"
                    name="date"
                    placeholder={today}
                    className="input input-bordered w-full"
                    disabled
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
                    placeholder={singlestaff?.name}
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
