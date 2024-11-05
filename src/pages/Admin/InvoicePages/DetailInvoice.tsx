import React from "react";
import { Descriptions, Drawer } from "antd";
import moment from "moment";
import InvoiceModel from "../../../models/InvoiceModal";

import { getInvoiceStatusColor } from "../../../utils/getMethodColor";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  record: InvoiceModel;
}
const DetailInvoice: React.FC<Props> = ({ open, setOpen, record }) => {
  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const items = [
    {
      key: "1",
      label: "Tenant",
      children: record?.tenant?.name,
    },
    {
      key: "2",
      label: "Phone",
      children: record?.tenant?.phone,
    },
    {
      key: "3",
      label: "IdCard",
      children: record?.tenant.idCard,
    },
    {
      key: "4",
      label: "Room",
      children: record?.room.roomName,
    },
    {
      key: "5",
      label: "First Index",
      children: record?.firstIndex,
    },
    {
      key: "6",
      label: "Last Index",
      children: record?.finalIndex,
    },
    {
      key: "7",
      label: "Total Number",
      children: record?.totalNumber,
    },

    {
      key: "8",
      label: "Price",
      children: record?.service.priceUnit.toLocaleString() + " đ",
    },
    {
      key: "9",
      label: "Amount",
      children: record?.amount.toLocaleString() + " đ",
    },
    {
      key: "10",
      label: "Month",
      children: record?.month,
    },
    {
      key: "11",
      label: "Status",
      children: (
        <p className={`${getInvoiceStatusColor(record?.status)} font-bold`}>
          {record?.status}
        </p>
      ),
    },
    {
      key: "12",
      label: "Create At",
      children: formatDate(record?.createdAt),
    },
    {
      key: "13",
      label: "Update At",
      children: formatDate(record?.updatedAt),
    },
    {
      key: "14",
      label: "Description",
      children: record?.description,
    },
  ];
  return (
    <Drawer onClose={() => setOpen(false)} open={open} width={"100vh"}>
      <Descriptions title="Invoice Detail" bordered column={1} items={items} />
    </Drawer>
  );
};

export default DetailInvoice;
