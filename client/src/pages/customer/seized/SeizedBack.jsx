import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useSetSeizedBackMutation } from "../../../redux/feature/api/customerApi";

const SeizedBack = ({ data }) => {
  const { cardno } = data;
  // const navigate = useNavigate();
  const toast = useRef(null);
  const [setPost, { isSuccess, isError }] = useSetSeizedBackMutation();

  const accept = () => {
    const backData = {
      type: "running",
      date: null,
      staff: null,
      seizedCost: 0,
      coments: null,
    };

    setPost({ cardno, backData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Your Card No. ${cardno}  has been Seized Back.`,
        life: 3000,
      });
    }
  }, [isSuccess, cardno]);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Your Card No. ${cardno}  has not been added to Seized List.`,
        life: 3000,
      });
    }
  }, [isError, cardno]);

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
