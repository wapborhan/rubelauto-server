import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";
import { useSetUpdateDocumentMutation } from "../../redux/feature/api/customerApi";

export default function UpdateDocument({ data, refetch }) {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const { name } = useSelector((state) => state.userStore);
  const [setPost, { isSuccess, isError }] = useSetUpdateDocumentMutation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);
  const cities = [
    { name: "Pending", code: "paid" },
    { name: "Complete", code: "complete" },
    { name: "Delivared", code: "delivared" },
  ];

  let message;
  let sts;
  if (status?.code === "paid") {
    message = "pending";
    sts = "paid";
  } else if (status?.code === "complete") {
    message = "complete";
    sts = "complete";
  } else if (status?.code === "delivared") {
    message = "Delivared";
    sts = "delivared";
  }

  const handleSubmit = (card) => {
    const backData = {
      docDate: new Date(),
      docStatus: sts,
      staff: name,
    };
    setPost({ card, backData });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setTimeout(() => {
        navigate(`/documents`);
      }, 2000);
      toast.current.show({
        severity: "success",
        summary: "Status",
        detail: `Updated ${message}.`,
      });
      setVisible(false);
    }
  }, [isSuccess, navigate, message, refetch]);
  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "error",
        summary: "Status",
        detail: `Error ${message}.`,
      });
      setVisible(false);
    }
  }, [isError, message]);

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Button
        icon="pi pi-user"
        onClick={() => setVisible(true)}
        className="!px-3 !py-2 justify-items-center w-full"
      />
      <Dialog
        header="Update Documents Status"
        visible={visible}
        draggable={false}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="flex flex-col gap-5 text-center mx-auto">
          <label htmlFor="Status" className="text-primary-50 font-semibold">
            Status
          </label>
          <Dropdown
            value={status}
            onChange={(e) => setStatus(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select Status"
            className="w-6/12 md:w-14rem  mx-auto"
          />
          <Button
            onClick={() => handleSubmit(data?.cardno)}
            label="Update"
            severity="success"
            className="bg-green-700 py-2 px-5 text-white"
          />
        </div>
      </Dialog>
    </div>
  );
}
