import { useState } from "react";
import useProdType from "../../hooks/data/useProdType";
import { Dropdown } from "primereact/dropdown";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const EditProduct = () => {
  const axiosPublic = useAxiosPublic();
  const [proTypeList] = useProdType();
  const [prodType, setProdType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const brandImg = form.brandImg.value;
    const brandName = form.brandName.value;
    const modelImg = form.modelImg.value;
    const modelName = form.modelName.value;
    const cashPrice = form.cashPrice.value;
    const creditPrice = form.creditPrice.value;
    const typeCode = prodType.sku;
    const sku = form.sku.value;

    const inputData = {
      brandImg,
      brandName,
      modelImg,
      modelName,
      cashPrice,
      creditPrice,
      typeCode,
      sku,
    };
    console.log(inputData);

    // axiosPublic.post("/product", inputData).then((res) => {
    //   if (res.status === 200) {
    //     alert("Product Added.");
    //     // reset();
    //     // Swal.fire({
    //     //   position: "top-end",
    //     //   icon: "success",
    //     //   title: "Meals Added Sucessfull.",
    //     //   showConfirmButton: false,
    //     //   timer: 1500,
    //     // });
    //   }
    // });
  };
  return (
    <div className="addProduct">
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <div className="content space-y-5">
          <h2 className="text-center text-3xl mb-10">Update Product</h2>
        </div>

        <fieldset>
          <legend>Edit Product</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Brand Image URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="brandImg"
                    placeholder="Enter Brand Image URL"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Brand Name</span>
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    placeholder="Enter Brand Name"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Type Code</span>
                  </label>
                  <Dropdown
                    value={prodType}
                    onChange={(e) => setProdType(e.value)}
                    options={proTypeList}
                    optionLabel="name"
                    placeholder="Product Type Code"
                    className="w-full md:w-14rem border-2"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">SKU</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Enter Product SKU"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
              </div>

              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      Product Model Image URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="modelImg"
                    placeholder="Enter Customer Village"
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="modelName"
                    placeholder="Enter Product Name"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Cash Price</span>
                  </label>
                  <input
                    type="number"
                    name="cashPrice"
                    placeholder="Enter Product Price"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Credit Price</span>
                  </label>
                  <input
                    type="number"
                    name="creditPrice"
                    placeholder="Enter Product Price"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  value="Update Product"
                  className="rounded-lg font-h2 mt-4 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
                />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default EditProduct;
