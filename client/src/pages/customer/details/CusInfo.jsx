import moment from "moment";
import "../details/dsds.css";

const CusInfo = ({ singleCustomer }) => {
  const { cardno, saledate, accountInfo, customerInfo, productInfo, showRoom } =
    singleCustomer;
  // console.log(singleCustomer);

  const creditBalance = accountInfo?.hireprice - accountInfo?.dpamount;
  return (
    <>
      <div className="cusinfotable p-datatable p-component p-datatable-responsive-scroll mb-6 text-center shadow-md">
        <div className="grid lg:grid-cols-3 grid-cols-1 w-full mt-4">
          <div className="left w-full p-datatable-wrapper h-full">
            <table className="table table-bordered border-dark info w-full h-full p-datatable-table">
              <thead className="p-datatable-thead">
                <tr role="row">
                  <th scope="col" colSpan="6" className="text-center">
                    Customer Info
                  </th>
                </tr>
              </thead>
              <tbody className="p-datatable-tbody">
                <tr>
                  <td className="tdwd1">Customer Name</td>
                  <td className="tdwd">{customerInfo?.name}</td>
                </tr>
                <tr>
                  <td className="tdwd1">CO Name</td>
                  <td className="tdwd">{customerInfo?.coname}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Mobile</td>
                  <td className="tdwd">{customerInfo?.number}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Address</td>
                  {/* <td className="tdwd">{customerInfo?.address}</td> */}
                </tr>
                <tr>
                  <td className="tdwd1">Location Mark</td>
                  <td className="tdwd">{customerInfo?.location}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Media & Number</td>
                  <td className="tdwd">{customerInfo?.media}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Guarantor 1</td>
                  <td className="tdwd"></td>
                </tr>
                <tr>
                  <td className="tdwd1">Guarantor 2</td>
                  <td className="tdwd"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="center w-full p-datatable-wrapper h-full">
            <table className="table table-bordered border-dark info w-full h-full p-datatable-table">
              <thead className="p-datatable-thead">
                <tr>
                  <th scope="col" colSpan="6" className="text-center">
                    Sale Info
                  </th>
                </tr>
              </thead>
              <tbody className="p-datatable-tbody">
                <tr>
                  <td className="tdwd1">Sale Price</td>
                  <td className="tdwd">{accountInfo?.saleprice}</td>
                </tr>

                <tr>
                  <td className="tdwd1">Downpayment</td>
                  <td className="tdwd">{accountInfo?.dpamount}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Hire Price</td>
                  <td className="tdwd">{accountInfo?.hireprice}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Installment Date</td>
                  <td className="tdwd">
                    {moment(accountInfo?.insdate).format("D/MM/YY")}
                  </td>
                </tr>
                <tr>
                  <td className="tdwd1">Installment Amount</td>
                  <td className="tdwd">{accountInfo?.insamount}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Conditation Date</td>
                  <td className="tdwd">
                    {accountInfo?.conddate
                      ? moment(accountInfo?.conddate).format("D/MM/YY")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td className="tdwd1">Conditation Amount</td>
                  <td className="tdwd">{accountInfo?.condamount}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Credit balance</td>
                  <td className="tdwd">{creditBalance}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="right w-full p-datatable-wrapper h-full">
            <table className="table table-bordered border-dark info w-full h-full p-datatable-table">
              <thead className="p-datatable-thead">
                <tr>
                  <th scope="col" colSpan="6" className="text-center">
                    Product Info
                  </th>
                </tr>
              </thead>
              <tbody className="p-datatable-tbody">
                <tr>
                  <td className="tdwd1">Sale Date</td>
                  <td className="tdwd">{moment(saledate).format("D/MM/YY")}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Card No.</td>
                  <td className="tdwd">{cardno}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Showroom</td>
                  <td className="tdwd">{showRoom}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Model</td>
                  <td className="tdwd">{productInfo?.models}</td>
                </tr>

                <tr>
                  <td className="tdwd1">Engine No.</td>
                  <td className="tdwd">{productInfo?.engine}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Chassis No.</td>
                  <td className="tdwd">{productInfo?.chassis}</td>
                </tr>
                <tr>
                  <td className="tdwd1">Color / Battery</td>
                  <td className="tdwd">{productInfo?.color}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CusInfo;
