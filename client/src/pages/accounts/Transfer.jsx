import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  useGetAccountQuery,
  useSetTransferMutation,
} from "../../redux/feature/api/accountApi";
import { useGetShowroomQuery } from "../../redux/feature/api/showroomApi";

const Transfer = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const { data: allAccounts } = useGetAccountQuery();
  const { data: allShowroom } = useGetShowroomQuery();
  const [setPost, { isSuccess, isError, error }] = useSetTransferMutation();
  const [sendMessage, setSendMessage] = useState("");
  const [recMessage, setRecMessage] = useState("");
  const [sendType, setSendType] = useState();
  const [receivedType, setReceivedType] = useState();
  const [loading, setLoading] = useState(false);

  const allAccountsNShowrrom =
    allAccounts && allShowroom
      ? [
          {
            label: "Accounts",
            code: "accounts",
            items: [...allAccounts],
          },
          {
            label: "Showroom",
            code: "showroom",
            items: [...allShowroom],
          },
        ]
      : [];

  const handleDropdownChange = (e, setType) => {
    const selectedValue = e.value;
    let selectedGroupLabel = "";

    for (const group of allAccountsNShowrrom) {
      if (group.items.includes(selectedValue)) {
        selectedGroupLabel = group.code;
        break;
      }
    }

    setType({ ...selectedValue, groupLabel: selectedGroupLabel });
    setSendMessage("");
    setRecMessage("");
  };

  const groupedItemTemplate = (option) => {
    return (
      <div className="flex items-center  gap-4">
        <i className="pi pi-list"></i>
        <div>{option.label}</div>
      </div>
    );
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Installment Addeded Complited",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Installment Not Posted",
      life: 3000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;

    const inputData = {
      sendType,
      amount,
      receivedType,
    };

    if (sendType === undefined) {
      setSendMessage("Select Sender Account");
      return;
    } else if (receivedType === undefined) {
      setRecMessage("Select Receiver Account");
      return;
    } else {
      setSendMessage("");
      setRecMessage("");
    }

    if (sendType?.code === receivedType?.code) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Diffrent Account Type",
        life: 3000,
      });
      return;
    }
    setPost(inputData);
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess();
      setLoading(false);
      setTimeout(() => {
        navigate(`/account/list`);
      }, 3000);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      showError();
      setLoading(false);
    }
  }, [isError, error]);

  return (
    <div className="transfer">
      <Toast ref={toast} />
      <div className="w-full">
        <fieldset className="mb-4">
          {/* <legend>
            <h1>Amount Send From</h1>
          </legend> */}
          <form onSubmit={handleSubmit} className="">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 justify-center items-center">
              <div className="first">
                <fieldset className="mb-4">
                  <legend>
                    <h1>Amount Send From</h1>
                  </legend>
                  <div className="form-control w-full">
                    <label className="label text-right">
                      <span className="label-text font-normal text-red-600 text-right">
                        {sendMessage}
                      </span>
                    </label>
                    <Dropdown
                      value={sendType}
                      // onChange={(e) => setSendType(e.value)}
                      onChange={(e) => handleDropdownChange(e, setSendType)}
                      options={allAccountsNShowrrom}
                      optionLabel="name"
                      placeholder="Payment Type"
                      className="w-full md:w-14rem"
                      optionGroupLabel="label"
                      optionGroupChildren="items"
                      optionGroupTemplate={groupedItemTemplate}
                    />
                  </div>
                  <div className="card mt-4  mx-auto w-full">
                    <ul>
                      <li>
                        Name: <b>{sendType?.name}</b>
                      </li>
                      <li>
                        Code: <b>{sendType?.code}</b>
                      </li>
                      <li>
                        Remaining Balance: <b>{sendType?.remainingBalance}</b>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>
              <div className="second">
                <fieldset className="mb-4">
                  <legend>
                    <h1>Amount Received To</h1>
                  </legend>
                  <div className="form-control w-full">
                    <label className="label text-right">
                      <span className="label-text font-normal text-red-600 text-right">
                        {recMessage}
                      </span>
                    </label>
                    <Dropdown
                      value={receivedType} // This should have the same structure as the options
                      onChange={(e) => handleDropdownChange(e, setReceivedType)}
                      options={allAccountsNShowrrom}
                      optionLabel="name" // Ensure 'name' exists in the selected object
                      placeholder="Payment Type"
                      className="w-full md:w-14rem"
                      optionGroupLabel="label"
                      optionGroupChildren="items"
                      optionGroupTemplate={groupedItemTemplate}
                    />
                  </div>
                  <div className="card mt-4  mx-auto w-full">
                    <ul>
                      <li>
                        Name: <b>{receivedType?.name}</b>
                      </li>
                      <li>
                        Code: <b>{receivedType?.code}</b>
                      </li>
                      <li>
                        Remaining Balance:{" "}
                        <b>{receivedType?.remainingBalance}</b>
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </div>{" "}
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold">Transfer Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Transfer Amount"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="button flex justify-center items-center mt-5">
                <Button
                  className="bg-green-500 py-3 px-10"
                  label="Transfer"
                  icon="pi pi-check"
                  loading={loading}
                  // onClick={load}
                />
              </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Transfer;
