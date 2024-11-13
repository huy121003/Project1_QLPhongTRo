import React from "react";
import { Descriptions, Drawer, Button, Typography } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import moment from "moment";
import ContractModel from "../../../models/ContractModel";
import { getContractStatusColor } from "../../../utils/getMethodColor";
import { downloadContractPDF } from "../../../utils/generateContractPDF";

interface Props {
  openDetailContract: boolean;
  setOpenDetailContract: (value: boolean) => void;
  record: ContractModel;
}

const { Text } = Typography;

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
    { key: "Tenant", label: "Tenant", children: record?.tenant.name },
    { key: "Phone", label: "Phone", children: record?.tenant.phone },
    { key: "IdCard", label: "IdCard", children: record?.tenant.idCard },
    { key: "Email", label: "Email", children: record?.tenant.email },
    {
      key: "Address",
      label: "Address Tenant",
      children: record?.tenant.address,
    },
    { key: "Room", label: "Room", children: record?.room.roomName },
    {
      key: "Price",
      label: "Price",
      children: `${record?.room.price.toLocaleString()} đ`,
    },
    { key: "Innkeeper", label: "Innkeeper", children: record?.innkeeper.name },
    {
      key: "Start Date",
      label: "Start Date",
      children: formatDate(record?.startDate),
    },
    {
      key: "End Date",
      label: "End Date",
      children: formatDate(record?.endDate),
    },
    {
      key: "Rent Cycle Count",
      label: "Rent Cycle Count",
      children: record?.rentCycleCount,
    },
    {
      key: "Deposit Amount",
      label: "Deposit Amount",
      children: `${record?.depositAmount.toLocaleString()} đ`,
    },
    {
      key: "Status",
      label: "Status",
      children: (
        <Text className={getContractStatusColor(record?.status)} strong>
          {record?.status}
        </Text>
      ),
    },
    {
      key: "Actual End Date",
      label: "Actual End Date",
      children: record?.actualEndDate
        ? formatDate(record?.actualEndDate)
        : "N/A",
    },
    {
      key: "Created At",
      label: "Created At",
      children: formatDate(record?.createdAt),
    },
    {
      key: "Created By",
      label: "Created By",
      children: record?.createdBy?.email,
    },
  ];

  return (
    <Drawer
      onClose={() => setOpenDetailContract(false)}
      open={openDetailContract}
      width="100vh"
      extra={
        <Button
          type="primary"
          size="large"
          className="bg-orange-600 hover:bg-orange-700 transition duration-200"
          icon={<PrinterOutlined />}
          onClick={handlePrintPDF}
        >
          Print Contract
        </Button>
      }
    >
      <Typography.Title level={4}>Contract Detail</Typography.Title>
      <Descriptions bordered column={1}>
        {items.map((item) => (
          <Descriptions.Item key={item.key} label={item.label}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Drawer>
  );
};

export default DetailContract;
