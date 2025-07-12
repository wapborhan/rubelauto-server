import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";

import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useSetLeadMutation } from "../../redux/feature/api/leadApi";
import SubmitButton from "../../components/SubmitButton";

const AddLead = () => {
  // Hooks
  const toast = useRef(null);
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [postcodes, setPostCodes] = useState([]);
  // States
  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState();
  const [union, setUnion] = useState();
  const [status, setStatus] = useState(null);

  const stats = ["Cold", "Warm", "Hot"];
  const [setPost, { isSuccess, isError, error }] = useSetLeadMutation();

  useEffect(() => {
    import("../../hooks/data/useDistrict").then((module) => {
      setDistricts(module.default);
    });

    import("../../hooks/data/useUpazila").then((module) => {
      setUpazilas(module.default);
    });

    import("../../hooks/data/usePostCodes").then((module) => {
      setPostCodes(module.default);
    });
  }, []);

  // Filter Wise Select
  const filteredUpazila = districts
    ? upazilas.filter((upazila) => upazila?.district_id === district?.id)
    : [];

  const filteredUnions = upazilas
    ? postcodes.filter((union) => union?.district_id === district?.id)
    : [];
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const coname = form.coname.value;
    const nid = form.nid.value;
    const address = form.address.value;
    const number = form.number.value;
    const location = form.location.value;
    const media = form.media.value;

    const inputData = {
      status: status,
      name,
      coname,
      nid,
      address,
      number,
      location,
      media,
      guarantor: [],
    };

    console.log(inputData);

    setPost(inputData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Lead",
        detail: "Added Successfully.",
      });
      setTimeout(() => {
        navigate("/contact/lead/view");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "success",
        summary: "Lead",
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
          <h2 className="text-center text-3xl mb-10">গ্রাহকের তথ্য যোগ করুন</h2>
        </div>
        <fieldset className="mb-4">
          <legend>লিড</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="label-text font-bold">লিড স্ট্যাটাস</span>
                  </label>
                  <Dropdown
                    value={status}
                    onChange={(e) => setStatus(e.value)}
                    options={stats}
                    // optionLabel="name"
                    placeholder="স্ট্যাটাস সিলেক্ট করুন"
                    className="w-full md:w-14rem border-2"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">গ্রাহকের নাম</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="গ্রাহকের নাম লিখুন"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      পিতার/স্বামীর নাম
                    </span>
                  </label>
                  <input
                    type="text"
                    name="coname"
                    placeholder="পিতার/স্বামীর নাম লিখুন"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">এনআইডি</span>
                  </label>
                  <input
                    type="number"
                    name="nid"
                    placeholder="এনআইডি নম্বর লিখুন"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">ঠিকানা</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="ঠিকানা লিখুন"
                    className="input input-bordered w-full"
                  />
                </div>
                {/* <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">জেলা</span>
                  </label>
                  <SearchAbleDropDown
                    state={district}
                    setState={setDistrict}
                    data={districts}
                    requir={true}
                    config={{
                      optLabel: "name",
                      placeHolder: "জেলা",
                    }}
                    // disable={!division}
                  />
                </div>
                 <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">উপজিলা / থানা</span>
                  </label>
                  <SearchAbleDropDown
                    state={upazila}
                    setState={setUpazila}
                    data={filteredUpazila}
                    requir={true}
                    config={{
                      optLabel: "name",
                      placeHolder: "উপজিলা",
                    }}
                    disable={!district}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">পোস্ট অফিস</span>
                  </label>
                  <SearchAbleDropDown
                    state={union}
                    setState={setUnion}
                    data={filteredUnions}
                    requir={true}
                    config={{
                      optLabel: "postOffice",
                      placeHolder: "পোস্ট অফিস",
                    }}
                    disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">গ্রাম</span>
                  </label>
                  <input
                    type="text"
                    name="village"
                    placeholder="গ্রামের নাম লিখুন"
                    className="input input-bordered w-full"
                    required
                  />
                </div> */}
              </div>
              <div className="third flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="w-full flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold">
                        যোগাযোগ নম্বর
                      </span>
                    </label>
                    <input
                      type="text"
                      name="number"
                      placeholder="মোবাইল নম্বর লিখুন"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold">
                        মিডিয়া ও নম্বর
                      </span>
                    </label>
                    <input
                      type="text"
                      name="media"
                      placeholder="মিডিয়া নাম - মোবাইল নম্বর"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">লোকেশন মার্ক</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="গ্রাহকের লোকেশন মার্ক লিখুন"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="submit">
                <SubmitButton name="গ্রাহক যোগ করুন" />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddLead;
