import { useRef } from "react";
import { Toast } from "primereact/toast";

const ProductDelete = ({ id, onDelete }) => {
  const toast = useRef(null);
  return (
    <>
      <Toast ref={toast} />
      <button
        onClick={() => onDelete(id)}
        className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline custom-tooltip cursor-pointer"
        data-pr-tooltip="Seized Back"
        data-pr-position="top"
      >
        <i className="pi pi-trash"></i>
      </button>
    </>
  );
};

export default ProductDelete;
