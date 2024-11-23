import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavLink } from "react-router-dom";
import ExportPDF from "../../components/shared/exportButton/ExportPDF";
import ExportExcel from "../../components/shared/exportButton/ExportExcel";
import ExportCSV from "../../components/shared/exportButton/ExportCSV";
import GlobalFilter from "../../components/shared/GlobalFilter";
import ProductDelete from "./ProductDelete";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Toast } from "primereact/toast";
import { useGetproductQuery } from "../../redux/feature/api/productApi";

export default function ViewProduct() {
  const dt = useRef(null);
  const toast = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { data: product, isLoading, refetch } = useGetproductQuery();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [currentProductId, setCurrentProductId] = useState(null);

  const renderHeader = () => {
    return (
      <div className="flex gap-5 lg:flex-nowrap flex-wrap justify-between">
        <GlobalFilter filters={filters} setFilters={setFilters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportCSV dt={dt} />
          <ExportExcel product={product?.data} />
          <ExportPDF product={product?.data} />
        </div>
      </div>
    );
  };

  // Delete handler to trigger confirmation dialog
  const handleDelete = (id) => {
    setCurrentProductId(id); // Set the product to delete
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Product Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Confirm",
      rejectLabel: "Cancel",
      accept: () => performDelete(id),
      reject: () =>
        toast.current.show({
          severity: "warn",
          summary: "Cancelled",
          detail: "Delete action cancelled.",
          life: 3000,
        }),
    });
  };

  const performDelete = (id) => {
    axiosPublic
      .delete(`/product/${id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: `Product ${id} deleted successfully.`,
            life: 3000,
          });
        }
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Failed to delete product ${id}.`,
          life: 3000,
        });
      });
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
        <ProductDelete
          id={rowData._id}
          onDelete={() => handleDelete(rowData._id)}
        />
      </div>
    );
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };
  const header = renderHeader();

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        ref={dt}
        value={product?.data}
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
