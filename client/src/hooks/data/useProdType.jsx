const useProdType = () => {
  const proTypeList = [
    { name: "Motorcycle", sku: "MC" },
    { name: "Easybike", sku: "EB" },
    { name: "Battery", sku: "BT" },
    { name: "LPG", sku: "LP" },
    { name: "Parts", sku: "PR" },
    { name: "Gas", sku: "GS" },
  ];

  return [proTypeList];
};

export default useProdType;
