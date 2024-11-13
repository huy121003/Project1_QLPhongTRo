import React, { useEffect, useState } from "react";
import { Collapse, Descriptions, Drawer, message, Switch, Tag } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import moment from "moment"; // Import moment for date formatting
import {
  getRoomStatusColor,
  getRoomTypeColor,
} from "../../../utils/getMethodColor";
import { IService } from "../../../interfaces";
import { serviceApi } from "../../../api";
interface Props {
  openDetailRoom: boolean;
  setOpenDetailRoom: (value: boolean) => void;
  record: any;
}
const DetailRoom: React.FC<Props> = ({
  openDetailRoom,
  setOpenDetailRoom,
  record,
}) => {
  const formatDate = (dateString: string) => {
    return moment(dateString).format("DD/MM/YYYY"); // Format date using moment
  };
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enableService, setEnableService] = useState<string[]>([]);
  useEffect(() => {
    const getService = async () => {
      setIsLoading(true);

      setEnableService(record?.services);

      const response = await serviceApi.fetchServiceApi("pageSize=1000&currentPage=1");
      if (response.data) {
        setServices(response.data.result);
      } else {
        message.error(response.message);
      }
      setIsLoading(false);
    };
    getService();
  }, [record]);

  const item = [
    {
      key: "1",
      label: "Room Name",
      children: record?.roomName,
    },
    {
      key: "2",
      label: "Type",
      children: (
        <p className={`${getRoomTypeColor(record?.type) as string} font-bold`}>
          {record?.type}
        </p>
      ),
    },
    {
      key: "3",
      label: "Area",
      children: <>{record?.area} m2</>,
    },
    {
      key: "4",
      label: "Price",
      children: <>{record?.price.toLocaleString("vi-VN")} đ</>,
    },
    {
      key: "5",
      label: "Description",
      children: record?.description,
    },
    {
      key: "6",
      label: "Status",
      children: (
        <p
          className={`${
            getRoomStatusColor(record?.status) as string
          } font-bold`}
        >
          {record?.status}
        </p>
      ),
    },
    {
      key: "7",
      label: "Created At",
      children: record?.createdAt ? formatDate(record?.createdAt) : "N/A", // Format createdAt date
    },
    {
      key: "8",
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
      key: "9",
      label: "Updated At",
      children: record?.updatedAt ? formatDate(record?.updatedAt) : "N/A", // Format updatedAt date
    },
    {
      key: "10",
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
  const handleSwitchChange = (checked: boolean, id: string) => {
    setEnableService((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };
  return (
    <Drawer
      loading={isLoading}
      onClose={() => setOpenDetailRoom(false)}
      open={openDetailRoom}
      width={"100vh"}
    >
      <Descriptions title="Room Detail" bordered items={item} column={1} />
      <div className="my-2" />
      <Collapse>
        <Collapse.Panel header="Services" key="1">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex items-center p-2 border border-gray-200 rounded-md bg-gray-100 my-1"
            >
              <p>{service.serviceName}</p>
              <Switch
                disabled
                checked={enableService?.includes(service._id)}
                onChange={(checked) => handleSwitchChange(checked, service._id)}
                className="ml-auto"
              />
            </div>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Drawer>
  );
};
export default DetailRoom;
