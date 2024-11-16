import { useContext, useRef, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import useSingleStaff from "../../hooks/useSingleStaff";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import GlobalFilter from "../../components/shared/GlobalFilter";
import ExportButtons from "../../components/shared/exportButton/ExportButtons";
import { Column } from "primereact/column";

const ViewCost = () => {
  const dt = useRef(null);
  const tooltipRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [singlestaff] = useSingleStaff(user?.email);

  console.log(singlestaff);

  const { data: allCost = [], isPending } = useQuery({
    queryKey: ["allCost"],
    enabled: !!singlestaff,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/cost?showroom=${singlestaff?.showRoom}`
      );
      return res.data.data;
    },
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:justify-between justify-center">
        <GlobalFilter setFilters={setFilters} filters={filters} />
        <div className="flex align-items-center  justify-between gap-2">
          <ExportButtons state={allCost} dt={dt} />
        </div>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <span>{rowData.date}</span>;
  };

  const tabID = (data, props) => {
    return props.rowIndex + 1;
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
        value={allCost}
        header={header}
        loading={isPending}
        filters={filters}
        globalFilterFields={["name"]}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        emptyMessage="No leads found."
      >
        <Column
          body={tabID}
          header="SL"
          showFilterMenu={false}
          filterPlaceholder="Search"
          // style={{ minWidth: "8rem" }}
        />
        <Column
          field="status"
          header="Status"
          showFilterMenu={false}
          filterPlaceholder="Search"
          body={statusBodyTemplate}
          // style={{ minWidth: "8rem" }}
          className="capitalize"
        />
        <Column
          field="categories"
          header="Categories"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="description"
          header="Description"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="staffEmail"
          header="Added By"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="amount"
          header="Amount"
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
  );
};

export default ViewCost;
