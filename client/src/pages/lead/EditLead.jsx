import { useEffect, useRef, useState } from "react";
import useDivision from "../../hooks/data/useDivision";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";
import useDistrict from "../../hooks/data/useDistrict";
import useUpazila from "../../hooks/data/useUpazila";
import usePostCodes from "../../hooks/data/usePostCodes";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  useGetSingleLeadQuery,
  useSetUpdateLeadMutation,
} from "../../redux/feature/api/leadApi";

const EditLead = () => {
  const { id } = useParams();
  const { data: singleLead } = useGetSingleLeadQuery(id);
  const [setPost, { isSuccess, isError, error }] = useSetUpdateLeadMutation();
  // Hooks
  const toast = useRef(null);
  const navigate = useNavigate();
  const [divisions] = useDivision();
  const [districts] = useDistrict();
  const [upazilas] = useUpazila();
  const [postcodes] = usePostCodes();
  // State
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState();
  const [union, setUnion] = useState();
  // const [status, setStatus] = useState(singleLead?.status);

  // const stats = ["Cold", "Warm", "Hot"];

  // Filter Wise Select
  const filteredDistricts = divisions
    ? districts.filter((district) => district?.division_id === division?.id)
    : [];

  const filteredUpazila = districts
    ? upazilas.filter((upazila) => upazila?.district_id === district?.id)
    : [];

  const filteredUnions = upazilas
    ? postcodes.filter((union) => union?.upazilla_id === district?.id)
    : [];
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const coname = form.coname.value;
    const nid = form.nid.value;
    const village = form.village.value;
    const number = form.number.value;
    const location = form.location.value;
    const media = form.media.value;

    const inputData = {
      // status: status,
      name,
      coname,
      nid,
      address: {
        village: village,
        union:
          union?.name === undefined
            ? singleLead?.data?.address?.union
            : union?.name,
        upazila:
          upazila?.name === undefined
            ? singleLead?.data?.address?.upazila
            : upazila?.name,
        district:
          district?.name === undefined
            ? singleLead?.data?.address?.district
            : district?.name,
        division:
          division?.name === undefined
            ? singleLead?.data?.address?.division
            : division?.name,
      },
      number,
      location,
      media,
      guarantor: [],
    };
    setPost({ id, inputData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Lead Updated",
      });
      setTimeout(() => {
        navigate("/contact/lead/view");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "info",
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
          <h2 className="text-center text-3xl mb-10">Update Customer</h2>
        </div>
        <fieldset className="mb-4">
          <legend>Update Lead</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                {/* <div className="form-control  w-full">
                    <label className="label">
                      <span className="label-text font-bold">Lead Status</span>
                    </label>
                    <Dropdown
                      value={status}
                      onChange={(e) => setStatus(e.value)}
                      options={stats}
                      // optionLabel="name"
                      placeholder="Status"
                      className="w-full md:w-14rem border-2"
                      required
                    />
                  </div> */}

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Customer Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Customer Name"
                    defaultValue={singleLead?.data?.name}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Father/Husband Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="coname"
                    placeholder="Enter Father/Husband Name"
                    defaultValue={singleLead?.data?.coname}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">NID</span>
                  </label>
                  <input
                    type="number"
                    name="nid"
                    placeholder="Enter Customer NID Number"
                    defaultValue={singleLead?.data?.nid}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Division</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      division?.name === undefined
                        ? singleLead?.data?.address?.division
                        : division?.name
                    }
                    disabled
                    className="rounded-md px-3 py-1 text-white !bg-slate-200"
                  />
                  <SearchAbleDropDown
                    state={division}
                    setState={setDivision}
                    data={divisions}
                    requir={false}
                    config={{
                      optLabel: "name",
                      placeHolder: "Division",
                    }}
                    // disable={!model}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">District</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      district?.name === undefined
                        ? singleLead?.data?.address?.district
                        : district?.name
                    }
                    disabled
                    className="rounded-md px-3 py-1 text-white !bg-slate-200"
                  />
                  <SearchAbleDropDown
                    state={district}
                    setState={setDistrict}
                    data={filteredDistricts}
                    requir={false}
                    config={{
                      optLabel: "name",
                      placeHolder: "District",
                    }}
                    disable={!division}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Upozilla / Thena
                    </span>
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      upazila?.name === undefined
                        ? singleLead?.data?.address?.upazila
                        : upazila?.name
                    }
                    disabled
                    className="rounded-md px-3 py-1 text-white !bg-slate-200"
                  />
                  <SearchAbleDropDown
                    state={upazila}
                    setState={setUpazila}
                    data={filteredUpazila}
                    requir={false}
                    config={{
                      optLabel: "name",
                      placeHolder: "Upozilla",
                    }}
                    disable={!district}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Unions</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={
                      union?.name === undefined
                        ? singleLead?.data?.address?.union
                        : union?.name
                    }
                    disabled
                    className="rounded-md px-3 py-1 text-white !bg-slate-200"
                  />
                  <SearchAbleDropDown
                    state={union}
                    setState={setUnion}
                    data={filteredUnions}
                    requir={false}
                    config={{
                      optLabel: "postOffice",
                      placeHolder: "Unions",
                    }}
                    disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Village</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    defaultValue={singleLead?.data?.address.village}
                    placeholder="Enter Customer Village"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="third flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="w-full flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold">Contact No.</span>
                    </label>
                    <input
                      type="text"
                      name="number"
                      placeholder="Enter Mobile Number"
                      defaultValue={singleLead?.data?.number}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold">
                        Media & Number
                      </span>
                    </label>
                    <input
                      type="text"
                      name="media"
                      placeholder="Enter Media name - Mobile No."
                      defaultValue={singleLead?.data?.media}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Location Mark</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Customer Location Mark"
                    defaultValue={singleLead?.data?.location}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  value="Update Customer"
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

export default EditLead;
