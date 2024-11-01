import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavLink } from "react-router-dom";
import ExportPDF from "../../components/shared/exportButton/ExportPDF";
import ExportExcel from "../../components/shared/exportButton/ExportExcel";
import ExportCSV from "../../components/shared/exportButton/ExportCSV";
import useStock from "../../hooks/useStock";
import useProdType from "../../hooks/data/useProdType";
import moment from "moment";
import GlobalFilter from "../../components/shared/GlobalFilter";

const ViewPurchase = () => {
  const dt = useRef(null);
  const [stock, isLoading] = useStock();
  const [proTypeList] = useProdType();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 justify-between">
        <GlobalFilter filters={filters} setFilters={setFilters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportCSV dt={dt} />
          <ExportExcel product={stock} />
          <ExportPDF product={stock} />
        </div>
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
  const categoriesTemplate = (rowData) => {
    const filterData = proTypeList?.find(
      (item) => item?.sku === rowData?.categories,
    );
    return (
      <div className="flex align-items-center gap-2">
        <span>{filterData?.name}</span>
      </div>
    );
  };

  // const verifiedBodyTemplate = (rowData) => {
  //   return (
  //     <div className="flex gap-2">
  //       <NavLink
  //         to={`/products/edit/${rowData?._id}`}
  //         className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
  //         data-pr-tooltip="Update"
  //         data-pr-position="top"
  //       >
  //         <i className="pi pi-pencil"></i>
  //       </NavLink>
  //     </div>
  //   );
  // };

  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        ref={dt}
        value={stock}
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
          header="Received Date"
          style={{ minWidth: "9rem" }}
          body={recDateTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          header="Categories"
          // style={{ minWidth: "10rem" }}
          body={categoriesTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          field="modelName"
          header="Model Name"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="engine"
          header="Engine No."
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="chassis"
          header="Chassis No."
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="color"
          header="Color"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="showroomName"
          header="Location"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="stock"
          header="Stock"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="stockStatus"
          header="Condition"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        {
          /* <Column
          header="A"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
        /> */
        }
      </DataTable>
    </div>
  );
};

export default ViewPurchase;
