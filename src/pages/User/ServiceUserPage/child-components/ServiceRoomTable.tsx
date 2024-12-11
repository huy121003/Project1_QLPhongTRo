import React, { useEffect, useState } from "react";
import { Button, message, notification, Popconfirm, Switch, Table } from "antd";
import registerServiceApi from "api/registerServiceApi/registerServiceApi";
import roomApi from "api/roomApi/roomApi";
import serviceApi from "api/serviceApi/serviceApi";
import serviceTypeColor from "constants/serviceTypeColor";
import { RegisterServiceStatus, ServiceType } from "enums";
import { useAppSelector } from "redux/hook";
import { IRegisterService, IService } from "interfaces";
import RegisterServiceModal from "../modal/RegisterServiceModal";

interface IServiceRoomTable {
  selectedRoomId: string | null;
}

const ServiceRoomTable: React.FC<IServiceRoomTable> = ({ selectedRoomId }) => {
  const [allService, setAllService] = useState([]);
  const [serviceRoom, setServiceRoom] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [serviceRequest, setServiceRequest] = useState<IRegisterService[]>([]);
  const tenantId = useAppSelector((state) => state.auth.user?._id);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<string>("");
  const fetchAllService = async () => {
    setLoading(true);
    try {
      const res = await serviceApi.fetchServiceApi(
        "pageSize=9999&currentPage=1"
      );
      if (res.statusCode === 200) {
        setAllService(res.data.result);
      } else {
        notification.error({ message: "Error", description: res.message });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch services",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRequestService = async () => {
    setLoading(true);
    try {
      const res = await registerServiceApi.fetchRegisterServiceApi(
        `user=${tenantId}&room=${selectedRoomId}&pageSize=9999&currentPage=1`
      );
      if (res.statusCode === 200) {
        setServiceRequest(res.data.result);
      } else {
        notification.error({ message: "Error", description: res.message });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch service requests",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomServices = async () => {
    if (!selectedRoomId) return;
    try {
      const res = await roomApi.fetchRoomByIdApi(selectedRoomId);
      if (res.statusCode === 200) {
        setServiceRoom(res.data.services);
      } else {
        notification.error({ message: "Error", description: res.message });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch room services",
      });
    }
  };

  const cancelService = async (serviceId: string) => {
    if (!selectedRoomId) return;
    try {
      const res = await registerServiceApi.postRegisterServiceApi(
        serviceId,
        tenantId,
        selectedRoomId,
        false,
        false
      );
      if (res.statusCode === 201) {
        message.success("Service canceled successfully");
        await fetchRequestService();
      } else {
        notification.error({ message: "Error", description: res.message });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to cancel service",
      });
    }
  };
  const registerService = async (serviceId: string, excuteNow: boolean) => {
    if (!selectedRoomId) return;
    try {
      const res = await registerServiceApi.postRegisterServiceApi(
        serviceId,
        tenantId,
        selectedRoomId,
        true,
        excuteNow
      );
      if (res.statusCode === 201) {
        message.success("Create service request successfully");
        await fetchRequestService();
      } else {
        notification.error({ message: "Error", description: res.message });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to register service",
      });
    }
  };
  useEffect(() => {
    fetchAllService();
  }, []);

  useEffect(() => {
    if (selectedRoomId && tenantId) {
      fetchRequestService();
      fetchRoomServices();
    }
  }, [selectedRoomId, tenantId]);

  const columns = [
    { title: "Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{price.toLocaleString()} đ</p>,
    },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: ServiceType) => (
        <p className={`${serviceTypeColor(type)} font-bold`}>{type}</p>
      ),
    },
    {
      title: "Registered",
      dataIndex: "registered",
      key: "registered",
      render: (_: any, record: any) => (
        <Switch disabled checked={serviceRoom.includes(record?._id)} />
      ),
      width: 100,
    },
    {
      title: "Request",
      dataIndex: "_id",
      key: "Request",
      render: (_id: string, record: IService) => {
        if (
          record.type === ServiceType.Electricity ||
          record.type === ServiceType.Water
        ) {
          return;
        } else {
          const serviceRegistered = serviceRoom.includes(_id);
          const serviceRequestItem = serviceRequest.find(
            (item: any) => item.service._id === _id && item.type === false
          );
          const serviceRequestItem2 = serviceRequest.find(
            (item: any) => item.service._id === _id && item.type === true
          );

          if (serviceRegistered) {
            if (serviceRequestItem?.status === "PENDING") {
              return (
                <p className="text-red-500 font-semibold">
                  {RegisterServiceStatus.PENDING}
                </p>
              );
            } else if (serviceRequestItem?.status === "APPROVED") {
              return (
                <p className="text-green-500 font-semibold">
                  {" "}
                  {RegisterServiceStatus.APPROVED}
                </p>
              );
            } else {
              return (
                <Popconfirm
                  title="Are you sure to cancel this service?"
                  onConfirm={() => cancelService(_id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Cancel</Button>
                </Popconfirm>
              );
            }
          } else {
            if (serviceRequestItem2?.status === "PENDING") {
              return (
                <p className="text-red-500 font-semibold">
                  {RegisterServiceStatus.PENDING}
                </p>
              );
            } else if (serviceRequestItem2?.status === "APPROVED") {
              return (
                <p className="text-green-500 font-semibold">
                  {RegisterServiceStatus.APPROVED}
                </p>
              );
            } else {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    setOpenModal(true);
                    setServiceId(_id);
                  }}
                >
                  Register
                </Button>
              );
            }
          }
        }
      },
      width: 100,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Table
        dataSource={allService}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
      <RegisterServiceModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        registerService={registerService}
        serviceId={serviceId}
      />
    </div>
  );
};

export default ServiceRoomTable;
