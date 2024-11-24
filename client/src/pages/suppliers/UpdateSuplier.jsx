import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import {
  useGetSingleSupplierQuery,
  useSetUpdateSupplierMutation,
} from "../../redux/feature/api/supplierApi";

const UpdateSuplier = () => {
  const { id } = useParams();
  const { data: singleSuplier } = useGetSingleSupplierQuery(id);
  const toast = useRef(null);
  const navigate = useNavigate();
  const [setPost, { isSuccess, isError, error }] =
    useSetUpdateSupplierMutation();

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bssLogoUrl = form.bssLogoUrl.value;
    const bssName = form.bssName.value;
    const empName = form.empName.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const address = form.address.value;

    const inputData = {
      bssLogoUrl,
      bssName,
      empName,
      email,
      mobile,
      address,
    };
    // console.log(inputData);
    setPost({ id, inputData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Supplier",
        detail: "Data Update Successfully",
      });
      setTimeout(() => {
        navigate("/contact/supplier/view");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: error,
      });
    }
  }, [isError, error]);

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
          <h2 className="text-center text-3xl mb-10">Update Supplier</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Update Lead</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Business Logo Url
                    </span>
                  </label>
                  <input
                    type="text"
                    name="bssLogoUrl"
                    defaultValue={singleSuplier?.data?.bssLogoUrl}
                    placeholder="Business Logo Url"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">Business Name</span>
                  </label>
                  <input
                    type="text"
                    name="bssName"
                    defaultValue={singleSuplier?.data?.bssName}
                    placeholder="Business Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Employee Name</span>
                  </label>
                  <input
                    type="text"
                    name="empName"
                    defaultValue={singleSuplier?.data?.empName}
                    placeholder="Employee Name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="third flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={singleSuplier?.data?.email}
                    placeholder="Email"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Mobile</span>
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    defaultValue={singleSuplier?.data?.mobile}
                    placeholder="Mobile Number"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-bold">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={singleSuplier?.data?.address}
                    placeholder="Address"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  value="Add Suplier"
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

export default UpdateSuplier;
