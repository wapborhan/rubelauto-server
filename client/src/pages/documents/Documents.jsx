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
import UpdateDocument from "./UpdateDocument";
import { useGetCustomerQuery } from "../../redux/feature/api/customerApi";
import { useSelector } from "react-redux";

const Documents = () => {
  const path = useParams();
  const tooltipRef = useRef(null);
  const dt = useRef(null);

  const { showRoom } = useSelector((state) => state.userStore);
  const {
    data: customers,
    refetch,
    isPending,
  } = useGetCustomerQuery({
    path: "paid",
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
          <ExportCSV dt={dt} customers={customers?.data} />
          <ExportExcel product={customers?.data} />
          <ExportPDF product={customers?.data} />
        </div>
      </div>
    );
  };

  const saleDateTemplate = (rowData) => {
    return <span>{moment(rowData.saledate).format("DD-MMM-YYYY")}</span>;
  };
  const statusDateTemplate = (rowData) => {
    return (
      <span>
        {rowData.cardStatus.docDate
          ? moment(rowData.cardStatus.docDate).format("DD-MMM-YYYY")
          : moment(rowData.cardStatus.paiddate).format("DD-MMM-YYYY")}
      </span>
    );
  };

  const statusTemplate = (rowData) => {
    return (
      <div className="flex gap-3 justify-center">
        {rowData.cardStatus.docStatus === "delivared" ? (
          <span className="bg-blue-500 text-white py-1 px-3 rounded-md text-sm">
            Delivared
          </span>
        ) : rowData.cardStatus.docStatus === "complete" ? (
          <span className="bg-green-500 text-white py-1 px-3 rounded-md text-sm">
            Complete
          </span>
        ) : (
          <span className="bg-red-500 text-white py-1 px-3 rounded-md text-sm">
            Pending
          </span>
        )}
      </div>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-3 justify-center">
        <NavLink
          to={`/customer/view/${rowData?.cardno}`}
          className="text-white flex custom-tooltip cursor-pointer !px-2 !py-1 items-center justify-center w-full bg-red-500 rounded-md"
          data-pr-tooltip="Details"
          data-pr-position="top"
        >
          <i className="pi pi-eye"></i>
        </NavLink>

        <UpdateDocument data={rowData} refetch={refetch} />
      </div>
    );
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const header = renderHeader();

  const footer = `In total there are total ${
    customers ? customers?.data.length : 0
  } Paid Customers.`;

  return (
    <div className="card w-full mx-auto">
      <Tooltip ref={tooltipRef} target=".custom-tooltip" className="text-sm" />
      <DataTable
        ref={dt}
        dataKey="_id"
        value={customers?.data}
        header={header}
        footer={footer}
        loading={isPending}
        filters={filters}
        globalFilterFields={[
          "customerInfo.name",
          "productInfo.models",
          "productInfo.engine",
        ]}
        stripedRows
        paginator
        rows={10}
        // rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No paid customers found."
      >
        <Column body={tabID} header="SL" />
        <Column
          header="Sale date"
          style={{ minWidth: "8.5rem" }}
          body={saleDateTemplate}
        />

        <Column
          field="productCond"
          header="Condition"
          // style={{ minWidth: "8rem" }}
        />

        <Column
          field="customerInfo.name"
          header="Customer"
          style={{ minWidth: "10rem" }}
        />
        {/* <Column
          field="customerInfo.number"
          header="Number"
          // style={{ minWidth: "8rem" }}
        /> */}
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
          header="Status"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={statusTemplate}
        />
        <Column
          header="Status Date"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={statusDateTemplate}
        />
        <Column
          header="Action"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default Documents;
