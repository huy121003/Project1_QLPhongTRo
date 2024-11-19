import React, { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import { serviceApi } from "../../../api";
import { RegisterServiceStatus } from "../../../enums";
import { IRegisterService } from "../../../interfaces";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSelectNotification: (notificationId: string) => void;
}

const NotificationModal: React.FC<Props> = ({
  open,
  setOpen,
  onSelectNotification,
}) => {
  const [registerService, setRegisterService] = useState<IRegisterService[]>(
    []
  );
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  useEffect(() => {
    const getRegisterService = async () => {
      const res = await serviceApi.fetchRegisterServiceApi(
        `status=${RegisterServiceStatus.PENDING}`
      );
      if (res.data) {
        setRegisterService(res.data.result);
      } else {
        notification.error({
          message: "Error",
          description: res.message || "Failed to fetch register services.",
        });
      }
    };

    getRegisterService();
  }, []);
  const handleClickNotification = (id: string) => {
    onSelectNotification(id); // Cập nhật trạng thái menu khi click vào thông báo
    navigate(`/admin/service/registerService`); // Dẫn đến trang chi tiết
    setOpen(false); // Đóng modal khi chọn thông báo
  };

  const navigate = useNavigate();
  return (
    <Modal
      closable={false}
      // title="Notifications"
      visible={open} // Controls visibility of the modal
      onCancel={() => setOpen(false)} // Close modal when clicking the close button
      onOk={() => setOpen(false)} // Close modal when clicking OK
      width={800} // Optional: Set the width of the modal
      footer={null} // Optional: Hides the footer
    >
      <div
        className={` p-4
      ${bgColor} ${textColor} 
        `}
      >
        <h1 className="text-xl font-bold">Notifications</h1>
        {registerService.length === 0 ? (
          <p>No pending registrations or cancellations.</p>
        ) : (
          registerService.map((item, index) => (
            <div
              key={index}
              className="mt-4 p-3 border border-gray-300 rounded-md  flex"
              onClick={() => {
                handleClickNotification(item._id);
              }}
            >
              <>
                {item.user.avatar ? (
                  <img
                    src={item.user.avatar}
                    alt="avatar"
                    className="rounded-full w-[50px] h-[50px] mr-4"
                  />
                ) : (
                  <i className="fa fa-user-circle fa-3x text-[#2b6534] mr-4"></i>
                )}
              </>
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                >
                  {item.user.name} in{" "}
                  <span style={{ color: "blue" }}>{item.room.roomName}</span>
                </p>
                <p>
                  {item.type
                    ? `${item.user.name} want to register
                the service `
                    : `${item.user.name} want to cancelc the service `}
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    {item.service.serviceName}
                  </span>
                  .
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default NotificationModal;