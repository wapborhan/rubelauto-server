import { Dropdown } from "primereact/dropdown";
import { useEffect, useRef, useState } from "react";
import DatePick from "../../components/shared/DatePick";
import useLeads from "../../hooks/useLeads";
import useShowroom from "../../hooks/useShowroom";
import useProdType from "../../hooks/data/useProdType";
import useProduct from "../../hooks/useProduct";
import useStock from "../../hooks/useStock";
import SearchAbleDropDown from "../../components/shared/SearchAbleDropDown";
import { Toast } from "primereact/toast";

const SaleForm = ({ status, postData }) => {
  const toast = useRef(null);
  const [showroom, setShowroom] = useState(null);

  const [customerInfo, setCustomerInfo] = useState(null);
  const [saledate, setSaleDate] = useState(new Date());
  const [insdate, setInsdate] = useState(null);
  const [conddate, setConddate] = useState(null);

  //
  const [productType, setProductType] = useState(null);
  const [model, setModel] = useState(null);
  const [selectedEnCn, setSelectedEnCn] = useState(null);
  const [priceSale, setPriceSale] = useState("");
  const [saleprice, setSaleprice] = useState("");
  const [proCond, setProCond] = useState("");
  //

  const price =
    status === "cash" ? priceSale?.cashPrice : priceSale?.creditPrice;

  //
  const [leads] = useLeads();
  // const [showrooms] = useShowroom();
  const [allShowroom] = useShowroom();
  const [proTypeList] = useProdType();
  const [product] = useProduct();
  const [stock] = useStock();
  const condtionList = [{ cond: "New" }, { cond: "Resale" }];
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const cardno = form.cardno.value;
    const productCond = proCond?.cond;
    const showRoom = showroom?.name;
    const models = model?.modelName;
    const type = productType?.name;
    const engine = selectedEnCn?.engine;
    const color = selectedEnCn?.color;
    const chassis = selectedEnCn?.chassis;
    const dpamount = form.dpamount.value;
    const term = status === "cash" ? null : form.term.value;
    const percentage = status === "cash" ? null : form.percentage.value;
    const hirevalue = status === "cash" ? null : form.hireprice.value;
    const insamount = status === "cash" ? null : form.insamount.value;
    const condamount = status === "cash" ? null : form.condamount.value;
    const cardSts = {
      type: status === "cash" ? "paid" : "running",
      staff: null,
      paidDate: status === "cash" ? new Date() : null,
      paidDiscount: null,
      seizedDate: null,
      seizedCost: 0,
      docStatus: null,
      docDate: null,
      coments: null,
    };
    const agrefee = form.agrefee.value;

    // if (saleprice !== dpamount) {
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Status",
    //     detail: `Downpayment and the price must be the same as Cash Sale.`,
    //   });
    //   return;
    // }

    const inputData = {
      saleStatus: status,
      saledate,
      productCond,
      cardno,
      showRoom,
      cardStatus: cardSts,
      customerInfo,
      leadsId: customerInfo?._id,
      productInfo: { type, models, engine, chassis, color },
      accountInfo: {
        saleprice,
        dpamount,
        term,
        percentage,
        insdate,
        hireprice: hirevalue - saleprice,
        insamount,
        conddate,
        condamount,
        agrefee,
      },

      installment: {},
    };
    postData(inputData);
    // console.log(inputData);
  };

  // Filter product based on the type
  const filteredModel = productType
    ? product.filter((model) => model.typeCode === productType.sku)
    : [];

  // Filter stock based on the sku
  const filteredDistricts = model
    ? stock.filter((district) => district.modelCode === model.sku)
    : [];
  return (
    <div className="addsale">
      <Toast ref={toast}></Toast>
      <div className="back">{/* <BackToHomePage /> */}</div>
      <div className="sect  py-4 w-full mx-auto">
        <div className="content space-y-5">
          <h2 className="text-center text-3xl capitalize">{status} Sale</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form">
            <fieldset className="mb-4">
              <legend>Customer Info</legend>
              <div className="start flex gap-5 lg:flex-nowrap flex-wrap justify-between mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Sale Date</span>
                  </label>
                  <DatePick
                    dateValue={saledate}
                    setDateValue={setSaleDate}
                    iconShow={false}
                    endDate={9999}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Condition</span>
                  </label>
                  <Dropdown
                    value={proCond}
                    onChange={(e) => setProCond(e.value)}
                    options={condtionList}
                    optionLabel="cond"
                    placeholder="Condition"
                    className="w-full md:w-14rem border-2"
                    required={true}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Show Room</span>
                  </label>
                  <SearchAbleDropDown
                    state={showroom}
                    setState={setShowroom}
                    data={allShowroom}
                    requir={true}
                    config={{
                      optLabel: "name",
                      placeHolder: "Showroom",
                    }}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Card Number</span>
                  </label>
                  <input
                    type="text"
                    name="cardno"
                    placeholder="Enter Card Number"
                    className="input input-bordered w-full"
                    required={true}
                  />
                </div>
              </div>
              <div className="start flex gap-5 lg:flex-nowrap flex-wrap  justify-between mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Customer</span>
                  </label>
                  <SearchAbleDropDown
                    state={customerInfo}
                    setState={setCustomerInfo}
                    data={leads}
                    requir={true}
                    config={{
                      optLabel: "name",
                      placeHolder: "Select Customer",
                    }}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Mobile Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    className="input input-bordered w-full"
                    value={customerInfo?.number}
                    disabled
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">C/O Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="C/O Name"
                    className="input input-bordered w-full"
                    value={customerInfo?.coname}
                    disabled
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input input-bordered w-full"
                    value={customerInfo?.address}
                    disabled
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="mb-4">
              <legend>Product Info</legend>
              <div className="second flex gap-5 lg:flex-nowrap flex-wrap  justify-between mb-8">
                <div className="form-control w-6/12">
                  <label className="label">
                    <span className="label-text font-bold">Product Type</span>
                  </label>
                  <Dropdown
                    value={productType}
                    onChange={(e) => setProductType(e.value)}
                    options={proTypeList}
                    optionLabel="name"
                    placeholder="Product Type"
                    className="w-full md:w-14rem border-2"
                    required={true}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Model</span>
                  </label>
                  <Dropdown
                    value={model}
                    onChange={(e) => {
                      setModel(e.value);
                      setPriceSale(e.target.value);
                    }}
                    options={filteredModel}
                    optionLabel="modelName"
                    placeholder="Select Model"
                    className="w-full md:w-14rem border-2"
                    disabled={!productType}
                    required={true}
                  />
                  {/* <Dropdown
                    value={model}
                    onChange={(e) => {
                      const { value } = e;
                      const { cashPrice } = e.target.value;
                      setModel(value);
                      setPriceSale(cashPrice || null);
                    }}
                    options={filteredModel}
                    optionLabel="modelName"
                    placeholder="Select Model"
                    className="w-full md:w-14rem border-2"
                    disabled={!productType}
                    required={true}
                  /> */}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Engine No.</span>
                  </label>

                  <SearchAbleDropDown
                    state={selectedEnCn}
                    setState={setSelectedEnCn}
                    data={filteredDistricts}
                    requir={true}
                    config={{
                      optLabel: "engine",
                      placeHolder: "Select a Engine No.",
                    }}
                    disable={!model}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Chassis No.</span>
                  </label>
                  <SearchAbleDropDown
                    state={selectedEnCn}
                    setState={setSelectedEnCn}
                    data={filteredDistricts}
                    requir={true}
                    config={{
                      optLabel: "chassis",
                      placeHolder: "Select a Chassis No.",
                    }}
                    disable={!model}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="mb-4">
              <legend>Sale Info</legend>
              <div className="third flex gap-5 lg:flex-nowrap flex-wrap  justify-between mb-8">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Sale Price</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={price}
                    name="saleprice"
                    placeholder="Enter Sale Price"
                    className="input input-bordered w-full"
                    onChange={(e) => setSaleprice(e.target.value)}
                    disabled={!model}
                    required={true}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Down Payment</span>
                  </label>
                  <input
                    type="number"
                    name="dpamount"
                    placeholder="Enter Down Payment"
                    className="input input-bordered w-full"
                    required={true}
                  />
                </div>
                {status === "cash" ? (
                  <></>
                ) : (
                  <>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Terms</span>
                      </label>
                      <input
                        type="number"
                        name="term"
                        placeholder="Enter Terms"
                        className="input input-bordered w-full"
                        required={true}
                      />
                    </div>
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-bold">Percentage</span>
                      </label>
                      <input
                        type="number"
                        name="percentage"
                        placeholder="Enter Percentage"
                        className="input input-bordered w-full"
                        required={true}
                      />
                    </div>
                  </>
                )}{" "}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold">Agreement Fee</span>
                  </label>
                  <input
                    type="number"
                    name="agrefee"
                    placeholder="Enter Agreement Fee"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {status === "cash" ? (
                <></>
              ) : (
                <div className="fourth flex gap-5 lg:flex-nowrap flex-wrap  justify-between mb-8">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">Hire Price</span>
                    </label>
                    <input
                      type="number"
                      name="hireprice"
                      placeholder="Enter Hire Price"
                      className="input input-bordered w-full"
                      required={true}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">
                        Installment Date
                      </span>
                    </label>
                    <DatePick
                      dateValue={insdate}
                      setDateValue={setInsdate}
                      placeHolder="Installment Date"
                      iconShow={true}
                      endDate={40}
                      requir={true}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">
                        Installment Amount
                      </span>
                    </label>
                    <input
                      type="number"
                      name="insamount"
                      placeholder="Enter Terms"
                      className="input input-bordered w-full"
                      required={true}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">
                        Condition Date
                      </span>
                    </label>
                    <DatePick
                      dateValue={conddate}
                      setDateValue={setConddate}
                      iconShow={true}
                      placeHolder="Condition Date"
                      endDate={15}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold">
                        Condition Amount
                      </span>
                    </label>
                    <input
                      type="number"
                      name="condamount"
                      placeholder="Enter Percentage"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
              )}
            </fieldset>
            <div className="submit">
              <input
                type="submit"
                value="Submit"
                className="rounded-lg font-h2 mt-4 border-2-[#331A15] bg-[#D2B48C] w-full p-3 font-bold text-[18px] text-[#331A15] cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
