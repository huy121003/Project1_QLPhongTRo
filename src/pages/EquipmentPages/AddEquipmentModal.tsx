import React, { useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  message,
  App,
} from "antd";
import { postEquipmentApi } from "../../services/eqiupmentApi";
import { EquipmentStatus } from "../../models/EquipmentModel";
interface Props {
  openAddEquipment: boolean;
  setOpenAddEquipment: (value: boolean) => void;
}
const AddEquipmentModal: React.FC<Props> = ({
  openAddEquipment,
  setOpenAddEquipment,
}) => {
  const [form] = Form.useForm();
  const hanleOk = async () => {
    const values = await form.validateFields();
    const response = await postEquipmentApi(
      values.name,
      values.status,
      values.price,
      values.description
    );
    if (response.statusCode === 201) {
      message.success(response.message);
      form.resetFields();
      setOpenAddEquipment(false);
    } else {
      message.error(response.message);
    }
  }

  return (
    <Modal
      centered
      open={openAddEquipment}
      title={<h1 className="text-3xl font-bold text-center">Add Equipment</h1>}
      onCancel={() => {
        setOpenAddEquipment(false);
        form.resetFields(); // Reset form fields
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddEquipment(false);
            form.resetFields(); // Reset form fields
          }}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={hanleOk}>
             <p className="font-xl text-white flex">Add</p>
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      
       
      >
        <Form.Item
          label={<span>Name</span>}
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter equipment name" />
        </Form.Item>
        <Form.Item
          label={<span>Price</span>}
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          label={<span>Status</span>}
          name="status"
          rules={[{ required: true, message: "Status is required" }]}
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
          label={<span>Description</span>}
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEquipmentModal;
