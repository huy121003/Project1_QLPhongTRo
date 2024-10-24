import React from "react";
import { Modal, Button, Input, Form, Select, message } from "antd";
import { postServiceApi } from "../../services/serviceApi";
import { ServiceType } from "../../models/ServiceModel";

interface Props {
  openAddService: boolean;
  setOpenAddService: (value: boolean) => void;
}

const AddServiceModal: React.FC<Props> = ({ openAddService, setOpenAddService }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await postServiceApi(
        values.serviceName,
        values.description,
        values.price,
        values.unit,
        values.type
      );
      if (response.statusCode === 201) {
        message.success(response.message);
        form.resetFields();
        setOpenAddService(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Validation failed!");
    }
  };

  return (
    <Modal
      title="Add Service"
      centered
      visible={openAddService}
      onOk={handleOk}
      onCancel={() => {
        setOpenAddService(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddService(false);
            form.resetFields();
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="serviceName"
          label={<span>Service Name</span>}
          rules={[{ required: true, message: "Please input the service name!" }]}
        >
          <Input placeholder="Enter Service Name" />
        </Form.Item>
        <Form.Item
          name="description"
          label={<span>Description</span>}
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input placeholder="Enter Description" />
        </Form.Item>
        <Form.Item
          name="price"
          label={<span>Price</span>}
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" placeholder="Enter Price" />
        </Form.Item>
        <Form.Item
          name="unit"
          label={<span>Unit</span>}
          rules={[{ required: true, message: "Please input the unit!" }]}
        >
          <Input placeholder="Enter Unit" />
        </Form.Item>
        <Form.Item
          name="type"
          label={<span>Type</span>}
          rules={[{ required: true, message: "Please select the service type!" }]}
        >
          <Select placeholder="Select Type">
            {Object.values(ServiceType).map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceModal;