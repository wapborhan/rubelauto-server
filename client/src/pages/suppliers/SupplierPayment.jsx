import { Toast } from "primereact/toast";
import DatePick from "../../components/shared/DatePick";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import Loading from "../../components/shared/Loading";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleSupplierQuery,
  useSetSupplierPaymentMutation,
} from "../../redux/feature/api/supplierApi";

const SupplierPayment = () => {
  const toast = useRef(null);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // API hooks
  const {
    data: supplierData,
    isLoading,
    error,
  } = useGetSingleSupplierQuery(id);
  const [setPayment, { isSuccess, isError, error: payError, data }] =
    useSetSupplierPaymentMutation(id);

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Payment Added Successfully",
        life: 3000,
      });
      console.log(data);

      // setTimeout(() => {
      //   navigate(`/contact/supplier/view/${id}`);
      // }, 2000);
    }
  }, [isSuccess, navigate, id, data]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: payError?.data?.message || "Something went wrong",
        life: 3000,
      });
    }
  }, [isError, payError]);

  if (isLoading) return <Loading />;

  // dropdown options
  const paymentTypeList = [
    { name: "Cash", code: "cash" },
    { name: "Bank Transfer", code: "bank" },
    { name: "Mobile Banking", code: "mobile" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = Number(form.amount.value);

    const paymentData = {
      supplierId: id,
      paymentDate: date,
      payeAccountNumber: form.payeAccountNumber.value || "",
      amount,
      notes,
      payMethod: selectedMethod?.code,
    };

    setPayment({ id, data: paymentData });
  };

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="sect py-4 w-full mx-auto">
        <div className="content mb-4">
          <h2 className="text-center text-3xl">Supplier Payment</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Supplier Info</legend>
          <div className="card mt-4 grid lg:grid-cols-3 mx-auto w-full text-center">
            <h1>Name: {supplierData?.data?.bssName}</h1>
            <h1>EmployeName: {supplierData?.data?.empName}</h1>
            <h1>Mobile: {supplierData?.data?.mobile}</h1>
          </div>
        </fieldset>

        <Toast ref={toast} />
        <form onSubmit={handleSubmit}>
          <div className="form lg:mx-36 my-10 space-y-4">
            <fieldset className="mb-4 p-4">
              <legend>Payment Form</legend>

              {/* Date */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Payment Date</span>
                </label>
                <DatePick
                  dateValue={date}
                  setDateValue={setDate}
                  iconShow={false}
                  endDate={9999}
                  required
                />
              </div>

              {/* Account */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Payee Account</span>
                </label>

                <input
                  type="text"
                  name="payeAccountNumber"
                  placeholder="Payee Account Number"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Amount */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Payment Amount"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Payment Method</span>
                </label>
                <Dropdown
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.value)}
                  options={paymentTypeList}
                  optionLabel="name"
                  placeholder="Select Method"
                  className="w-full md:w-14rem"
                />
              </div>

              {/* Notes */}
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text font-bold">Notes</span>
                </label>
                <InputTextarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  cols={30}
                  placeholder="Optional notes"
                  className="input input-bordered w-full h-20"
                />
              </div>

              {/* Submit */}
              <div className="submit mb-4">
                <input
                  type="submit"
                  value="Add Payment"
                  className="rounded-lg border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
                />
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierPayment;
