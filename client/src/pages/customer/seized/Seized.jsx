import { useEffect, useRef } from "react";
import SeizedForm from "./SeizedForm";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  useGetSingleCustomerQuery,
  useSetSeizedCustomerMutation,
} from "../../../redux/feature/api/customerApi";

const Seized = () => {
  const { cardNo } = useParams();
  const { data: singleCustomer } = useGetSingleCustomerQuery(cardNo);
  const [setPost, { isSuccess, isError }] = useSetSeizedCustomerMutation();
  const navigate = useNavigate();
  const toast = useRef(null);

  const postData = (data) => {
    setPost({ cardNo, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Your Card No. ${cardNo}  has been added to Seized List.`,
        life: 3000,
      });
      setTimeout(() => {
        navigate(`/customer/seized`);
      }, 1000);
    }
  }, [isSuccess, navigate, cardNo]);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Your Card No. ${cardNo}  has not been added to Seized List.`,
        life: 3000,
      });
    }
  }, [isError, cardNo]);

  return (
    <div className="card justify-center w-full">
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
      <SeizedForm postData={(e) => postData(e)} />
    </div>
  );
};

export default Seized;
