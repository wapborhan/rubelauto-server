import { useEffect, useRef, useState } from "react";
import useProdType from "../../hooks/data/useProdType";
import { Dropdown } from "primereact/dropdown";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useSingleProduct from "../../hooks/usesingleProduct";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import { Toast } from "primereact/toast";

const EditProduct = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [singleProduct, refetch, isLoading, isPending] = useSingleProduct(id);
  const [proTypeList] = useProdType();
  const [prodType, setProdType] = useState();

  useEffect(() => {
    refetch();
  }, []);

  const [brandImg, setBrandImg] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sku, setSku] = useState("");
  const [modelImg, setModelImg] = useState("");
  const [modelName, setModelName] = useState("");
  const [cashPrice, setCashPrice] = useState("");
  const [creditPrice, setCreditPrice] = useState("");

  useEffect(() => {
    if (singleProduct) {
      setBrandImg(singleProduct.brandImg || "");
      setBrandName(singleProduct.brandName || "");
      setSku(singleProduct.sku || "");
      setModelImg(singleProduct.modelImg || "");
      setModelName(singleProduct.modelName || "");
      setCashPrice(singleProduct.cashPrice || "");
      setCreditPrice(singleProduct.creditPrice || "");
      setProdType(
        proTypeList.find((type) => type.sku === singleProduct.typeCode),
      );
    }
  }, [singleProduct]);

  // console.log(singleProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const brandImg = form.brandImg.value;
    const brandName = form.brandName.value;
    const modelImg = form.modelImg.value;
    const modelName = form.modelName.value;
    const cashPrice = form.cashPrice.value;
    const creditPrice = form.creditPrice.value;
    const typeCode = prodType?.name === undefined
      ? singleProduct?.typeCode
      : prodType?.sku;
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

    axiosPublic.patch(`/product/${id}`, inputData).then((res) => {
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Product Updated",
        });
        setTimeout(() => {
          navigate("/products/view");
        }, 3000);
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

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
                    defaultValue={brandImg}
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
                    defaultValue={brandName}
                    placeholder="Enter Brand Name"
                    className="input input-bordered w-full"
                    // required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label flex justify-between">
                    <span className="label-text font-bold">Type Code</span>{" "}
                    <b className=" text-red-500">
                      {prodType?.sku === undefined
                        ? singleProduct?.typeCode
                        : prodType?.name}
                    </b>
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
                    defaultValue={sku}
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
                    defaultValue={modelImg}
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
                    defaultValue={modelName}
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
                    defaultValue={cashPrice}
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
                    defaultValue={creditPrice}
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
