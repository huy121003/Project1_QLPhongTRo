import React from "react";
import { Descriptions, Drawer, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";
import ContractModel from "../../../models/ContractModel";
import { getContractStatusColor } from "../../../utils/getMethodColor";
// import { downloadContractPDF } from "../../../utils/generateContractPDF";

interface Props {
  openDetailContract: boolean;
  setOpenDetailContract: (value: boolean) => void;
  record: ContractModel;
}

const DetailContract: React.FC<Props> = ({
  openDetailContract,
  setOpenDetailContract,
  record,
}) => {
  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handlePrintPDF = () => {
    if (record) {
      downloadContractPDF(record);
    }
  };

  const items = [
    {
      key: "Tenant",
      label: "Tenant",
      children: record?.tenant.name,
    },
    {
      key: "Phone",
      label: "Phone",
      children: record?.tenant.phone,
    },
    {
      key: "IdCard",
      label: "IdCard",
      children: record?.tenant.idCard,
    },
    {
      key: "Email",
      label: "Email",
      children: record?.tenant.email,
    },
    {
      Key: "Address",
      label: "Address Tenant",
      children: record?.tenant.address,
    },

    {
      key: "Room",
      label: "Room",
      children: record?.room.roomName,
    },
    {
      key: "Price",
      label: "Price",
      children: record?.room.price.toLocaleString() + " đ",
    },
    {
      key: "7",
      label: "Innkeeper",
      children: record?.innkeeper.name,
    },
    {
      key: "8",
      label: "Start Date",
      children: formatDate(record?.startDate),
    },
    {
      key: "9",
      label: "End Date",
      children: formatDate(record?.endDate),
    },
    {
      key: "10",
      label: "Deposit Amount",
      children: record?.depositAmount.toLocaleString() + " đ",
    },

    {
      key: "11",
      label: "Status",
      children: (
        <p className={`${getContractStatusColor(record?.status)} font-bold`}>
          {record?.status}
        </p>
      ),
    },
    {
      key: "12",
      label: "Create at",
      children: formatDate(record?.createdAt),
    },

    {
      key: "14",
      label: "Created By",
      children: record?.createdBy?.email,
    },
  ];
  return (
    <Drawer
      onClose={() => setOpenDetailContract(false)}
      open={openDetailContract}
      width={"100vh"}
      extra={
        <Button
          type="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrintPDF}
        >
          In hợp đồng
        </Button>
      }
    >
      <Descriptions title="Contract Detail" bordered column={1} items={items} />
    </Drawer>
  );
};

export default DetailContract;
