"use client";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "jspdf-autotable";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import MemoForm from "./MemoForm";
import MemoTable from "./MemoTable";
import { exportExcel, exportPDF } from "./exportUtils";

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
  // Form props to pass down
  const formProps = {
    product,
    editId,
    handleChange,
    handleSave,
    resetForm,
  };

  // Footer summary & table props to pass down
  const tableProps = {
    memos,
    calculateAmount,
    handleEdit,
    handleDelete,
    footerProps: {
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
    },
  };
  const totals = {
    totalAmount,
    prevDue,
    paidAmount,
    overallDiscount,
    transport,
    grandTotal,
  };

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Memo Management</h1>
      <ConfirmDialog />
      <MemoForm {...formProps} />
      <div className="card">
        <div className="flex gap-2 mb-2">
          <Button
            label="Export to Excel"
            icon="pi pi-file-excel"
            className="p-button-success"
            onClick={() => exportExcel(memos, calculateAmount)}
          />
          <Button
            label="Export to PDF"
            icon="pi pi-file-pdf"
            className="p-button-danger"
            onClick={() => exportPDF(memos, calculateAmount, totals)}
          />
        </div>
        <MemoTable {...tableProps} />
      </div>
    </div>
  );
};

export default Memo;
