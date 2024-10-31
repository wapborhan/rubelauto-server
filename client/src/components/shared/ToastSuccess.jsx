import { useRef } from "react";

const ToastSuccess = ({ details }) => {
  const toast = useRef(null);
  return (
    <>
      {toast.current.show({
        severity: "success",
        summary: "Success",
        detail: details,
        life: 3000,
      })}
    </>
  );
};

export default ToastSuccess;
