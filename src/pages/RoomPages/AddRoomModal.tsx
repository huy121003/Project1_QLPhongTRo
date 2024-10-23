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
import { postRoomApi } from "../../services/roomApis";
import { RoomStatus, RoomType } from "../../models/RoomModel";
interface Props {
    openAddRoom: boolean;
    setOpenAddRoom: (value: boolean) => void;
    }
const AddRoomModal: React.FC<Props> = ({ openAddRoom, setOpenAddRoom }) => {
  const [form] = Form.useForm();
  const handleOk = async () => {
    const values = await form.validateFields();
    const response = await postRoomApi(
      values.roomName,
      values.type,
      RoomStatus.Available,
      values.price,
     
      values.description,
      []
    );
    if (response.statusCode === 201) {
      message.success(response.message);
      form.resetFields();
      setOpenAddRoom(false);
      
    } else {
      message.error(response.message);
    }
  };


  return (
    <Modal
      title="Add Room"
      centered
      open={openAddRoom}
      onOk={handleOk}
      onCancel={() => {
        setOpenAddRoom(false);
        form.resetFields();
      }
      }
      footer={[
        <Button key="back" onClick={() => {
          setOpenAddRoom(false);
          form.resetFields();
        }}
        className="mr-2">
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
          name="roomName"
          label={<span>Room Name</span>}
          rules={[{ required: true, message: "Please input the room name!" }]}
        >
          <Input placeholder="Enter RoomName" />
        </Form.Item>
        <Form.Item
          name="type"
          label={<span>Type</span>}
          rules={[{ required: true, message: "Please select the room type!" }]}
        >
<Select>
 {Object.values(RoomType).map((type) => (
    <Select.Option key={type} value={type}>
      {type}
    </Select.Option>
 ))}
</Select>
        </Form.Item>
        <Form.Item
          name="price"
          label={<span>Price</span>}
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" placeholder="Enter Price" />
        </Form.Item>
        
       <Form.Item
            name="description"
            label={<span>Description</span>}
            rules={[{ required: true, message: "Please input the description!" }]}
            >
            <Input placeholder="Enter Description" />
            </Form.Item>
      </Form>
    </Modal>
  );
};


export default AddRoomModal
