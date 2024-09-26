import React from "react";
import { Modal, Button, Input, Form } from "antd";

interface Props {
  openAddService: boolean;
  setOpenAddService: (value: boolean) => void;
}

const AddServiceModal: React.FC<Props> = ({
  openAddService,
  setOpenAddService,
}) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields() // Validate tất cả các trường trong form
      .then((values) => {
        console.log("All data is valid:", values);
        setOpenAddService(false); // Đóng modal sau khi đăng ký thành công
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      centered
      visible={openAddService}
      title={<h1 className="text-3xl font-bold text-center">Add Service</h1>}
      onOk={handleOk}
      onCancel={() => setOpenAddService(false)}
      footer={[
        <Button key="back" onClick={() => setOpenAddService(false)} className="mr-2">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          <p className="font-xl text-white">Add</p>
        </Button>,
      ]}
      width={600}
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
          <Input type="number" placeholder="Enter service price" className="text-xl" />
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

export default AddServiceModal;
