import { useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const Settings = () => {
  const toast = useRef(null);
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // const name = form.name.value;

    const inputData = {
      showroom: "",
    };
    console.log(inputData);
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
          <h2 className="text-center text-3xl mb-10">Update Profile</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Update Profile</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">Showroom Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Showroom Name"
                    className="input input-bordered w-full"
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

export default Settings;
