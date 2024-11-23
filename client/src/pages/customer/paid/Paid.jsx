import { useNavigate, useParams } from "react-router-dom";
import PaidForm from "./PaidForm";
import { useRef } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Toast } from "primereact/toast";
import { useGetSingleCustomerQuery } from "../../../redux/feature/api/customerApi";

const Paid = () => {
  const { cardNo } = useParams();
  const { data: singleCustomer } = useGetSingleCustomerQuery(cardNo);
  const navigate = useNavigate();
  const toast = useRef(null);
  const axiosPublic = useAxiosPublic();

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `Your Card No. ${cardNo}  has been added to Paid List.`,
      life: 1000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `Your Card No. ${cardNo}  has not been added to Paid List.`,
      life: 1000,
    });
  };
  const postData = (data) => {
    console.log(data);
    axiosPublic
      .patch(`/customer/paid/${cardNo}`, data)
      .then(function (response) {
        showSuccess();
        setTimeout(() => {
          navigate(`/documents`);
        }, 3000);
        console.log(response);
      })
      .catch(function (error) {
        showError();
        console.error(error);
      });
  };
  return (
    <div className="card justify-content-center">
      <Toast ref={toast} />
      <fieldset className="mb-4">
        <legend>Customer Info</legend>
        <div className="card mt-4 grid lg:grid-cols-4 mx-auto w-full text-center">
          <h1>Card No: {singleCustomer?.data?.cardno}</h1>
          <h1>Name: {singleCustomer?.data?.customerInfo?.name}</h1>
          <h1>Product: {singleCustomer?.data?.productInfo?.type}</h1>
          <h1>Chassiss: {singleCustomer?.data?.productInfo?.chassis}</h1>
        </div>
      </fieldset>
      <PaidForm postData={(e) => postData(e)} />
    </div>
  );
};

export default Paid;
