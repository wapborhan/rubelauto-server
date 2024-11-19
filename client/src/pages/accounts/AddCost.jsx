import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useSingleStaff from "../../hooks/useSingleStaff";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import useCostList from "../../hooks/data/useCostList";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSetCostMutation } from "../../redux/feature/api/costApi";

const AddCost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const toast = useRef(null);
  const navigate = useNavigate();
  const [costCat, setCostCat] = useState();
  const [costCatList] = useCostList();
  const { showRoom, email, name } = useSelector((state) => state.userStore);
  const [setPost, { isSuccess, isError, error }] = useSetCostMutation();

  const onSubmit = (data) => {
    const inputData = {
      date: new Date(),
      staffEmail: email,
      categories: costCat?.code,
      showroom: showRoom,
      ...data,
    };
    setPost(inputData);
    isSuccess && reset();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Cost",
        detail: "Successfully Added.",
      });
      reset();
      setTimeout(() => {
        navigate("/account/cost/view");
      }, 3000);
    }
  }, [isSuccess, navigate, reset]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Cost",
        detail: error?.data?.message || "Error occurred while adding income.",
      });
    }
  }, [isError, error]);

  return (
    <div className="addCost">
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
          <h2 className="text-center text-3xl mb-10">Add Cost</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Add Cost</legend>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">Date</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={new Date()}
                    placeholder="Date"
                    className="input input-bordered w-full text-slate-600 disabled:text-slate-600"
                    readOnly
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Staff</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={name}
                    {...register("staff", { required: true })}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Categories</span>
                  </label>
                  <Dropdown
                    value={costCat}
                    onChange={(e) => setCostCat(e.value)}
                    options={costCatList}
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
                      Cost Description
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("description", { required: true })}
                    placeholder="Cost Description"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-3/12 flex-1">
                  <label className="label">
                    <span className="label-text font-bold">Amount</span>
                  </label>
                  <input
                    type="number"
                    {...register("amount", { required: true })}
                    placeholder="Amount"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="submit">
                <input
                  type="submit"
                  value="Add Cost"
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

export default AddCost;
