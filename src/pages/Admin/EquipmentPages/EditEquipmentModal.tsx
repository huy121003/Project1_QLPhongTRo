import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";

import { patchEquipmentApi } from "../../../services/eqiupmentApi";
import { EquipmentModel, EquipmentStatus } from "../../../models/EquipmentModel";
interface Props {
    openEditEquipment: boolean;
    setOpenEditEquipment: (value: boolean) => void;
    record: EquipmentModel;
}
const EditEquipmentModal: React.FC<Props> = ({ openEditEquipment, setOpenEditEquipment, record }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (openEditEquipment && record) {
            form.setFieldsValue({
                name: record.name,
                status: record.status,
                price: record.price,
                description: record.description
            });
        }
    }, [openEditEquipment, record, form]);
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const response = await patchEquipmentApi(
                record._id,
                values.name,
                values.status,
                values.price,
                values.description
            );
            if (response.statusCode === 200) {
                message.success(response.message);
                form.resetFields();
                setOpenEditEquipment(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    }

  return (
  <Modal
  centered
    open={openEditEquipment}
    title={<h1 className="text-3xl font-bold text-center">Edit Equipment</h1>}
    onCancel={() => {
      setOpenEditEquipment(false);
      form.resetFields(); // Reset form fields
    }}

    footer={[
      <Button
        key="back"
        onClick={() => {
          setOpenEditEquipment(false);
          form.resetFields(); // Reset form fields
        }}
      >
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        <p className="font-xl text-white flex">Edit</p>
      </Button>,
    ]}
    width={700}
  >
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: "Please input the status!" }]}
      >

        <Select>
         {
          Object.values(EquipmentStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))
         }
        </Select>
    
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input placeholder="Description" />
      </Form.Item>
    </Form> 
  </Modal>
  )
}

export default EditEquipmentModal
