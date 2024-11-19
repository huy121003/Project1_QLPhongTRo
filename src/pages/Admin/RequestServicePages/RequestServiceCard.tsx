import React from "react";
import { IRegisterService } from "../../../interfaces";
import { useTheme } from "../../../contexts/ThemeContext";
import { RegisterServiceStatus } from "../../../enums";
import {
  Button,
  message,
  notification,
  Pagination,
  Popconfirm,
  Spin,
} from "antd";
import dayjs from "dayjs";
import { serviceApi } from "../../../api";
import { NotItem } from "../../../components";

interface Props {
  registerService: IRegisterService[];
  total: number;
  currentPage: number;
  pageSize: number;
  onChange: (page: number, pageSize?: number) => void;
  onApprove: (id: string, type: boolean) => void;
  loading: boolean;
}

const RequestServiceCard: React.FC<Props> = ({
  registerService,
  total,
  currentPage,
  pageSize,
  onChange,
  onApprove,
  loading: isLoading,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const textColor = isLightTheme ? "text-gray-800" : "text-gray-100";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-900";
  const cardBorderColor = isLightTheme ? "border-gray-200" : "border-gray-700";
  const notificationTextColor = isLightTheme
    ? "text-blue-500"
    : "text-blue-300";

  const getNotification = (
    status: string,
    type: boolean,
    user: string,
    room: string,
    service: string,
    implementationDate?: string
  ) => {
    if (status === RegisterServiceStatus.PENDING) {
      return type
        ? `${user} wants to register ${service} for room ${room}.`
        : `${user} wants to cancel ${service} for room ${room}.`;
    }
    if (status === RegisterServiceStatus.APPROVED) {
      return type
        ? `Request to register ${service} for ${user} in room ${room} has been approved and will be executed on ${implementationDate}
        `
        : `Request to cancel ${service} for ${user} in room ${room} has been approved and will be executed on ${implementationDate}`;
    }
    if (status === RegisterServiceStatus.SUCCESS) {
      return type
        ? `Registered ${service} for ${user} in room ${room} successfully.`
        : `Canceled ${service} for ${user} in room ${room} successfully.`;
    }
    return "Status unknown.";
  };

  return (
    <Spin spinning={isLoading}>
      {registerService.length > 0 ? (
        <div className=" space-y-6 my-6 mx-12">
          {registerService.map((service, index) => (
            <div
              key={index}
              className={` p-6  rounded-lg shadow-md border hover:shadow-xl transform transition-all hover:scale-105 ${bgColor} ${cardBorderColor}`}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className={`text-xl font-semibold ${textColor}`}>
                    {service.user.name} - Room {service.room.roomName}
                  </h3>
                  <p className={`text-sm ${textColor}`}>
                    {dayjs(
                      service.status === RegisterServiceStatus.PENDING
                        ? service.createdAt
                        : service.updatedAt
                    ).format("DD/MM/YYYY HH:mm:ss")}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    service.status === RegisterServiceStatus.PENDING
                      ? "bg-yellow-100 text-yellow-700"
                      : service.status === RegisterServiceStatus.APPROVED
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {service.status}
                </span>
              </div>
              <p className={`text-base ${notificationTextColor}`}>
                {getNotification(
                  service.status,
                  service.type,
                  service.user.name,
                  service.room.roomName,
                  service.service.serviceName,
                  service.implementationDate || ""
                )}
              </p>
              {service.status === RegisterServiceStatus.PENDING && (
                <Popconfirm
                  title={
                    service.type
                      ? "Approve Cancellation"
                      : "Approve Registration"
                  }
                  description={`Are you sure you want to approve this ${
                    service.type ? "cancellation" : "registration"
                  }?`}
                  onConfirm={() => onApprove(service._id, service.type)}
                  okText="Yes"
                  cancelText="No"
                  placement="topRight"
                >
                  <Button className="mt-4">Approve</Button>
                </Popconfirm>
              )}
            </div>
          ))}
          <div className="mt-8 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={onChange}
              showSizeChanger
              pageSizeOptions={["4", "8", "16", "32", "64", "128", "999999"]}
            />
          </div>
        </div>
      ) : (
        <NotItem />
      )}
    </Spin>
  );
};

export default RequestServiceCard;