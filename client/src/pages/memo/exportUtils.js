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

  const tableColumn = [
    "Product Name",
    "Part No.",
    "Model",
    "Brand",
    "Qty",
    "Rate",
    "Disc (%)",
    "Amount",
  ];

  const tableRows = memos.map((item) => [
    item.description,
    item.partNo,
    item.model,
    item.company,
    item.quantity,
    item.rate,
    item.discount,
    calculateAmount(item),
  ]);

  // Product table
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  // Footer totals table
  const footerData = [
    ["Total Amount:", totals.totalAmount().toFixed(2)],
    ["Previous Due:", totals.prevDue.toString()],
    ["Paid Amount:", totals.paidAmount.toString()],
    ["Overall Discount:", totals.overallDiscount.toString()],
    ["Transport:", totals.transport.toString()],
    ["Grand Total:", totals.grandTotal().toFixed(2)],
  ];

  doc.autoTable({
    // margin: { left: 100 },
    theme: "grid",
    body: footerData,
    styles: { fontStyle: "bold" },
    headStyles: { fillColor: [240, 240, 240] },
    columnStyles: {
      0: { cellWidth: 100, halign: "right" },
    },
  });

  doc.save("memo_list.pdf");
};
