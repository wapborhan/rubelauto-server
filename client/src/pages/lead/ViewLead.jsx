import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import GlobalFilter from "../../components/shared/GlobalFilter";
import ExportButtons from "../../components/shared/exportButton/ExportButtons";
import { useGetLeadQuery } from "../../redux/feature/api/leadApi";

export default function ViewLead() {
  const dt = useRef(null);
  const tooltipRef = useRef(null);
  const { data: leads, isLoading } = useGetLeadQuery();
  console.log(leads);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:justify-between justify-center">
        <GlobalFilter setFilters={setFilters} filters={filters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportButtons state={leads?.data} dt={dt} />
        </div>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData)} />;
  };
  const getSeverity = (rowData) => {
    switch (rowData.status) {
      case "Hot":
        return "success";

      case "Warm":
        return "danger";

      case "Cold":
        return "info";

      default:
        return null;
    }
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const addressTemplate = ({ address }) => {
    return (
      <span>
        {`${address?.village}, ${address?.union}, ${address?.upazila}, ${address?.district}.`}
      </span>
    );
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        <NavLink
          to={`/contact/lead/view/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="View"
          data-pr-position="top"
        >
          <i className="pi pi-eye"></i>
        </NavLink>
        <NavLink
          to={`/contact/lead/edit/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
          data-pr-tooltip="Edit"
          data-pr-position="top"
        >
          <i className="pi pi-file-edit"></i>
        </NavLink>
        {rowData?.guarantor.length > 0 ? (
          <NavLink
            to={`/contact/lead/edit/guarantor/${rowData?._id}`}
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
            data-pr-tooltip="Update Guarantor"
            data-pr-position="top"
          >
            <i className="pi pi-pencil"></i>
          </NavLink>
        ) : (
          <NavLink
            to={`/contact/lead/add/guarantor/${rowData?._id}`}
            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
            data-pr-tooltip="Add Guarantor"
            data-pr-position="top"
          >
            <i className="pi pi-plus-circle"></i>
          </NavLink>
        )}
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
        value={leads?.data}
        header={header}
        loading={isLoading}
        filters={filters}
        globalFilterFields={["name"]}
        paginator
        rows={10}
        // rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No leads found."
      >
        <Column
          body={tabID}
          header="ক্রঃ"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="status"
          header="স্ট্যাটাস"
          showFilterMenu={false}
          filterPlaceholder="Search"
          body={statusBodyTemplate}
          // style={{ minWidth: "8rem" }}
          className="capitalize"
        />
        <Column
          field="name"
          header="নাম"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="coname"
          header="পিতার নাম"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="number"
          header="নম্বর"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="address"
          header="ঠিকানা"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
          body={addressTemplate}
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
