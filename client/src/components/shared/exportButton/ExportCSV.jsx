import { Button } from "primereact/button";

const ExportCSV = ({ dt, customers }) => {
  const exportCSV = () => {
    if (!customers || customers.length === 0) {
      console.warn("No customer data to export.");
      return;
    }

    // Define CSV header and rows
    const headers = Object.keys(customers[0]).join(","); // Get the keys as headers
    const rows = customers.map((customer) => Object.values(customer).join(","));

    // Combine headers and rows into a CSV string
    const csvContent = [headers, ...rows].join("\n");

    // Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a link to download the file
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      type="button"
      label="CSV"
      icon="pi pi-file"
      rounded
      className="p-badge-danger border-2 !bg-[#198754] px-4 py-2 text-white"
      // onClick={() => exportCSV(false)}
      onClick={exportCSV}
      data-pr-tooltip="CSV"
    />
  );
};

export default ExportCSV;
