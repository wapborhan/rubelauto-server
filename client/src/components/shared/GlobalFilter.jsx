import { InputText } from "primereact/inputtext";
import { useState } from "react";

const GlobalFilter = ({ filters, setFilters }) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  return (
    <div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="input input-border border-2 pl-10 border-slate-200"
        />
      </span>
    </div>
  );
};

export default GlobalFilter;
