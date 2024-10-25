import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";

import { patchRoomApi } from "../../services/roomApis";
import RoomModel, { RoomStatus, RoomType } from "../../models/RoomModel";
interface Props {
    openEditRoom: boolean;
    setOpenEditRoom: (value: boolean) => void;
    record: RoomModel;
}
const EditRoomModal:React.FC<Props>=({ openEditRoom,setOpenEditRoom,record})=> {
  const [form] = Form.useForm();
  useEffect(() => {
    if (openEditRoom && record) {
        form.setFieldsValue({
            roomName: record.roomName,
            type: record.type,
            price: record.price,
            status: record.status,
            description: record.description
        });
    }
}
, [openEditRoom, record, form]);
const handleOk = async () => {
    try {
        const values = await form.validateFields();
        const response = await patchRoomApi(
            record._id,
           // values.roomName,
            values.type,
           /// values.status,
            values.price,
           
            values.description,
            []
        );
        if (response.statusCode === 200) {
            message.success(response.message);
            form.resetFields();
            setOpenEditRoom(false);
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
      open={openEditRoom}
      title={<h1 className="text-3xl font-bold text-center">Edit Room</h1>}
      onCancel={() => {
        setOpenEditRoom(false);
        form.resetFields(); // Reset form fields
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenEditRoom(false);
            form.resetFields(); // Reset form fields
          }}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Room Name"
          name="roomName"
          rules={[{ required: true, message: "Please input room name!" }]}
         
        >
          <Input  placeholder="Enter RoomName"  disabled/>
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select room type!" }]}
        >
          <Select>
            <Select.Option value={RoomType.Single}>{RoomType.Single}</Select.Option>
            <Select.Option value={RoomType.Double}>{RoomType.Double}</Select.Option>
            <Select.Option value={RoomType.Quad}>{RoomType.Quad}</Select.Option>
            <Select.Option value={RoomType.Studio}>{RoomType.Studio}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select room status!" }]}
        >
          <Select  disabled>
            <Select.Option value={RoomStatus.Available}>{RoomStatus.Available}</Select.Option>
            <Select.Option value={RoomStatus.Occupied}>{RoomStatus.Occupied}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price!" }]}
        >
          <Input type="number" placeholder="Enter price" />

          </Form.Item>
          <Form.Item
          label="Desciption"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
          >
          <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          </Form>

    </Modal>
  )
}

export default EditRoomModal
