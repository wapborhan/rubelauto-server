import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import GlobalFilter from "../../components/shared/GlobalFilter";
import ExportButtons from "../../components/shared/exportButton/ExportButtons";
import useAccount from "../../hooks/useAccount";

const AccountLists = () => {
  const dt = useRef(null);
  const tooltipRef = useRef(null);

  const [allAccounts, refetch, isLoading, isPending] = useAccount()

  useEffect(() => {
    refetch()
  }, [])
  

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:justify-between justify-center">
        <GlobalFilter setFilters={setFilters} filters={filters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportButtons state={allAccounts} dt={dt} />
        </div>
      </div>
    );
  };

  

  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-4">
        {
          /* <NavLink
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
        </NavLink> */
        }
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
      value={allAccounts}
      header={header}
      loading={isLoading}
      filters={filters}
      globalFilterFields={["name"]}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50, 100]}
      emptyMessage="No Suplier found."
    >
      <Column
        body={tabID}
        header="SL"
        showFilterMenu={false}
        filterPlaceholder="Search"
        // style={{ minWidth: "8rem" }}
      />
      <Column
        field="name"
        header="Account Name"
        showFilterMenu={false}
        filterPlaceholder="Search"
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="code"
        header="Code"
        showFilterMenu={false}
        filterPlaceholder="Search"
        style={{ minWidth: "8rem" }}
      />

      <Column
        field="remainingBalance"
        header="Remaining Balance"
        showFilterMenu={false}
        filterPlaceholder="Search"
        style={{ minWidth: "8rem" }}
      />
      <Column
        field="verified"
        header="Action"
        dataType="boolean"
        style={{ minWidth: "2rem" }}
        body={verifiedBodyTemplate}
      />
    </DataTable>
  </div>
  )
}

export default AccountLists