import ExportCSV from "./ExportCSV";
import ExportExcel from "./ExportExcel";
import ExportPDF from "./ExportPDF";

const ExportButtons = ({ dt, state }) => {
  return (
    <>
      <ExportCSV dt={dt} />
      <ExportExcel product={state} />
      <ExportPDF product={state} />
    </>
  );
};

export default ExportButtons;
