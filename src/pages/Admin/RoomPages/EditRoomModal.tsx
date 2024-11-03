import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Form,
  message,
  Select,
  Collapse,
  Switch,
} from "antd";

import { patchRoomApi } from "../../../services/roomApis";
import RoomModel, { RoomStatus, RoomType } from "../../../models/RoomModel";
import { ServiceModel } from "../../../models/ServiceModel";
import { fetchServiceApi } from "../../../services/serviceApi";
interface Props {
  openEditRoom: boolean;
  setOpenEditRoom: (value: boolean) => void;
  record: RoomModel;
}
const EditRoomModal: React.FC<Props> = ({
  openEditRoom,
  setOpenEditRoom,
  record,
}) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enableService, setEnableService] = useState<string[]>([]);
  useEffect(() => {
    const getService = async () => {
      setIsLoading(true);
    
        const response = await fetchServiceApi("pageSize=1000&currentPage=1");
        if (response.data) {
          setServices(response.data.result);
        } else {
          message.error(response.message);
        }
        setIsLoading(false);
    };
    getService();
  }, [record]);
  useEffect(() => {
    if (openEditRoom && record) {
      form.setFieldsValue({
        roomName: record.roomName,
        type: record.type,
        price: record.price,
        status: record.status,
        description: record.description,
      });
      setEnableService(record?.services);
    }
  }, [openEditRoom, record, form]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (enableService.length === 0) {
        message.error("Please select at least one service");
        return;
      }
      setIsLoading(true);
      const response = await patchRoomApi(
        record._id,
        values.type,
        status = record.status,
        values.price,
        values.description,
        enableService
      );
      if (response.statusCode === 200) {
        message.success("Room updated successfully");
        form.resetFields();
        setOpenEditRoom(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
    setIsLoading(false);
  };
  const handleSwitchChange = (checked: boolean, id: string) => {
    if (checked) {
      setEnableService((prev) => [...prev, id]);
    } else {
      setEnableService((prev) => prev.filter((item) => item !== id));
    }
  };
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
        <Button key="submit" type="primary" onClick={handleOk} loading={isLoading}>
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
          <Input placeholder="Enter RoomName" disabled />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select room type!" }]}
        >
          <Select>
            <Select.Option value={RoomType.Single}>
              {RoomType.Single}
            </Select.Option>
            <Select.Option value={RoomType.Double}>
              {RoomType.Double}
            </Select.Option>
            <Select.Option value={RoomType.Quad}>{RoomType.Quad}</Select.Option>
            <Select.Option value={RoomType.Studio}>
              {RoomType.Studio}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select room status!" }]}
        >
          <Select disabled>
            <Select.Option value={RoomStatus.Available}>
              {RoomStatus.Available}
            </Select.Option>
            <Select.Option value={RoomStatus.Occupied}>
              {RoomStatus.Occupied}
            </Select.Option>
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
      <Collapse>
        <Collapse.Panel header="Services" key="1">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex items-center p-2 border border-gray-200 rounded-md bg-gray-100 my-1"
            >
              <p>{service.serviceName}</p>
              <Switch
                checked={enableService?.includes(service._id)}
                onChange={(checked: boolean) =>
                  handleSwitchChange(checked, service._id)
                }
                className="ml-auto"
              />
            </div>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Modal>
  );
};

export default EditRoomModal;
