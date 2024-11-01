import { Toast } from "primereact/toast";
import { useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const AddShowroom = () => {
  const toast = useRef(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const code = form.code.value;
    const address = form.address.value;

    const inputData = {
      name: name,
      code: code,
      address: address,
      cashDue: 0,
      percentDue: 0,
      remainingBalance: 0,
      addedDate: new Date(),
    };
    console.log(inputData);

    axiosPublic
      .post(`/showroom`, inputData)
      .then((res) => {
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Showroom",
          detail: inputData?.name + " Added.",
        });

        setTimeout(() => {
          navigate("/showroom/view");
        }, 3000);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Showroom",
          detail: err?.message,
        });
      });
  };
  return (
    <div className="addlead">
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
          <h2 className="text-center text-3xl mb-10">Add Showroom</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Add Showroom</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Showroom Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Showroom Name"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">Showroom Code</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    placeholder="Showroom Code"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  value="Add Showroom"
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

export default AddShowroom;
