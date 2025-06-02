import moment from "moment";
import { NavLink } from "react-router-dom";
import SeizedBack from "./seized/SeizedBack";

export const saleDateTemplate = (rowData) => {
  return <span>{moment(rowData.saledate).format("DD-MMM-YYYY")}</span>;
};

export const verifiedBodyTemplate = (rowData, path) => {
  console.log(path);

  return (
    <div className="flex gap-3 justify-center">
      {path === "cash" ? (
        ""
      ) : (
        <NavLink
          to={`/customer/view/${rowData?.cardno}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Details"
          data-pr-position="top"
        >
          <i className="pi pi-eye"></i>
        </NavLink>
      )}
      {path === "running" ? (
        <>
          <NavLink
            to={`/customer/payment/${rowData?.cardno}`}
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
            data-pr-tooltip="Payment"
            data-pr-position="top"
          >
            <i className="pi pi-money-bill"></i>
          </NavLink>
          <NavLink
            to={`/customer/seized/${rowData?.cardno}`}
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
            data-pr-tooltip="Seized"
            data-pr-position="top"
          >
            <i className="pi pi-lock"></i>
          </NavLink>
        </>
      ) : (
        ""
      )}

      {(path === "cash" || path === "running") && (
        <NavLink
          to={`/customer/paid/${rowData?.cardno}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Paid"
          data-pr-position="top"
        >
          <i className="pi pi-times-circle"></i>
        </NavLink>
      )}
      {path === "seized" && <SeizedBack data={rowData} />}
    </div>
  );
};

export const accountTemplate = (rowData) => {
  const totalPrice =
    rowData?.accountInfo?.saleprice + rowData?.accountInfo?.hireprice;
  const totalDue =
    totalPrice -
    rowData?.accountInfo?.dpamount -
    rowData?.accountInfo?.totalInstallmentAmount;

  return <div className="flex gap-3 justify-center">{totalDue}</div>;
};

export const installmentTemplate = (rowData) => {
  const saleDate = new Date(rowData?.saledate);
  const currentDate = new Date();

  let monthDifference =
    (currentDate.getFullYear() - saleDate.getFullYear()) * 12;
  monthDifference -= saleDate.getMonth();
  monthDifference += currentDate.getMonth();

  if (currentDate.getDate() < saleDate.getDate()) {
    monthDifference--;
  }

  const daysDifference = Math.floor(
    (currentDate - saleDate) / (1000 * 60 * 60 * 24)
  );
  if (daysDifference > 30) {
    monthDifference++;
  }

  const needPaidAmount = monthDifference * rowData?.accountInfo?.insamount;
  const installmentDue =
    needPaidAmount - rowData?.accountInfo?.totalInstallmentAmount;

  return <div className="flex gap-3 justify-center">{installmentDue}</div>;
};

export const tabID = (data, props) => {
  return props.rowIndex + 1;
};
