import { useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import useAuth from "../../hooks/useAuth";
import useSingleStaff from "../../hooks/useSingleStaff";
import { Dropdown } from "primereact/dropdown";
import useIncomeCatList from "../../hooks/data/useIncomeCatList";

const AddIncome = () => {
  const toast = useRef(null);
  const { user } = useAuth();
  const [singlestaff] = useSingleStaff(user?.email);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [incomeCat, setIncomeCat] = useState();
  const [incomeCatList] = useIncomeCatList();

  console.log(singlestaff);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const amount = form.amount.value;
    const description = form.description.value;

    const inputData = {
      date: new Date(),
      staffEmail: singlestaff?.email,
      categories: incomeCat?.code,
      showroom: singlestaff?.showRoom,
      description,
      amount,
    };
    // console.log(inputData);

    axiosPublic
      .post(`/income`, inputData)
      .then((res) => {
        console.log(res);
        if (res.data.status === 2000) {
          toast.current.show({
            severity: "success",
            summary: "Income",
            detail: "Succesfully Added.",
          });
          setTimeout(() => {
            navigate("/account/income/view");
          }, 3000);
          form.reset();
        }
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Income",
          detail: err?.message,
        });
      });
  };
  return (
    <div className="addIncome">
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
          <h2 className="text-center text-3xl mb-10">Add Income</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Add Income</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">Date</span>
                  </label>
                  <input
                    type="text"
                    name="date"
                    defaultValue={new Date()}
                    placeholder="Showroom Name"
                    className="input input-bordered w-full text-slate-600 disabled:text-slate-600"
                    disabled
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Staff</span>
                  </label>
                  <input
                    type="text"
                    name="staff"
                    placeholder="Staff"
                    defaultValue={singlestaff?.name}
                    className="input input-bordered w-full"
                    required
                    disabled
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Categories</span>
                  </label>
                  <Dropdown
                    value={incomeCat}
                    onChange={(e) => setIncomeCat(e.value)}
                    options={incomeCatList}
                    optionLabel="name"
                    placeholder="Categories"
                    className="w-full md:w-14rem border-2"
                    required={true}
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-9/12 flex-0">
                  <label className="label">
                    <span className="label-text font-bold">
                      Income Description
                    </span>
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Income Description"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-3/12 flex-1">
                  <label className="label">
                    <span className="label-text font-bold">Amount</span>
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  type="submit"
                  value="Add Income"
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

export default AddIncome;
