const usePaymentType = () => {
  const paymentTypeList = [
    { name: "Cash", code: "cash" },
    { name: "Bkash", code: "bkash" },
    { name: "Nagad", code: "nagad" },
    { name: "Bank", code: "bank" },
  ];

  return [paymentTypeList];
};

export default usePaymentType;
