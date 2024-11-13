import React from "react";
import { Descriptions, Drawer, Image, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment"; // Import moment for date formatting

import { getGenderColor, getRoleColor } from "../../../utils/getMethodColor";
import { IAccount } from "../../../interfaces";
interface Props {
  openDetailAccount: boolean;
  setOpenDetailAccount: (value: boolean) => void;
  record: IAccount;
}

const DetailAccount: React.FC<Props> = ({
  openDetailAccount,
  setOpenDetailAccount,
  record,
}) => {
  const formatDate = (date: string | Date) => {
    return moment(date).format("DD/MM/YYYY"); // Format date using moment
  };

  const items = [
    {
      key: "1",
      label: "Username",
      children: record?.name,
    },
    {
      key: "2",
      label: "Email",
      children: record?.email,
    },
    {
      key: "3",
      label: "Gender",
      children: (
        <p className={`${getGenderColor(record?.gender)} font-bold `}>
          {record?.gender}
        </p>
      ),
    },
    {
      key: "4",
      label: "Birthday",
      children: record?.birthday ? formatDate(record?.birthday) : "N/A", // Format birthday date
    },
    {
      key: "6",
      label: "Role",
      children: (
        <p
          className={`border ${getRoleColor(
            record?.role?.name
          )} text-center rounded border-2 w-[120px] p-2`}
        >
          {record?.role?.name}
        </p>
      ),
    },
    {
      key: "5",
      label: "Address",
      children: record?.address,
    },
    {
      key: "7",
      label: "Id Card",
      children: record?.idCard,
    },
    {
      key: "8",
      label: "Phone Number",
      children: record?.phone,
    },
    {
      key: "17",
      label: "Front ID Card",
      children: record?.imagesIdCard[0] ? (
        <Image width={100} height={70} src={`${record?.imagesIdCard[0]}`} />
      ) : (
        <i className="fa-solid fa-id-card text-4xl text-gray-400"></i>
      ),
    },
    {
      key: "18",
      label: "Back ID Card",
      children: record?.imagesIdCard[1] ? (
        <Image width={100} height={70} src={`${record?.imagesIdCard[1]}`} />
      ) : (
        <i className="fa-solid fa-id-card text-4xl text-gray-400"></i>
      ),
    },
    {
      key: "19",
      label: "Temporary Residence Image",
      children: record?.imagesIdCard[2] ? (
        <Image width={100} height={70} src={`${record?.imagesIdCard[2]}`} />
      ) : (
        <i className="fa-solid fa-file-contract text-4xl text-gray-400"></i>
      ),
    },
    {
      key: "9",
      label: "Created At",
      children: record?.createdAt ? formatDate(record?.createdAt) : "N/A", // Format createdAt date
    },
    {
      key: "10",
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
      key: "11",
      label: "Updated At",
      children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A", // Format updatedAt date
    },
    {
      key: "12",
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
    <div className="flex-1 ">
      <Drawer
        onClose={() => setOpenDetailAccount(false)}
        open={openDetailAccount}
        width={"100vh"}
        title="Account Detail"
        className="flex-1 "
      >
        {record?.avatar ? (
          <Image width={200} height={200} src={`${record.avatar}`} />
        ) : (
          <i className="fa-solid fa-user text-[120px] text-gray-500"></i>
        )}

        <Descriptions bordered items={items} column={1} />
      </Drawer>
    </div>
  );
};

export default DetailAccount;
