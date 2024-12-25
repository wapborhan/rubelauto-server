import moment from "moment";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ExportCSV from "../../components/shared/exportButton/ExportCSV";
import ExportExcel from "../../components/shared/exportButton/ExportExcel";
import ExportPDF from "../../components/shared/exportButton/ExportPDF";
import GlobalFilter from "../../components/shared/GlobalFilter";
import SeizedBack from "./seized/SeizedBack";
import { useSelector } from "react-redux";
import { useGetCustomerQuery } from "../../redux/feature/api/customerApi";

export default function Customer() {
  const path = useParams();
  console.log(path?.status);

  const tooltipRef = useRef(null);
  const dt = useRef(null);
  const { showRoom } = useSelector((state) => state.userStore);
  const {
    data: customers,
    refetch,
    isPending,
  } = useGetCustomerQuery({
    path: path?.status,
    showRoom,
  });
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    refetch();
    tooltipRef.current && tooltipRef.current.updateTargetEvents();
  }, [path.status, refetch, customers]);

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap justify-between">
        <GlobalFilter setFilters={setFilters} filters={filters} />

        <div className="flex align-items-center  justify-between gap-2">
          <ExportCSV dt={dt} />
          <ExportExcel product={customers?.data} />
          <ExportPDF product={customers?.data} />
        </div>
      </div>
    );
  };

  const saleDateTemplate = (rowData) => {
    return <span>{moment(rowData.saledate).format("DD-MMM-YYYY")}</span>;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-3 justify-center">
        {path.status === "cash" ? (
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
        {path.status === "running" ? (
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

        {path.status === "cash" || path.status === "running" ? (
          <NavLink
            to={`/customer/paid/${rowData?.cardno}`}
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
            data-pr-tooltip="Paid"
            data-pr-position="top"
          >
            <i className="pi pi-times-circle"></i>
          </NavLink>
        ) : (
          ""
        )}
        {path.status === "seized" ? <SeizedBack data={rowData} /> : ""}
      </div>
    );
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const header = renderHeader();

  const footer = `In total there are ${
    customers ? customers?.data?.length : 0
  } Customers.`;

  console.log(customers);

  return (
    <div className="card w-full mx-auto ">
      <Tooltip ref={tooltipRef} target=".custom-tooltip" className="text-sm" />
      <DataTable
        ref={dt}
        dataKey="_id"
        value={customers?.data}
        header={header}
        footer={footer}
        loading={isPending}
        filters={filters}
        globalFilterFields={["customerInfo.name"]}
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No customers found."
      >
        <Column body={tabID} header="SL" />
        <Column
          header="Sale date"
          style={{ minWidth: "8.5rem" }}
          body={saleDateTemplate}
        />
        <Column
          field="cardno"
          header="Card No."
          style={{ minWidth: "7.5rem" }}
        />
        {/* <Column
    field="productCond"
    header="Condition"
    // style={{ minWidth: "8rem" }}
  /> */}
        <Column
          field="customerInfo.name"
          header="Customer"
          style={{ minWidth: "10rem" }}
        />
        <Column
          field="customerInfo.number"
          header="Number"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="productInfo.models"
          header="Model"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="productInfo.engine"
          header="Engine No."
          style={{ minWidth: "8rem" }}
        />
        <Column field="showRoom" header="Showroom" />
        <Column
          header="Action"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
        />
      </DataTable>
    </div>
  );
}
