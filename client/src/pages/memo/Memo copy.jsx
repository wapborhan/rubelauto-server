"use client";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Row } from "primereact/row";
import { ColumnGroup } from "primereact/columngroup";
import { InputText } from "primereact/inputtext";

const Memo = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    model: "",
    company: "",
    quantity: 0,
    rate: 0,
    discount: 0,
  });
  const [memos, setMemos] = useState([]);
  const [editId, setEditId] = useState(null);

  const [transport, setTransport] = useState(0);
  const [overallDiscount, setOverallDiscount] = useState(0);
  const [prevDue, setPrevDue] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedMemos = JSON.parse(localStorage.getItem("memos") || "[]");
    setMemos(savedMemos);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "rate" || name === "discount"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = () => {
    if (!product.name || !product.model || !product.company) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updated = memos.map((item) =>
        item.id === editId ? { ...product, id: editId } : item
      );
      setMemos(updated);
      localStorage.setItem("memos", JSON.stringify(updated));
      setEditId(null);
    } else {
      const newProduct = { ...product, id: Date.now().toString() };
      const updated = [...memos, newProduct];
      setMemos(updated);
      localStorage.setItem("memos", JSON.stringify(updated));
    }

    resetForm();
  };

  const handleDelete = (id) => {
    confirmDialog({
      message: "Are you sure you want to delete this memo?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const updated = memos.filter((item) => item.id !== id);
        setMemos(updated);
        localStorage.setItem("memos", JSON.stringify(updated));
      },
    });
  };

  const handleEdit = (id) => {
    const selected = memos.find((item) => item.id === id);
    if (selected) {
      setProduct(selected);
      setEditId(id);
    }
  };

  const resetForm = () => {
    setProduct({
      id: "",
      name: "",
      model: "",
      company: "",
      quantity: 0,
      rate: 0,
      discount: 0,
    });
    setEditId(null);
  };

  const exportExcel = () => {
    const exportData = memos.map((item) => ({
      ...item,
      amount: calculateAmount(item),
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Memos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "memo_list.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Memo List", 14, 14);

    doc.setFontSize(10);
    doc.text(`Transport: ${transport}`, 14, 22);
    doc.text(`Discount: ${overallDiscount}`, 60, 22);
    doc.text(`Previous Due: ${prevDue}`, 110, 22);
    doc.text(`Paid Amount: ${paidAmount}`, 160, 22);
    doc.text(`Notes: ${notes}`, 14, 28);

    const tableColumn = [
      "Product Name",
      "Model",
      "Company",
      "Qty",
      "Rate",
      "Disc (%)",
      "Amount",
    ];
    const tableRows = [];

    memos.forEach((item) => {
      const rowData = [
        item.name,
        item.model,
        item.company,
        item.quantity,
        item.rate,
        item.discount,
        calculateAmount(item),
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 34,
    });

    const finalY = doc.lastAutoTable.finalY || 34;
    doc.text(`Total Amount: ${totalAmount()}`, 14, finalY + 8);
    doc.text(`Grand Total: ${grandTotal()}`, 110, finalY + 8);

    doc.save("memo_list.pdf");
  };

  const calculateAmount = (item) => {
    const subtotal = item.quantity * item.rate;
    const discountValue = (subtotal * item.discount) / 100;
    return subtotal - discountValue;
  };

  const totalAmount = () => {
    return memos.reduce((sum, item) => sum + calculateAmount(item), 0);
  };

  const grandTotal = () => {
    return (
      totalAmount() +
      Number(prevDue) -
      Number(paidAmount) -
      Number(overallDiscount) +
      Number(transport)
    );
  };

  // Footer group for summary rows
  const footerGroup = (
    <ColumnGroup>
      {/* Total Amount */}
      <Row>
        <Column
          footer="Total Amount:"
          colSpan={6}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={totalAmount().toFixed(2)} />
      </Row>

      {/* Previous Due */}
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
              className="p-inputtext-sm w-full"
            />
          }
        />
      </Row>

      {/* Paid Amount */}
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
              className="p-inputtext-sm w-full"
            />
          }
        />
      </Row>

      {/* Overall Discount */}
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
              className="p-inputtext-sm w-full"
            />
          }
        />
      </Row>
      {/* Transport */}
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
              className="p-inputtext-sm w-full"
            />
          }
        />
      </Row>

      {/* Grand Total */}
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
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Memo Management</h1>

      <ConfirmDialog />

      {/* Form */}
      <div className="flex flex-wrap gap-3 items-end">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="model"
          value={product.model}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Model</option>
          <option value="Model A">Model A</option>
          <option value="Model B">Model B</option>
        </select>
        <select
          name="company"
          value={product.company}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Company</option>
          <option value="Company X">Company X</option>
          <option value="Company Y">Company Y</option>
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Qty"
          value={product.quantity}
          onChange={handleChange}
          className="border p-2 rounded w-20"
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={product.rate}
          onChange={handleChange}
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          name="discount"
          placeholder="Disc %"
          value={product.discount}
          onChange={handleChange}
          className="border p-2 rounded w-24"
        />
        <Button
          label={editId ? "Update" : "Save"}
          onClick={handleSave}
          className="p-button-success"
        />
        {editId && (
          <Button
            label="Cancel"
            onClick={resetForm}
            className="p-button-secondary"
          />
        )}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex gap-2 mb-2">
          <Button
            label="Export to Excel"
            icon="pi pi-file-excel"
            className="p-button-success"
            onClick={exportExcel}
          />
          <Button
            label="Export to PDF"
            icon="pi pi-file-pdf"
            className="p-button-danger"
            onClick={exportPDF}
          />
        </div>

        <DataTable
          value={memos}
          paginator
          rows={5}
          stripedRows
          footerColumnGroup={footerGroup}
        >
          <Column field="name" header="Product Name" />
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
                  className="p-button-rounded p-button-info p-button-sm"
                  onClick={() => handleEdit(rowData.id)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger p-button-sm"
                  onClick={() => handleDelete(rowData.id)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Memo;
