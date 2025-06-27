import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportExcel = (memos, calculateAmount) => {
  const exportData = memos.map((item) => ({
    ...item,
    amount: calculateAmount(item),
  }));
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Memos");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "memo_list.xlsx");
};

export const exportPDF = (memos, calculateAmount, totals) => {
  const doc = new jsPDF();
  doc.text("Memo List", 14, 14);
  doc.setFontSize(10);
  doc.text(`Transport: ${totals.transport}`, 14, 22);
  doc.text(`Discount: ${totals.overallDiscount}`, 60, 22);
  doc.text(`Previous Due: ${totals.prevDue}`, 110, 22);
  doc.text(`Paid Amount: ${totals.paidAmount}`, 160, 22);

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
    tableRows.push([
      item.name,
      item.model,
      item.company,
      item.quantity,
      item.rate,
      item.discount,
      calculateAmount(item),
    ]);
  });

  doc.autoTable({ head: [tableColumn], body: tableRows, startY: 34 });
  const finalY = doc.lastAutoTable.finalY || 34;
  doc.text(`Total Amount: ${totals.totalAmount()}`, 14, finalY + 8);
  doc.text(`Grand Total: ${totals.grandTotal()}`, 110, finalY + 8);
  doc.save("memo_list.pdf");
};
