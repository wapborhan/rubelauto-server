import { useGetSupplierStatementQuery } from "../../redux/feature/api/supplierApi";

const SupplierDetailPur = ({ supplierId }) => {
  const { data, isLoading, isError } = useGetSupplierStatementQuery(supplierId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Faild to Load...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">
        {data.supplier.bssName} - Statement
      </h2>

      <table className="w-full border">
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
          {data.transactions.map((t, i) => (
            <tr key={i} className="text-center">
              <td className="border px-2 py-1">
                {new Date(t.date).toLocaleDateString()}
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
        <tfoot className="bg-gray-100 font-bold">
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
    </div>
  );
};

export default SupplierDetailPur;
