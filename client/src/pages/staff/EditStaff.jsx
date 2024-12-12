import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import useBloodGroupList from "../../hooks/data/useBloodGroupList";
import { useGetShowroomQuery } from "../../redux/feature/api/showroomApi";
import useDesignationList from "../../hooks/data/useDesignationList";
import {
  useGetUserByEmailQuery,
  useSetUpdateUserMutation,
} from "../../redux/feature/api/userApi";

const EditStaff = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { email } = useParams();
  const [bloodGroupList] = useBloodGroupList();
  const [designationList] = useDesignationList();
  const { data: showRooms } = useGetShowroomQuery();
  const [designation, setDesignation] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [showRoom, setShowRoom] = useState();
  const [setUser, { isSuccess, isError, error }] = useSetUpdateUserMutation();
  const { data: user } = useGetUserByEmailQuery(email);

  const onSubmit = ({ name, photoURL, mobile, address }) => {
    const userInfo = {
      name: name,
      photo: photoURL,
      mobile: mobile,
      showRoom: showRoom?.name,
      designation: designation?.code,
      address: address,
      bloodGroup: bloodGroup?.code,
      isUpdated: true,
    };
    setUser({ email, userInfo });
    console.log(userInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      // navigate("/staff");
    }
  }, [isSuccess, navigate, reset]);
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
    <div className="p-5 md:flex-1">
      <fieldset>
        <legend>Update Account</legend>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form space-y-5">
            <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
              <div className="form-control  w-full">
                <label className="text-sm font-semibold text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.data?.name}
                  {...register("name", { required: true })}
                  name="name"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control  w-full">
                <label className="text-sm font-semibold text-gray-500">
                  Photo URL
                </label>
                <input
                  type="text"
                  defaultValue={user?.data?.photo}
                  {...register("photoURL", { required: true })}
                  name="photoURL"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
            </div>
            <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
              <div className="flex flex-col  w-full">
                <label className="text-sm font-semibold text-gray-500">
                  Mobile Number
                </label>
                <input
                  type="number"
                  defaultValue={user?.data?.mobile}
                  {...register("mobile", { required: true })}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                {errors.mobile && (
                  <span className="text-red-600">Mobile is required</span>
                )}
              </div>
              <div className="flex flex-col  w-full">
                <label className="text-sm font-semibold text-gray-500">
                  Address
                </label>
                <input
                  type="text"
                  defaultValue={user?.data?.address}
                  {...register("address", { required: true })}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
                {errors.address && (
                  <span className="text-red-600">Address is required</span>
                )}
              </div>
            </div>
            <div className="flex gap-5 w-full mb-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Blood Group</span>
                </label>
                <Dropdown
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.value)}
                  options={bloodGroupList}
                  optionLabel="name"
                  placeholder="Blood Group"
                  className="w-full md:w-14rem border-2"
                  required={true}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Showroom</span>
                </label>
                <Dropdown
                  value={showRoom}
                  onChange={(e) => setShowRoom(e.value)}
                  options={showRooms}
                  optionLabel="name"
                  placeholder="Showroom"
                  className="w-full md:w-14rem border-2"
                  required={true}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold">Designation</span>
                </label>
                <Dropdown
                  value={designation}
                  onChange={(e) => setDesignation(e.value)}
                  options={designationList}
                  optionLabel="name"
                  placeholder="Designation"
                  className="w-full md:w-14rem border-2"
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              // disabled={disabled}
              value="Login"
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
            >
              Update Profile
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default EditStaff;
