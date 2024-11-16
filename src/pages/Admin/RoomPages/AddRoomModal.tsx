import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  message,
  Collapse,
  Switch,
  Form,
} from "antd";
import { IService } from "../../../interfaces";
import { roomApi, serviceApi } from "../../../api";
import { RoomStatus, RoomType } from "../../../enums";
interface Props {
  openAddRoom: boolean;
  setOpenAddRoom: (value: boolean) => void;
}

const AddRoomModal: React.FC<Props> = ({ openAddRoom, setOpenAddRoom }) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState<IService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [enableService, setEnableService] = useState<string[]>([]);

  useEffect(() => {
    const getService = async () => {
      setIsLoading(true);
      try {
        const response = await serviceApi.fetchServiceApi(
          "pageSize=1000&currentPage=1"
        );
        if (response.data) {
          setServices(response.data.result);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error("Failed to fetch services");
      } finally {
        setIsLoading(false);
      }
    };
    getService();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (enableService.length === 0) {
        message.error("Please select at least one service");
        return;
      }

      setIsLoading(true);
      const response = await roomApi.postRoomApi(
        values.roomName,
        values.Area,
        values.type,
        RoomStatus.Available,
        values.price,
        values.description,
        enableService
      );

      if (response.statusCode === 201) {
        message.success("Room created successfully");
        form.resetFields();
        setOpenAddRoom(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to create room");
    } finally {
      setIsLoading(false);
    }
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
      title="Add Room"
      centered
      open={openAddRoom}
      onOk={handleOk}
      onCancel={() => {
        setOpenAddRoom(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddRoom(false);
            form.resetFields();
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleOk}
        >
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
          <Input placeholder="Enter Room Name" />
        </Form.Item>
        <Form.Item
          name="type"
          label={<span>Type</span>}
          rules={[{ required: true, message: "Please select the room type!" }]}
        >
          <Select placeholder="Select Room Type">
            {Object.values(RoomType).map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="Area"
          label={<span>Area</span>}
          rules={[{ required: true, message: "Please input the area!" }]}
        >
          <Input type="number" placeholder="Enter Area" />
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
      <div className="my-2" />
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

export default AddRoomModal;
