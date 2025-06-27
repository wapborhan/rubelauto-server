import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Tag } from "primereact/tag";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import GlobalFilter from "../../components/shared/GlobalFilter";
import ExportButtons from "../../components/shared/exportButton/ExportButtons";
import { useGetSupplierQuery } from "../../redux/feature/api/supplierApi";

function ViewSuplier() {
  const { pathname } = useLocation();
  const dt = useRef(null);
  const tooltipRef = useRef(null);
  const { data: supplier, isLoading } = useGetSupplierQuery();
  const [allSuplier, setAllSupplier] = useState([]);

  useEffect(() => {
    if (pathname === "/contact/supplier/parts/view") {
      const filterSupplier = supplier?.data?.filter(
        (item) => item.prodType === "Parts"
      );
      setAllSupplier(filterSupplier);
    } else {
      setAllSupplier(supplier?.data);
    }
  }, [pathname, supplier]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:justify-between justify-center">
        <GlobalFilter setFilters={setFilters} filters={filters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportButtons state={allSuplier} dt={dt} />
        </div>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.prodType} severity={getSeverity(rowData)} />;
  };
  const getSeverity = (rowData) => {
    switch (rowData.prodType) {
      case "Motorcycle":
        return "success";

      case "Parts":
        return "danger";

      case "Easybike":
        return "warning";

      case "LPG":
        return "info";

      default:
        return null;
    }
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <NavLink
          to={`/contact/supplier/view/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="View"
          data-pr-position="top"
        >
          <i className="pi pi-eye"></i>
        </NavLink>
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
      <Tooltip
        ref={tooltipRef}
        target=".custom-tooltip"
        className="text-sm p-2"
      />
      <DataTable
        ref={dt}
        dataKey="_id"
        value={allSuplier}
        header={header}
        loading={isLoading}
        filters={filters}
        globalFilterFields={["bssName", "prodType"]}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No Suplier found."
      >
        <Column
          body={tabID}
          header="ক্রঃ"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        {pathname === "/contact/supplier/parts/view" ? null : (
          <Column
            field="status"
            header="স্ট্যাটাস"
            showFilterMenu={false}
            filterPlaceholder="Search"
            body={statusBodyTemplate}
            // style={{ minWidth: "8rem" }}
            className="capitalize"
          />
        )}

        <Column
          field="bssName"
          header="সরবরাহকারী"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="empName"
          header="কর্মচারী"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="mobile"
          header="নম্বর"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="openingBalance"
          header="ওপেনিং ব্যালান্স"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="purchase"
          header="ক্রয়"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="openingBalance"
          header="বাকি"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
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
}

export default ViewSuplier;
