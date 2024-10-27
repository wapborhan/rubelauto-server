import { Button } from "primereact/button";

const ExportCSV = ({ dt }) => {
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  return (
    <Button
      type="button"
      label="CSV"
      icon="pi pi-file"
      rounded
      className="p-badge-danger border-2 !bg-[#ff4646] px-4 py-2 text-white"
      onClick={() => exportCSV(false)}
      data-pr-tooltip="CSV"
    />
  );
};

export default ExportCSV;
