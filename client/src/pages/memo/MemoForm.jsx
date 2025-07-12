import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useEffect } from "react";

const MemoForm = ({ onSave, editProduct, resetEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      partNo: "",
      model: "",
      company: "",
      quantity: 0,
      unitType: "",
      rate: 0,
      discount: 0,
    },
  });

  // if editProduct changes, pre-fill form
  useEffect(() => {
    if (editProduct) {
      for (const key in editProduct) {
        setValue(key, editProduct[key]);
      }
    } else {
      reset();
    }
  }, [editProduct]);

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 items-end"
    >
      <div className="flex gap-5 justify-between w-full">
        {/* Product Name */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>
              Product Name <span className="text-red-500">*</span>
            </div>
            {errors.description && (
              <small className="text-red-500">
                {errors.description.message}
              </small>
            )}
          </label>
          <input
            type="text"
            {...register("description", { required: "Required" })}
            className="border p-2 rounded"
          />
        </div>

        {/* Part No */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>Part No.</div>
          </label>
          <input
            type="text"
            {...register("partNo")}
            className="border p-2 rounded"
          />
        </div>

        {/* Model */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>Model</div>
          </label>
          <select {...register("model")} className="border p-2 rounded">
            <option value="">Select Model</option>
            <option value="Pulser 150">Pulser 150</option>
            <option value="Dayang 80">Dayang 80</option>
          </select>
        </div>

        {/* Company */}
        <div className="flex flex-col w-full">
          <label>Company</label>
          <select {...register("company")} className="border p-2 rounded">
            <option value="">Select Company</option>
            <option value="CRLF">CRLF</option>
            <option value="Rolon">Rolon</option>
          </select>
        </div>
      </div>
      <div className="flex gap-5 justify-between w-full">
        {" "}
        {/* Quantity + Unit Type */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>
              Qty <span className="text-red-500">*</span>
            </div>
            {errors.quantity && (
              <small className="text-red-500">{errors.quantity.message}</small>
            )}{" "}
            {errors.unitType && (
              <small className="text-red-500 mt-1">
                {errors.unitType.message}
              </small>
            )}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: 1,
              })}
              className="border p-2 rounded w-full"
            />
            <select
              {...register("unitType", {
                required: "Unit Type is required",
              })}
              className="border p-2 rounded"
            >
              <option value="">Unit Type</option>
              <option value="pcs">PCS</option>
              <option value="Set">Set</option>
              <option value="cartoon">Cartoon</option>
              <option value="box">Box</option>
              <option value="dozen">Dozen</option>
            </select>
          </div>
        </div>
        {/* Rate */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>
              Rate <span className="text-red-500">*</span>
            </div>
            {errors.rate && (
              <small className="text-red-500">{errors.rate.message}</small>
            )}
          </label>
          <input
            type="number"
            {...register("rate", { required: "Rate is required", min: 1 })}
            className="border p-2 rounded w-full"
          />
        </div>
        {/* Discount */}
        <div className="flex flex-col w-full">
          <label className="flex justify-between">
            <div>Discount %</div>
          </label>
          <input
            type="number"
            {...register("discount")}
            className="border p-2 rounded w-full"
          />
        </div>
        {/* Buttons */}
        <div className="flex gap-2 items-end w-full">
          <Button
            type="submit"
            label={editProduct ? "Update" : "Save"}
            className="p-button-success w-full"
          />
          {editProduct && (
            <Button
              type="button"
              label="Cancel"
              onClick={() => {
                reset();
                resetEdit();
              }}
              className="p-button-secondary w-full"
            />
          )}
        </div>
      </div>
    </form>
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
    unitType: PropTypes.string.isRequired,
  }).isRequired,
  editId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editProduct: PropTypes.object,
  resetEdit: PropTypes.func.isRequired,
};

export default MemoForm;
