import { InvoiceStatus } from "enums";

 const invoiceStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case InvoiceStatus.PAID:
      return "text-green-600 ";
    case InvoiceStatus.UNPAID:
      return "text-red-600 ";
  }
};
export default invoiceStatusColor;