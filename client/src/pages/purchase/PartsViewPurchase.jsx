import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ExportPDF from "../../components/shared/exportButton/ExportPDF";
import ExportExcel from "../../components/shared/exportButton/ExportExcel";
import ExportCSV from "../../components/shared/exportButton/ExportCSV";
import useProdType from "../../hooks/data/useProdType";
import moment from "moment";
import GlobalFilter from "../../components/shared/GlobalFilter";
import { useGetPartsPurchaseQuery } from "../../redux/feature/api/purchaseApi";
import { useGetSupplierQuery } from "../../redux/feature/api/supplierApi";
import { NavLink } from "react-router-dom";

const PartsViewPurchase = () => {
  const dt = useRef(null);
  const { data: partsMemoList, isLoading } = useGetPartsPurchaseQuery();
  const { data: allSuplier, isLoading: supLoading } = useGetSupplierQuery();
  const [proTypeList] = useProdType();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  console.log(partsMemoList);

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 justify-between">
        <GlobalFilter filters={filters} setFilters={setFilters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportCSV dt={dt} />
          <ExportExcel product={partsMemoList?.data} />
          <ExportPDF product={partsMemoList?.data} />
        </div>
      </div>
    );
  };

  const memoDateTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{moment(rowData.memoDate).format("DD-MMM-YYYY")}</span>
      </div>
    );
  };
  const recDateTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{moment(rowData.receivedDate).format("DD-MMM-YYYY")}</span>
      </div>
    );
  };

  const tabID = (data, props) => {
    // eslint-disable-next-line react/prop-types
    return props.rowIndex + 1;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <NavLink
          to={`/contact/supplier/edit/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Edit"
          data-pr-position="top"
        >
          <i className="pi pi-file-edit"></i>
        </NavLink>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        ref={dt}
        value={partsMemoList?.data}
        paginator
        rows={10}
        dataKey="_id"
        filters={filters}
        loading={isLoading}
        globalFilterFields={[
          "brandName",
          "modelName",
          "showroomName",
          "engine",
          "chassis",
          "stockStatus",
        ]}
        header={header}
        emptyMessage="No product found."
      >
        <Column
          body={tabID}
          header="SL"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          header="Memo Date"
          style={{ minWidth: "9rem" }}
          body={memoDateTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          field="supplier.bssName"
          header="Supplier"
          // body={supplierTemplate}
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="MemoNo"
          header="Mome NO."
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          header="Received Date"
          style={{ minWidth: "9rem" }}
          body={recDateTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          field="transport"
          header="Transport"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="amount"
          header="Amount"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="verified"
          header="মেনু"
          dataType="boolean"
          style={{ minWidth: "2rem" }}
          body={verifiedBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default PartsViewPurchase;
