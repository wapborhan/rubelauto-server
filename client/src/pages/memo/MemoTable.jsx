import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { InputText } from "primereact/inputtext";

const MemoTable = ({
  memos,
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
    <ColumnGroup>
      <Row>
        <Column
          footer="Total Amount:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalAmount().toFixed(2)} />
      </Row>
      <Row>
        <Column
          footer="Previous Due:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={prevDue}
              onChange={(e) => setPrevDue(Number(e.target.value))}
              className="p-inputtext-sm w-5/12"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Paid Amount:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="p-inputtext-sm w-5/12"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Overall Discount:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={overallDiscount}
              onChange={(e) => setOverallDiscount(Number(e.target.value))}
              className="p-inputtext-sm w-5/12"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Transport:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column
          footer={
            <InputText
              value={transport}
              onChange={(e) => setTransport(Number(e.target.value))}
              className="p-inputtext-sm w-5/12"
            />
          }
        />
      </Row>
      <Row>
        <Column
          footer="Grand Total:"
          colSpan={6}
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
      <Column field="name" header="Product Name" style={{ minWidth: "5rem" }} />
      <Column field="model" header="Model" />
      <Column field="company" header="Company" />
      <Column field="quantity" header="Qty" />
      <Column field="rate" header="Rate" />
      <Column field="discount" header="Disc (%)" />
      <Column
        header="Amount"
        body={(rowData) => calculateAmount(rowData).toFixed(2)}
      />
      <Column
        header="Actions"
        body={(rowData) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-info p-button-sm !py-2"
              style={{
                padding: "0.25rem !important",
              }}
              onClick={() => handleEdit(rowData.id)}
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger p-button-sm !py-2"
              style={{
                padding: "0.25rem !important",
              }}
              onClick={() => handleDelete(rowData.id)}
            />
          </div>
        )}
      />
    </DataTable>
  );
};

export default MemoTable;
