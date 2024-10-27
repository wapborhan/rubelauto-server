import { useNavigate, useParams } from "react-router-dom";
import SaleForm from "./SaleForm";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const AddSale = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const path = useParams();
  const axiosPublic = useAxiosPublic();

  const cardStas = path.status === "credit" ? "running" : path.status;

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: `Your ${path.status.toUpperCase()} sale has been added.`,
      life: 3000,
    });
  };
  const showError = (data) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: `${data}`,
      life: 3000,
    });
  };
  const postData = (data) => {
    axiosPublic
      .post(`/customer?leadId=${data?.leadsId}&status=${path.status}`, data)
      .then((res) => {
        showSuccess();
        // setTimeout(() => {
        //   navigate(`/customer/${cardStas}`);
        // }, 3000);
        console.log(res);
      })
      .catch((err) => {
        showError(err?.response?.data);
        console.log(err);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <SaleForm status={path.status} postData={(e) => postData(e)} />
    </>
  );
};

export default AddSale;
