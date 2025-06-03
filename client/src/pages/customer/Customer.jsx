import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCustomerQuery } from "../../redux/feature/api/customerApi";
import {
  saleDateTemplate,
  verifiedBodyTemplate,
  accountTemplate,
  installmentTemplate,
} from "./customerTableTemplates";
import { renderHeader, footerGroup } from "./customerTableHeaderFooter";

export default function Customer() {
  const tooltipRef = useRef(null);
  const dt = useRef(null);
  const { status } = useParams();
  const path = status || "running";

  const { showRoom } = useSelector((state) => state.userStore);
  const {
    data: customers,
    refetch,
    isPending,
  } = useGetCustomerQuery({ path, showRoom });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [instFromDay, setInstFromDay] = useState(null);
  const [instToDay, setInstToDay] = useState(null);
  const [showRoomFilter, setShowRoomFilter] = useState(null);

  useEffect(() => {
    refetch();
    tooltipRef.current && tooltipRef.current.updateTargetEvents();
  }, [path.status, refetch, customers]);

  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const uniqueShowRooms = [
    ...new Set(customers?.data?.map((c) => c.showRoom)),
  ].filter(Boolean);

  const filteredData = customers?.data?.filter((item) => {
    const saleDate = new Date(item.saledate);
    const installmentDate = new Date(item?.accountInfo?.insdate);

    // Sale Date Range
    if (fromDate && saleDate < new Date(fromDate)) return false;
    if (toDate && saleDate > new Date(toDate)) return false;

    // Installment Day Number Filter (1–31)
    if (instFromDay || instToDay) {
      const day = installmentDate.getDate();
      const from = instFromDay || 1;
      const to = instToDay || 31;
      if (day < from || day > to) return false;
    }
    if (showRoomFilter && item.showRoom !== showRoomFilter) return false;
    return true;
  });

  const header = renderHeader(
    filters,
    setFilters,
    customers,
    dt,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    instFromDay,
    setInstFromDay,
    instToDay,
    setInstToDay,
    showRoomFilter,
    setShowRoomFilter,
    uniqueShowRooms
  );
  const footer = footerGroup(filteredData, path);

  return (
    <div className="card w-fulls mx-auto ">
      <Tooltip ref={tooltipRef} target=".custom-tooltip" className="text-sm" />
      <DataTable
        ref={dt}
        dataKey="_id"
        value={filteredData}
        header={header}
        footerColumnGroup={footer}
        loading={isPending}
        filters={filters}
        globalFilterFields={["customerInfo.name", "cardno"]}
        stripedRows
        paginator
        rows={10}
        // rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No customers found."
      >
        <Column body={tabID} header="SL" />
        <Column
          header="Sale date"
          style={{ minWidth: "8.5rem" }}
          // body={saleDateTemplate}
          body={(rowData) => saleDateTemplate(rowData)}
        />
        <Column
          field="cardno"
          header="Card No."
          style={{ minWidth: "7.5rem" }}
        />

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
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Contract Due"
          body={(rowData) => accountTemplate(rowData)}
          style={{ minWidth: "5rem" }}
        />
        <Column
          header="Installment Due"
          body={(rowData) => installmentTemplate(rowData)}
          style={{ minWidth: "5rem" }}
        />
        <Column field="showRoom" header="Showroom" />
        <Column
          header="Action"
          body={(rowData) => verifiedBodyTemplate(rowData, path)}
        />
      </DataTable>
    </div>
  );
}
