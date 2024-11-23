import moment from "moment";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from "react";
import { useGetSingleInstallmentQuery } from "../../../redux/feature/api/customerApi";

const CusAccountInfo = ({ singleCustomer }) => {
  // const [singleInstallment, refetch, isLoading, isPending] =
  //   useSingleInstallment(singleCustomer?.cardno);

  const {
    data: singleInstallment,
    refetch,
    isLoading,
  } = useGetSingleInstallmentQuery(singleCustomer?.cardno);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const tabID = (data, props) => {
    return props.rowIndex + 1;
  };

  const date = (ins) => {
    return <span>{moment(ins?.date).format("D-MM-YY")}</span>;
  };

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <DataTable
          value={singleInstallment?.data}
          tableStyle={{ minWidth: "50rem" }}
          className="shadow-md mb-14"
          emptyMessage={"No installment found."}
          rowHover
        >
          <Column body={tabID} header="SL" />
          <Column body={date} header="Date"></Column>
          <Column field="amount" header="Amount"></Column>
          <Column field="voucher" header="Voucher No."></Column>
          <Column field="receiver" header="Received By"></Column>
          <Column field="coments" header="Notes"></Column>
        </DataTable>
      )}
    </>
  );
};

export default CusAccountInfo;
