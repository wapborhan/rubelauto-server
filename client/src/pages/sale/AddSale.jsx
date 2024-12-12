import { useNavigate, useParams } from "react-router-dom";
import SaleForm from "./SaleForm";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useSetCustomerMutation } from "../../redux/feature/api/customerApi";

const AddSale = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const path = useParams();
  const [setPost, { isSuccess, isError, error }] = useSetCustomerMutation();

  // const cardStas = path.status === "credit" ? "running" : path.status;

  const postData = (data) => {
    setPost({ leadsId: data?.leadsId, status: path?.status, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Your ${path.status.toUpperCase()} sale has been added.`,
        life: 3000,
      });
      // setTimeout(() => {
      //   navigate(`/customer/${cardStas}`);
      // }, 3000);
    }
  }, [isSuccess, navigate, path]);
  useEffect(() => {
    console.log(error);

    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `${error?.data}`,
        life: 3000,
      });
    }
  }, [isError, error]);

  return (
    <>
      <Toast ref={toast} />
      <SaleForm status={path.status} postData={(e) => postData(e)} />
    </>
  );
};

export default AddSale;
