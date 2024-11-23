import { Dropdown } from "primereact/dropdown";
import { useRef, useState } from "react";
import DatePick from "../../components/shared/DatePick";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Toast } from "primereact/toast";
import { useGetproductQuery } from "../../redux/feature/api/productApi";
import { useGetShowroomQuery } from "../../redux/feature/api/showroomApi";

const AddPurchase = () => {
  const toast = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { data: product } = useGetproductQuery();
  const { data: allShowroom } = useGetShowroomQuery();

  //
  const [receivedDate, setReceivedDate] = useState(new Date());
  const [productInfo, setProductInfo] = useState(null);
  const [showroom, setShowroom] = useState(null);
  const [stock, setStock] = useState();
  const [stockStat, setStockStat] = useState();
  const stocks = [
    { name: "Rubel Auto", code: "RA" },
    { name: "Runner Automobiles PLC", code: "RAL" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const modelCode = productInfo?.sku;
    const brandName = productInfo?.brandName;
    const modelName = productInfo?.modelName;
    const categories = productInfo?.typeCode;
    const stockStatus = stockStat?.name;
    const showroomName = showroom.name;
    const showroomCode = showroom.code;
    const engine = form.engine.value;
    const chassis = form.chassis.value;
    const color = form.color.value;

    const inputData = {
      stockStatus,
      receivedDate,
      categories,
      modelCode,
      brandName,
      modelName,
      engine,
      chassis,
      color,
      stock: stock?.code,
      showroomName,
      showroomCode,
    };
    // console.log(inputData);

    axiosPublic
      .post("/stock", inputData)
      .then((res) => {
        if (res.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Product adde success.",
            life: 3000,
          });
          // form.reset();
        }
      })
      .catch((err) => {
        console.error(err.response.data.message);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.response.data.message,
          life: 3000,
        });
      });
  };
  return (
    <div className="addstock">
      <Toast ref={toast} />
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <div className="content space-y-5">
          <h2 className="text-center text-3xl mb-10">Add Purchase</h2>
        </div>
        <fieldset>
          <legend>Add Stock</legend>
          <form onSubmit={handleSubmit}>
            <div className="form space-y-5">
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Stock</span>
                  </label>
                  <Dropdown
                    value={stockStat}
                    onChange={(e) => setStockStat(e.value)}
                    options={[{ name: "New" }, { name: "Old" }]}
                    optionLabel="name"
                    placeholder="Stock Status"
                    className="w-full md:w-14rem border-2"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Received Date</span>
                  </label>
                  <DatePick
                    dateValue={receivedDate}
                    setDateValue={setReceivedDate}
                    iconShow={false}
                    endDate={9999}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Showroom</span>
                  </label>
                  <Dropdown
                    value={showroom}
                    onChange={(e) => setShowroom(e.value)}
                    options={allShowroom}
                    optionLabel="name"
                    placeholder="Showroom"
                    className="w-full md:w-14rem border-2"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Stock</span>
                  </label>
                  <Dropdown
                    value={stock}
                    onChange={(e) => setStock(e.value)}
                    options={stocks}
                    optionLabel="name"
                    placeholder="Select Stock"
                    className="w-full md:w-14rem border-2"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Color</span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    placeholder="Enter Product Color"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap justify-between">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Product</span>
                  </label>
                  <SearchAbleDropDown
                    state={productInfo}
                    setState={setProductInfo}
                    data={product?.data}
                    requir={true}
                    config={{
                      optLabel: "modelName",
                      placeHolder: "Select Model",
                    }}
                    // disable={!upazila}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Engine NO.</span>
                  </label>
                  <input
                    type="text"
                    name="engine"
                    placeholder="Enter Procuct Engine"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Chassis NO.</span>
                  </label>
                  <input
                    type="text"
                    name="chassis"
                    placeholder="Enter Product Chassis"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <div className="submit">
                <input
                  type="submit"
                  value="Add Stock"
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

export default AddPurchase;
