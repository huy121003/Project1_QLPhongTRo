import { Button, Form, Input, message, Modal, Select } from "antd";

import { registerServiceAPI } from "../../../api";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { IService } from "../../../interfaces";

type FieldType = {
  service?: string[];
  time?: string[];
};

type RegisterServiceProps = {
  setIsModalVisible: (value: boolean) => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  title: string;
  selectedService: IService;
  selectedRoomId: string;
  type: boolean;
};
export default function RegisterService({
  setIsModalVisible,
  handleCancel,
  isModalOpen,
  title,
  selectedService,
  selectedRoomId,
  type,
}: RegisterServiceProps) {
  const iduser = useAppSelector((state) => state.auth.user._id);
  const [executeNow, setExcuteNow] = useState(false);

  const handleSubmit = async () => {
    const res = await registerServiceAPI.postRegisterServiceApi(
      selectedService._id,
      iduser,
      selectedRoomId,
      type,
      executeNow
    );
    if (res.statusCode === 201) {
      // Đăng ký dịch vụ thành công
      message.success("Register service successfully");
      setIsModalVisible(false);
    }
  };

  // Hàm xử lý thay đổi giá trị trong Select
  const handleChange = (value: string) => {
    setExcuteNow(value === "now");
  };

  return (
    <Modal
      title={
        <div
          style={{
            color: "#2b6534",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "26px",
          }}
        >
          {title}
        </div>
      }
      open={isModalOpen}
      onOk={() => setIsModalVisible(false)}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item<FieldType>
          label={
            <span style={{ fontSize: "18px", color: "#2b6534" }}>Service</span>
          }
          name="service"
          initialValue={selectedService.serviceName}
          style={{ fontSize: "26px", color: "#2b6534" }}
        >
          <Input
            style={{
              borderRadius: "8px",
              color: "#2b6534",
              fontSize: "16px",
            }}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label={
            <span style={{ fontSize: "18px", color: "#2b6534" }}>
              Registration time
            </span>
          }
          name="time"
        >
          <Select
            defaultValue="Now"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "now",
                label: (
                  <span
                    style={{
                      color: "#2b6534",
                      fontSize: "14px",
                    }}
                  >
                    Now
                  </span>
                ),
              },
              {
                value: "nextMonth",
                label: (
                  <span
                    style={{
                      color: "#2b6534",
                      fontSize: "14px",
                    }}
                  >
                    Next Month
                  </span>
                ),
              },
            ]}
          />
        </Form.Item>

        <Form.Item label={null} className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
