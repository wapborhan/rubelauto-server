import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const SeizedBack = ({ data }) => {
  const { cardno } = data;
  const navigate = useNavigate();
  const toast = useRef(null);
  const axiosPublic = useAxiosPublic();

  const accept = () => {
    const showSuccess = () => {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Your Card No. ${cardno}  has been Seized Back.`,
        life: 3000,
      });
    };
    const showError = () => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Your Card No. ${cardno}  has not been added to Seized List.`,
        life: 3000,
      });
    };

    const backData = {
      type: "running",
      date: null,
      staff: null,
      seizedCost: 0,
      coments: null,
    };

    axiosPublic
      .patch(`/customer/seized/${cardno}`, backData)
      .then((res) => {
        showSuccess();
        // setTimeout(() => {
        //   navigate(`/customer/seized`);
        // }, 3000);
        console.log(res);
      })
      .catch((err) => {
        showError();
        console.log(err);
      });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Sezied Back Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
      acceptButton: "confirm",
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <button
        onClick={confirm}
        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
        data-pr-tooltip="Seized Back"
        data-pr-position="top"
      >
        <i className="pi pi-times-circle"></i>
      </button>
    </>
  );
};

export default SeizedBack;
