import { useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import useSingleLead from "../../hooks/useSingleLead";

const EditGuarantor = () => {
  // Hooks
  const toast = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [singleLead] = useSingleLead(id);

  const guarantor1 = singleLead?.guarantor[0]?.guarantor1;
  const guarantor2 = singleLead?.guarantor[0]?.guarantor2;

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const gd1name = form.gd1name.value;
    const gd1coname = form.gd1coname.value;
    const gd1mobile = form.gd1mobile.value;
    const gd1nid = form.gd1nid.value;
    const gd1adress = form.gd1adress.value;
    //
    const gd2name = form.gd2name.value;
    const gd2coname = form.gd2coname.value;
    const gd2mobile = form.gd2mobile.value;
    const gd2nid = form.gd2nid.value;
    const gd2address = form.gd2address.value;

    const inputData = {
      guarantor1: {
        name: gd1name,
        coname: gd1coname,
        mobile: gd1mobile,
        nid: gd1nid,
        address: gd1adress,
      },
      guarantor2: {
        name: gd2name,
        coname: gd2coname,
        mobile: gd2mobile,
        nid: gd2nid,
        address: gd2address,
      },
    };

    toast.current.show({
      severity: "success",
      summary: "Lead",
      detail: "Update System Include Soon",
    });

    // axiosPublic.put(`/lead/addguarantor/${id}`, inputData).then((res) => {
    //   if (res.status === 200) {
    //     // alert("Customer Added");
    //     toast.current.show({
    //       severity: "info",
    //       summary: "Lead",
    //       detail: "Guarantor Add On this Lead.",
    //     });
    //     setTimeout(() => {
    //       navigate(`/lead/view/${id}`);
    //     }, 3000);

    //     form.reset();
    //   }
    // });
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
          <h2 className="text-center text-3xl mb-10"> Update Guarantor</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form space-y-7">
            <fieldset className="mb-4 pb-4">
              <legend>Guarantor-1</legend>
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-1 Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd1name"
                    placeholder="Enter Customer Name"
                    className="input input-bordered w-full"
                    defaultValue={guarantor1?.name}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-1 Father/Husband Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd1coname"
                    placeholder="Enter Father/Husband Name"
                    className="input input-bordered w-full"
                    defaultValue={guarantor1?.coname}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-1 Mobile
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd1mobile"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor1?.mobile}
                  />
                </div>
              </div>
              <div className=" frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-1 Nid
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd1nid"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor1?.nid}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-1 Address
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd1adress"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor1?.address}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="mb-4 ">
              <legend>Guarantor-2</legend>
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-2 Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd2name"
                    placeholder="Enter Customer Name"
                    className="input input-bordered w-full"
                    defaultValue={guarantor2?.name}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-2 Father/Husband Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd2coname"
                    placeholder="Enter Father/Husband Name"
                    className="input input-bordered w-full"
                    defaultValue={guarantor2?.coname}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-2 Mobile
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd2mobile"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor2?.mobile}
                  />
                </div>
              </div>
              <div className=" frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-2 Nid
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd2nid"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor2?.nid}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Guarantor-2 Address
                    </span>
                  </label>
                  <input
                    type="text"
                    name="gd2address"
                    placeholder="Enter Customer NID Number"
                    className="input input-bordered w-full"
                    defaultValue={guarantor2?.address}
                  />
                </div>
              </div>
            </fieldset>

            <div className="submit">
              <input
                type="submit"
                value="Update Guarantor"
                className="rounded-lg font-h2 mt-4 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuarantor;
