import { Button } from "primereact/button";
import React from "react";

const headDes = (
  <>
    <div className="name text-center text-red-600">
      <h1>Rubel Auto</h1>
    </div>
  </>
);

const ExportPDF = ({ product }) => {
  const cols = [
    { field: "brandName", header: "Brand" },
    { field: "modelName", header: "Model" },
    { field: "cashPrice", header: "Cash Price" },
    { field: "creditPrice", header: "Credit Price" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.setTextColor(255, 0, 0); // Set text color to red
        doc.setFontSize(16);
        doc.text("Rubel Auto", doc.internal.pageSize.getWidth() / 2, 10, {
          align: "center",
        });

        doc.autoTable(exportColumns, product);
        doc.save("products.pdf");
      });
    });
  };
  return (
    <Button
      type="button"
      icon="pi pi-file-pdf"
      severity="warning"
      rounded
      label="PDF"
      onClick={exportPdf}
      data-pr-tooltip="PDF"
      className="p-badge-danger border-2 !bg-[#198754] px-4 py-2 text-white"
    />
  );
};

export default ExportPDF;
