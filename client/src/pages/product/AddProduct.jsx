import { useEffect, useRef, useState } from "react";
import useProdType from "../../hooks/data/useProdType";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";
import { useGetSupplierQuery } from "../../redux/feature/api/supplierApi";
import { useSetproductMutation } from "../../redux/feature/api/productApi";
import SubmitButton from "../../components/SubmitButton";

const AddProduct = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [proTypeList] = useProdType();
  const { data: allSuplier } = useGetSupplierQuery();
  const [setPost, { isSuccess, isError, error }] = useSetproductMutation();
  const [prodType, setProdType] = useState(null);
  const [suplier, setSuplier] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const modelImg = form.modelImg.value;
    const modelName = form.modelName.value;
    const cashPrice = form.cashPrice.value;
    const creditPrice = form.creditPrice.value;
    const typeCode = prodType.sku;
    const sku = form.sku.value;

    const inputData = {
      brandName: suplier?.bssName,
      brandImg: suplier?.bssLogoUrl,
      modelImg,
      modelName,
      cashPrice,
      creditPrice,
      typeCode,
      sku,
    };
    // console.log(inputData);
    setPost(inputData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: "Product Added",
      });
      setTimeout(() => {
        navigate("/products/view");
      }, 3000);
      // form.reset();
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.current.show({
        severity: "info",
        summary: "Info",
        detail: error || "Error adding Product.",
      });
    }
  }, [isError, error]);

  return (
    <div className="addProduct">
      <Toast
        ref={toast}
        pt={{
          message: ({ index }) => ({
            className: `bg-yellow-${((index > 5 && 5) || index || 1) * 100}`,
          }),
        }}
      />
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <div className="content space-y-5">
          <h2 className="text-center text-3xl mb-10">পণ্য যোগ করুন</h2>
        </div>

        <fieldset>
          <legend>পণ্য</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="frist flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">সরবরাহকারী</span>
                  </label>
                  <SearchAbleDropDown
                    state={suplier}
                    setState={setSuplier}
                    data={allSuplier?.data}
                    requir={true}
                    config={{
                      optLabel: "bssName",
                      placeHolder: "সরবরাহকারী নির্বাচন করুন",
                    }}
                    // disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">পণ্য ধরন</span>
                  </label>
                  <Dropdown
                    value={prodType}
                    onChange={(e) => setProdType(e.value)}
                    options={proTypeList}
                    optionLabel="name"
                    placeholder="পণ্য ধরন কোড"
                    className="w-full md:w-14rem border-2"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">
                      পণ্য মডেল ইমেজ URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="modelImg"
                    placeholder="পণ্য মডেল ইমেজ URL"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">SKU</span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Product SKU"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">পণ্য নাম</span>
                  </label>
                  <input
                    type="text"
                    name="modelName"
                    placeholder="পণ্য নাম"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">নগদ মূল্য</span>
                  </label>
                  <input
                    type="number"
                    name="cashPrice"
                    placeholder="নগদ মূল্য"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">কিস্তি মূল্য</span>
                  </label>
                  <input
                    type="number"
                    name="creditPrice"
                    placeholder="কিস্তি মূল্য"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
              </div>

              <div className="submit">
                <SubmitButton name="পণ্য যোগ করুন" />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default AddProduct;
