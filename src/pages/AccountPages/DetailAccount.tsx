import React from "react";
import { Badge, Descriptions, Drawer, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { Gender } from "../../models/AccountModel";
import moment from "moment"; // Import moment for date formatting
import { resizeWidth } from "../../utils/resize";

interface Recordrecord {
  openDetailAccount: boolean;
  setOpenDetailAccount: (value: boolean) => void;
  record: any;
}

const DetailAccount: React.FC<Recordrecord> = ({
  openDetailAccount,
  setOpenDetailAccount,
  record,
}) => {
  const formatDate = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY"); // Format date using moment
  };
  const width = resizeWidth();
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
      children:
        record?.gender === Gender.Male ? (
          <p className="text-green-600 font-bold ">{record?.gender}</p>
        ) : record?.gender === Gender.Female ? (
          <p className=" text-pink-600 font-bold ">{record?.gender}</p>
        ) : (
          <p className="  text-purple-600 font-bold ">{record?.gender}</p>
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
          className={`border ${
            record?.role?.name === "SUPER ADMIN"
              ? "border-red-600 bg-red-200 text-red-600"
              : record?.role?.name === "NORMAL USER" ?
                "border-green-600 bg-green-200 text-green-600":"border-blue-600 bg-blue-200 text-blue-600"
          } text-center rounded border-2 w-[120px] p-2`}
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
    <div>
      <Drawer
        onClose={() => setOpenDetailAccount(false)}
        open={openDetailAccount}
        width={"100vh"}
      >
        <Descriptions
          title="Account Detail"
          bordered
          items={items}
          column={width > 750 ? 2 : 1}
        />
      </Drawer>
    </div>
  );
};

export default DetailAccount;
