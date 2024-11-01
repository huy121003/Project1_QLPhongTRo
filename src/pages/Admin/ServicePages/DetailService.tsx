import React from "react";
import { Descriptions, Drawer, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment"; // Import moment for date formatting

import { getServiceTypeColor } from "../../../utils/getMethodColor";
interface Props {
  openDetailService: boolean;
  setOpenDetailService: (value: boolean) => void;
  record: any;
}
const DetailService: React.FC<Props> = ({
  openDetailService,
  setOpenDetailService,
  record,
}) => {
  console.log(record);
  const formatDate = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY"); // Format date using moment
  };
  const item = [
    {
      key: "1",
      label: "ServiceName",
      children: record?.serviceName,
    },
    {
      key: "2",
      label: "Type",
      children: (
        <p className={`${getServiceTypeColor(record?.type)} font-bold`}>
          {record?.type}
        </p>
      ),
    },
    {
      key: "3",
      label: "Price",
      children: <>{record?.price.toLocaleString("vi-VN")} đ</>,
    },
    {
      key: "4",
      label: "Unit",
      children: record?.unit,
    },
    {
      key: "5",
      label: "Description",
      children: record?.description,
    },
    {
      key: "6",
      label: "Created At",
      children: record?.createdAt ? formatDate(record?.createdAt) : "N/A", // Format createdAt date
    },
    {
      key: "7",
      label: "Created By",
      children: record?.createdBy ? (
        record?.createdBy?.email
      ) : (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Updating
        </Tag>
      ),
    },
    {
      key: "8",
      label: "Updated At",
      children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A", // Format updatedAt date
    },
    {
      key: "9",
      label: "Updated By",
      children: record?.updatedBy ? (
        record?.updatedBy?.email
      ) : (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Updating
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <Drawer
        onClose={() => setOpenDetailService(false)}
        open={openDetailService}
        width={"100vh"}
      >
        <Descriptions title="Service Detail" bordered items={item} column={1} />
      </Drawer>
    </div>
  );
};
export default DetailService;
