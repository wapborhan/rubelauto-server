import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { useGetPartsPurchaseQuery } from "../../redux/feature/api/purchaseApi";
import { useGetSupplierQuery } from "../../redux/feature/api/supplierApi";
import { useParams } from "react-router-dom";

const SupplierDetailPur = () => {
  const dt = useRef(null);
  const { id } = useParams();
  const { data: partsMemoList, isLoading } = useGetPartsPurchaseQuery();
  const { data: allSuplier, isLoading: supLoading } = useGetSupplierQuery();
  const [filterPartsMemoList, setFilterPartsMemoList] = useState(
    partsMemoList?.data
  );

  useEffect(() => {
    if (partsMemoList?.data) {
      const filterData = partsMemoList?.data?.filter(
        (item) => item?.supplierId === id
      );
      setFilterPartsMemoList(filterData);
    }
  }, [id, partsMemoList?.data]);

  console.log(partsMemoList?.data);

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
  const supplierTemplate = (rowData) => {
    const filterData = allSuplier?.data?.find(
      (item) => item?._id === rowData?.supplierId
    );
    return (
      <div className="flex align-items-center gap-2">
        <span>{filterData?.bssName}</span>
      </div>
    );
  };

  const tabID = (data, props) => {
    // eslint-disable-next-line react/prop-types
    return props.rowIndex + 1;
  };

  return (
    <div className="card">
      <DataTable
        ref={dt}
        value={filterPartsMemoList}
        paginator
        rows={10}
        dataKey="_id"
        loading={isLoading}
        globalFilterFields={[
          "brandName",
          "modelName",
          "showroomName",
          "engine",
          "chassis",
          "stockStatus",
        ]}
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
          field="supplierId"
          header="Supplier"
          body={supplierTemplate}
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
      </DataTable>
    </div>
  );
};

export default SupplierDetailPur;
