import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavLink } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import ExportPDF from "../../components/shared/exportButton/ExportPDF";
import ExportExcel from "../../components/shared/exportButton/ExportExcel";
import ExportCSV from "../../components/shared/exportButton/ExportCSV";
import GlobalFilter from "../../components/shared/GlobalFilter";

export default function ViewProduct() {
  const dt = useRef(null);
  const [product, isLoading] = useProduct();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const productDelete = () => {
    alert("Function Cooming Soon.");
  };

  const renderHeader = () => {
    return (
      <div className="flex gap-5 lg:flex-nowrap flex-wrap justify-between">
        <GlobalFilter filters={filters} setFilters={setFilters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportCSV dt={dt} />
          <ExportExcel product={product} />
          <ExportPDF product={product} />
        </div>
      </div>
    );
  };

  const brandImageTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img src={rowData.brandImg} className="w-16" alt="" />
      </div>
    );
  };
  const modelImgTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img src={rowData.modelImg} className="w-16" alt="" />
      </div>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <NavLink
          to={`/products/edit/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Update"
          data-pr-position="top"
        >
          <i className="pi pi-pencil"></i>
        </NavLink>

        <button
          onClick={productDelete}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Delete"
          data-pr-position="top"
        >
          <i className="pi pi-trash"></i>
        </button>
      </div>
    );
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };
  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        ref={dt}
        value={product}
        paginator
        rows={10}
        dataKey="_id"
        filters={filters}
        loading={isLoading}
        globalFilterFields={["brandName", "modelName"]}
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
          header="Brand Image"
          filterField="brandImage"
          style={{ minWidth: "10rem" }}
          body={brandImageTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          field="brandName"
          header="Brand Name"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          header="Model Image"
          filterField="modelImg"
          style={{ minWidth: "9rem" }}
          body={modelImgTemplate}
          showFilterMenu={false}
          filterPlaceholder="Number"
        />
        <Column
          field="modelName"
          header="Model Name"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="cashPrice"
          header="Cash Price"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="creditPrice"
          header="Credit Price"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="action"
          header="Action"
          dataType="boolean"
          // style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
        />
      </DataTable>
    </div>
  );
}
