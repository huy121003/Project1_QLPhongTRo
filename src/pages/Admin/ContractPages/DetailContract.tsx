import React, { useEffect, useState } from "react";
import {
  Badge,
  Descriptions,
  Drawer,
  message,
  Switch,
  Tag,
  Collapse,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment";
import ContractModel, { ContractStatus } from "../../../models/ContractModel";
import { resizeWidth } from "../../../utils/resize";
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
  const width = resizeWidth();
  const items = [
    {
      key: "1",
      label: "Tenant",
      children: record?.tenant.name,
    },
    {
      key: "2",
      label:"Phone",
      children: record?.tenant.phone,
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
      label:"Price",
      children: record?.room.price.toLocaleString() + " đ",
    },
    {
      key:"7",
      label:"Innkeeper",
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
      children: record?.status === ContractStatus.EXPIRED ? (
        <p className="text-orange-600 font-bold">{ContractStatus.EXPIRED}</p>
      ) :status===ContractStatus.CANCELED?  <p className="text-red-600 font-bold">{ContractStatus.CANCELED}</p>: (
        <p className="text-green-600 font-bold">{ContractStatus.ACTIVE}</p>
      )
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
    >
      <Descriptions
        title="Contract Detail"
        bordered
        column={ 1}
        items={items}
      />
    </Drawer>
  );
};

export default DetailContract;
