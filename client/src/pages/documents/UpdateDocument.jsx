import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import useAuth from "../../hooks/useAuth";
import useSingleStaff from "../../hooks/useSingleStaff";

export default function UpdateDocument({ data, refetch }) {
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);
  const { user } = useAuth();
  const [singlestaff] = useSingleStaff(user?.email);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

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
      staff: singlestaff?.name,
    };

    axiosPublic
      .patch(`/document/update/${card}`, backData)
      .then((res) => {
        refetch();
        setTimeout(() => {
          navigate(`/documents`);
        }, 2000);
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Status",
          detail: `Updated ${message}.`,
        });
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Status",
          detail: `Error ${message}.`,
        });
        setVisible(false);
      });
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Button
        icon="pi pi-user"
        onClick={() => setVisible(true)}
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
          <label
            htmlFor="Status"
            className="text-primary-50 font-semibold"
          >
            Status
          </label>
          <Dropdown
            value={status}
            onChange={(e) => setStatus(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Select Status"
            className="w-6/12 md:w-14rem  mx-auto"
          />{" "}
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
