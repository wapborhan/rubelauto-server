import { Button } from "primereact/button";
import PropTypes from "prop-types";

const MemoForm = ({ product, editId, handleChange, handleSave, resetForm }) => {
  return (
    <div className="flex flex-nowrap gap-4 items-end">
      <div className="flex flex-col">
        <label htmlFor="description">Product Name</label>
        <input
          type="text"
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="partNo">Part No.</label>
        <input
          type="text"
          id="partNo"
          name="partNo"
          value={product.partNo}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="model">Model</label>
        <select
          id="model"
          name="model"
          value={product.model}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Model</option>
          <option value="Pulser 150">Pulser 150</option>
          <option value="Dayang 80">Dayang 80</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="company">Company</label>
        <select
          id="company"
          name="company"
          value={product.company}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Company</option>
          <option value="CRLF">CRLF</option>
          <option value="Rolon">Rolon</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity">Qty</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="border p-2 rounded w-20"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rate">Rate</label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={product.rate}
          onChange={handleChange}
          className="border p-2 rounded w-24"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="discount">Disc %</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={product.discount}
          onChange={handleChange}
          className="border p-2 rounded w-24"
        />
      </div>

      <div className="flex gap-2 items-end">
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
    </div>
  );
};

MemoForm.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string.isRequired,
    partNo: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
    rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      .isRequired,
  }).isRequired,
  editId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default MemoForm;
