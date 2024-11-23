import { NavLink } from "react-router-dom";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "jspdf-autotable";
import moment from "moment";
import { useGetStaffQuery } from "../../redux/feature/api/staffApi";

const ViewStaff = () => {
  const { data: staff, isLoading } = useGetStaffQuery();

  const renderHeader = () => {
    return (
      <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:justify-between justify-center">
        <h1 className="h1 font-bold">Users</h1>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.showRoom} />;
  };
  const joinDateTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <span>{moment(rowData.joinDate).format("DD-MMM-YYYY")}</span>
      </div>
    );
  };
  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const verifiedBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <NavLink
          to={`/profile/details?email=${rowData?.email}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
        >
          Show
        </NavLink>
        <NavLink
          to={`/profile/${rowData?._id}`}
          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
        >
          Edit
        </NavLink>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <div className="users w-full">
      <DataTable
        value={staff?.data}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50, 100]}
        dataKey="_id"
        loading={isLoading}
        header={header}
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
          header="Received Date"
          filterField="receivedDate"
          style={{ minWidth: "10rem" }}
          body={joinDateTemplate}
          showFilterMenu={false}
          filterPlaceholder="Name"
        />
        <Column
          field="name"
          header="Name"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="mobile"
          header="Number"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="email"
          header="Email"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="showRoom"
          header="Showroom"
          showFilterMenu={false}
          filterPlaceholder="Search"
          body={statusBodyTemplate}
          style={{ minWidth: "8rem" }}
          className="capitalize"
        />
        <Column
          field="designation"
          header="Designation"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="userType"
          header="User Type"
          showFilterMenu={false}
          filterPlaceholder="Search"
          style={{ minWidth: "8rem" }}
          className="capitalize"
        />
        <Column
          field="verified"
          header="Action"
          dataType="boolean"
          style={{ minWidth: "6rem" }}
          body={verifiedBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default ViewStaff;
