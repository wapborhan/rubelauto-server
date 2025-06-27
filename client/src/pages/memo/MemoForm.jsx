import { Button } from "primereact/button";

const MemoForm = ({ product, editId, handleChange, handleSave, resetForm }) => {
  return (
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
  );
};

export default MemoForm;
