import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select, notification } from "antd";
import { IService } from "../../../interfaces";
import { ServiceType } from "../../../enums";
import { serviceApi } from "../../../api";

interface Props {
  openEditService: boolean;
  setOpenEditService: (value: boolean) => void;
  service: IService | null;
}

const EditServiceModal: React.FC<Props> = ({
  openEditService,
  setOpenEditService,
  service,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        serviceName: service.serviceName,
        description: service.description,
        price: service.price,
        unit: service.unit,
        type: service.type,
      });
    }
  }, [service, form, openEditService]);

  const handleOk = async () => {
   
      const values = await form.validateFields();
      const response = await serviceApi.patchServiceApi(
        service?._id || "",
        values.serviceName,
        values.description,
        values.price,
        values.unit,
        values.type
      );
      if (response.statusCode === 200) {
        message.success("Service updated successfully");

        form.resetFields(); // Reset form fields
        setOpenEditService(false); // Close modal on success
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
 
      }
   
  };

  return (
    <Modal
      centered
      open={openEditService}
      title={<h1 className="text-3xl font-bold text-center">Edit Service</h1>}
      onCancel={() => {
        setOpenEditService(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenEditService(false);
            form.resetFields();
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="serviceName"
          label={<span>Service Name</span>}
          rules={[
            { required: true, message: "Please input the service name!" },
          ]}
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
          rules={[
            { required: true, message: "Please select the service type!" },
          ]}
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

export default EditServiceModal;
