import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

const MemoTable = ({
  memos,
  tabID,
  calculateAmount,
  handleEdit,
  handleDelete,
  footerProps,
}) => {
  const {
    totalAmount,
    prevDue,
    setPrevDue,
    paidAmount,
    setPaidAmount,
    overallDiscount,
    setOverallDiscount,
    transport,
    setTransport,
    grandTotal,
  } = footerProps;

  const footerGroups = (
    <ColumnGroup className="bg-gray-100">
      <Row>
        <Column
          footer="Total Amount:"
          colSpan={9}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalAmount().toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer="Previous Due:"
          colSpan={9}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={prevDue}
              onChange={(e) => setPrevDue(Number(e.target.value))}
              className="p-input text-sm w-full p-2"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Paid Amount:"
          colSpan={9}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="p-input text-sm w-full"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Overall Discount:"
          colSpan={9}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={overallDiscount}
              onChange={(e) => setOverallDiscount(Number(e.target.value))}
              className="p-input text-sm w-full"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Transport:"
          colSpan={9}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="p-input text-sm w-full"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Grand Total:"
          colSpan={9}
          footerStyle={{ textAlign: "right", fontWeight: "bold" }}
        />
        <Column
          footer={grandTotal().toFixed(2)}
          footerStyle={{ fontWeight: "bold" }}
        />
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable
      value={memos}
      // paginator
      rows={5}
      stripedRows
      footerColumnGroup={footerGroups}
    >
      <Column header="SL" body={tabID} />
      <Column
        field="description"
        header="Product Name"
        style={{ minWidth: "20rem" }}
      />
      <Column field="partNo" header="Part No" />
      <Column field="model" header="Model" />
      <Column field="company" header="Company" />
      <Column field="quantity" header="Qty" />
      <Column field="unitType" header="Type" />
      <Column field="rate" header="Rate" />
      <Column field="discount" header="Disc (%)" />
      <Column
        header="Amount"
        body={(rowData) => calculateAmount(rowData).toFixed(2)}
        style={{ width: "1rem" }}
      />
      <Column
        header="Actions"
        body={(rowData) => (
          <div className="flex gap-2">
            <button
              className="p-button-rounded p-button-info bg-green-500 p-button-sm !py-1 px-3 text-white rounded-md shadow-md"
              onClick={() => handleEdit(rowData.id)}
            >
              <i className="pi pi-pencil text-sm"></i>
            </button>{" "}
            <button
              className="p-button-rounded p-button-info bg-red-500 p-button-sm !py-1 px-3 text-white rounded-md shadow-md"
              onClick={() => handleDelete(rowData.id)}
            >
              <i className="pi pi-trash text-sm"></i>
            </button>
          </div>
        )}
      />
    </DataTable>
  );
};

// ✅ PropTypes validation
MemoTable.propTypes = {
  memos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      description: PropTypes.string.isRequired,
      partNo: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
  calculateAmount: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  footerProps: PropTypes.shape({
    totalAmount: PropTypes.func.isRequired,
    prevDue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    setPrevDue: PropTypes.func.isRequired,
    paidAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    setPaidAmount: PropTypes.func.isRequired,
    overallDiscount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    setOverallDiscount: PropTypes.func.isRequired,
    transport: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    setTransport: PropTypes.func.isRequired,
    grandTotal: PropTypes.func.isRequired,
  }).isRequired,
};
export default MemoTable;
