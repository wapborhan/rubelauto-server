import moment from "moment";
import { useGetSupplierStatementQuery } from "../../redux/feature/api/supplierApi";

const SupplierDetailPur = ({ supplierId }) => {
  const { data, isLoading, isError } = useGetSupplierStatementQuery(supplierId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Faild to Load...</p>;

  console.log(data);

  return (
    <fieldset className="mb-4 !pt-10 !pb-0 !px-0 ">
      <legend>স্টেটমেন্ট</legend>
      <table className="w-full border !rounded-b-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Reference</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Debit (Purchase)</th>
            <th className="border px-2 py-1">Credit (Payment)</th>
            <th className="border px-2 py-1">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td colSpan={2}>Opening Balance</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="border px-2 py-1 font-semibold">
              {data?.supplier?.openingBalance.toFixed(2)}
            </td>
          </tr>
          {data.transactions.map((t, i) => (
            <tr key={i} className="text-center">
              <td className="border px-2 py-1">
                {moment(t.date).format("DD-MM-YYYY")}
                {/* {new Date(t.date).toLocaleDateString()} */}
              </td>
              <td className="border px-2 py-1">{t.refNo || "-"}</td>
              <td className="border px-2 py-1">{t.description}</td>
              <td className="border px-2 py-1">
                {t.debit > 0 ? t.debit.toFixed(2) : "-"}
              </td>
              <td className="border px-2 py-1">
                {t.credit > 0 ? t.credit.toFixed(2) : "-"}
              </td>
              <td className="border px-2 py-1 font-semibold">
                {t.balance.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 font-bold  !rounded-b-md">
          <tr>
            <td colSpan="3" className="border px-2 py-1 text-right">
              Totals
            </td>
            <td className="border px-2 py-1">
              {data.statement.debitTotal.toFixed(2)}
            </td>
            <td className="border px-2 py-1">
              {data.statement.creditTotal.toFixed(2)}
            </td>
            <td className="border px-2 py-1">
              {data.statement.netAmount.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </fieldset>
  );
};

export default SupplierDetailPur;
