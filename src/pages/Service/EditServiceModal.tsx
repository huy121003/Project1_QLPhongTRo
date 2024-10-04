import React, { useEffect } from "react";
import { Modal, Button, Input, Form } from "antd";
import ServiceModel from "../../models/ServiceModel";

interface Props {
  openUpdateService: boolean;
  setOpenUpdateService: (value: boolean) => void;
  selectedService: ServiceModel | null; // Nhận dịch vụ được chọn
}

const EditServiceModal: React.FC<Props> = ({
  openUpdateService,
  setOpenUpdateService,
  selectedService,
}) => {
  const [form] = Form.useForm();

  // Khi dịch vụ được chọn thay đổi, cập nhật giá trị cho form
  useEffect(() => {
    if (selectedService) {
      form.setFieldsValue({
        serviceName: selectedService.ServiceName,
        servicePrice: selectedService.ServicePrice,
        serviceDescription: selectedService.ServiceDescription,
      });
    } else {
      form.resetFields(); // Xóa dữ liệu khi không có dịch vụ được chọn
    }
  }, [selectedService, form]);

  const handleUpdate = () => {
    form
      .validateFields() // Kiểm tra tính hợp lệ của tất cả các trường
      .then((values) => {
        // Thực hiện cập nhật dịch vụ
        console.log("Updating service:", values);
        setOpenUpdateService(false); // Đóng modal sau khi cập nhật thành công
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      centered
      visible={openUpdateService}
      title={<h1 className="text-2xl font-bold">Update Service</h1>}
      onOk={handleUpdate}
      onCancel={() => setOpenUpdateService(false)}
      footer={[
        <Button key="back" onClick={() => setOpenUpdateService(false)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          <p className="font-xl text-white">Update</p>
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="serviceName"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input.TextArea placeholder="Enter service name" className="text-xl" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="servicePrice"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <Input
            type="number"
            placeholder="Enter service price"
            className="text-xl"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="serviceDescription"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input.TextArea placeholder="Enter service description" className="text-xl" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditServiceModal;
