export const printMemo = (memos, calculateAmount, totals) => {
  let html = `
    <html>
      <head>
        <title>Memo List</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h2 { text-align: center; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #333; padding: 8px; text-align: right; }
          th { background-color: #f0f0f0; }
          td:first-child, th:first-child { text-align: left; }
        </style>
      </head>
      <body>
        <h2>Rubel Auto</h2>
        <h2>Memo List</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Part No.</th>
              <th>Model</th>
              <th>Company</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Disc (%)</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>`;

  memos.forEach((item) => {
    html += `
      <tr>
        <td>${item.description}</td>
        <td>${item.partNo}</td>
        <td>${item.model}</td>
        <td>${item.company}</td>
        <td>${item.quantity}</td>
        <td>${item.rate}</td>
        <td>${item.discount}</td>
        <td>${calculateAmount(item).toFixed(2)}</td>
      </tr>`;
  });

  html += `
        </tbody>
      </table>

      <table style="margin-top: 20px; width: 50%; float: right;">
        <tbody>
          <tr><td><strong>Total Amount:</strong></td><td>${totals
            .totalAmount()
            .toFixed(2)}</td></tr>
          <tr><td><strong>Previous Due:</strong></td><td>${
            totals.prevDue
          }</td></tr>
          <tr><td><strong>Paid Amount:</strong></td><td>${
            totals.paidAmount
          }</td></tr>
          <tr><td><strong>Overall Discount:</strong></td><td>${
            totals.overallDiscount
          }</td></tr>
          <tr><td><strong>Transport:</strong></td><td>${
            totals.transport
          }</td></tr>
          <tr><td><strong>Grand Total:</strong></td><td>${totals
            .grandTotal()
            .toFixed(2)}</td></tr>
        </tbody>
      </table>

      <script>
        window.onload = function() {
          window.print();
        };
      </script>
    </body>
  </html>`;

  const printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
