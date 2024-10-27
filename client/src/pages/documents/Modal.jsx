import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import useAuth from "../../hooks/useAuth";
import useSingleStaff from "../../hooks/useSingleStaff";

export default function Modal({ cardNo, setSelectedCardNo, selectedCardNo }) {
  const toast = useRef(null);
  const menuRight = useRef(null);
  const { user } = useAuth();
  const [singlestaff] = useSingleStaff(user?.email);
  const axiosPublic = useAxiosPublic();

  const updateStatus = (status) => {
    let message;
    let sts;
    if (status === "paid") {
      message = "pending";
      sts = "paid";
    } else if (status === "complete") {
      message = "complete";
      sts = "complete";
    } else {
      message = "delivared";
      sts = "delivared";
    }

    const data = {
      docDate: new Date(),
      docStatus: sts,
      staff: singlestaff?.name,
    };

    axiosPublic.patch(`/documents/update/${selectedCardNo}`, data).then(
      (res) => {
        console.log(res);
        toast.current.show({
          severity: "success",
          summary: "Status",
          detail: `Updated ${message}.`,
        });
      },
    ).catch((err) => {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Status",
        detail: `Updated ${message}.`,
      });
    });
  };

  const items = [
    {
      label: "Pending",
      icon: "pi pi-refresh",
      command: () => {
        updateStatus("paid");
        setSelectedCardNo(cardNo);
      },
    },
    {
      label: "Complete",
      icon: "pi pi-check",
      command: () => {
        updateStatus("complete");
        setSelectedCardNo(cardNo);
      },
    },
    {
      label: "Delivared",
      icon: "pi pi-external-link",
      command: () => {
        updateStatus("delivared");
        setSelectedCardNo(cardNo);
      },
    },
  ];

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast}></Toast>
      <Button
        // label="Show Right"
        icon="pi pi-cog"
        className="mr-2"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </div>
  );
}
