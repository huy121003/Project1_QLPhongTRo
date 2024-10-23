import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";
import { patchServiceApi } from "../../services/serviceApi";

import { useAppDispatch } from "../../redux/hook";
import { updateServiceAction } from "../../redux/slice/service/serviceSlice";
import { ServiceModel, ServiceType } from "../../models/ServiceModel";

interface Props {
  openEditService: boolean;
  setOpenEditService: (value: boolean) => void;
  record: ServiceModel;
}

const EditServiceModal: React.FC<Props> = ({
  openEditService,
  setOpenEditService,
  record,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (openEditService && record) {
      form.setFieldsValue({
        serviceName: record.serviceName,
        description: record.description,
        price: String(record.price),
        unit: record.unit,
        type: record.type,
      });
    }
  }, [openEditService, record, form]);

  const handleOk = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();

      // Call the API to post account data
      const response = await patchServiceApi(
        record._id,
        values.serviceName,
        values.description,
        values.price,
        values.unit,
        values.type
      );

      if (response.statusCode === 200) {
        message.success(response.message);
        dispatch(updateServiceAction(response.data)); // Update service in Redux
        form.resetFields(); // Reset form fields
        setOpenEditService(false); // Close modal on success
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      centered
      open={openEditService}
      title={<h1 className="text-3xl font-bold text-center">Edit Service</h1>}
      onCancel={() => {
        setOpenEditService(false);
        form.resetFields(); // Reset form fields
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenEditService(false);
            form.resetFields(); // Reset form fields
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          <p className="font-xl text-white flex">Save</p>
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={<span>Name</span>}
          name="serviceName"
          rules={[{ required: true, message: "Service name is required" }]}
        >
          <Input placeholder="Enter service name" />
        </Form.Item>

        <Form.Item
          label={<span>Description</span>}
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          label={<span>Price</span>}
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <Input type="text" placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          label={<span>Unit</span>}
          name="unit"
          rules={[{ required: true, message: "Unit is required" }]}
        >
          <Input placeholder="Enter unit" />
        </Form.Item>
        <Form.Item
          label={<span>Type</span>}
          name="type"
          rules={[{ required: true, message: "Type is required" }]}
        >
          <Select>
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
