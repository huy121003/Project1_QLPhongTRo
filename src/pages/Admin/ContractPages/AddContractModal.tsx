import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  message,
  notification,
} from "antd";
import dayjs from "dayjs";
import { IAccount, IRoom } from "../../../interfaces";
import { accountApi, contractApi, roomApi } from "../../../api";
import { ContractStatus } from "../../../enums";

interface Props {
  openAddContract: boolean;
  setOpenAddContract: (value: boolean) => void;
}

const AddContractModal: React.FC<Props> = ({
  openAddContract,
  setOpenAddContract,
}) => {
  const [time, setTime] = useState({
    number: 0,
    unit: "month",
  });
  const [form] = Form.useForm();
  const [tenants, setTenants] = useState<IAccount[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [choosenTenant, setChoosenTenant] = useState<any>({
    _id: "",
    name: "",
    idCard: "",
    phone: "",
  });
  const [choosenRoom, setChoosenRoom] = useState<any>({
    _id: "",
    roomName: "",
    price: "",
  });
  useEffect(() => {
    form.setFieldsValue({
      deposit: choosenRoom?.price || 0,
      startDate: dayjs(),
    });
  }, [choosenRoom]);

  useEffect(() => {
    const getTenant = async () => {
      const response = await accountApi.fecthAccountApi(
        `pageSize=1000&current=1&populate=role&fields=role.name`
      );
      if (response.data) {
        const tenants = response.data.result.filter(
          (tenant: IAccount) => tenant.role.name === "NORMAL USER"
        );
        setTenants(tenants);
      } else {
        notification.error({
          message: "Error",
          description:response.message,
        });
      }
    };
    const getRoom = async () => {
      const response = await roomApi.fetchRoomApi(
        "pageSize=1000&currentPage=1&status=AVAILABLE"
      );
      if (response.data) {
        setRooms(response.data.result);
      } else {
        notification.error({
          message: "Error",
          description: response.message,
        });
      }
    };
    getTenant();
    getRoom();
  }, [openAddContract]);

  const handleOk = async () => {
    const values = await form.validateFields();
    const endDate = dayjs(values.startDate)
      .add(time.number, time.unit as dayjs.ManipulateType)
      .toDate();
    const response = await contractApi.postContractApi(
      choosenRoom,
      choosenTenant,
      values.startDate,
      endDate,
      values.address,
      values.deposit,
      values.rentCycleCount,
      ContractStatus.ACTIVE
    );
    if (response.statusCode === 201) {
      message.success("Contract added successfully");
      form.resetFields();
      setOpenAddContract(false);
    } else {
      notification.error({
        message: "Error",
        description: response.message,
      });
    }
  };

  return (
    <Modal
      title="Add Contract"
      open={openAddContract}
      onOk={handleOk}
      onCancel={() => {
        setOpenAddContract(false);
        form.resetFields();
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddContract(false);
            form.resetFields();
          }}
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tenant"
          name="tenantId"
          rules={[{ required: true, message: "Please select tenant" }]}
        >
          <Select
            onSelect={(value) =>
              setChoosenTenant(tenants.find((t) => t._id === value) || null)
            }
          >
            {tenants.map((tenant) => (
              <Select.Option key={tenant._id} value={tenant._id}>
                {tenant.name} - {tenant.phone}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Room"
          name="roomId"
          rules={[{ required: true, message: "Please select room" }]}
        >
          <Select
            onSelect={(value) =>
              setChoosenRoom(rooms.find((r) => r._id === value) || null)
            }
          >
            {rooms.map((room) => (
              <Select.Option key={room._id} value={room._id}>
                {room.roomName} - {room.price.toLocaleString()}đ
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: "Please select start date" }]}
            className="flex-1"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="End Date" name="endDate" className="flex-3">
            <Input.Group compact>
              <Input
                style={{ width: "60%" }}
                type="number"
                placeholder="Enter duration"
                onChange={(e) =>
                  setTime({ ...time, number: parseInt(e.target.value) || 0 })
                }
              />
              <Select
                defaultValue="month"
                style={{ width: "40%" }}
                onChange={(value) => setTime({ ...time, unit: value })}
              >
                <Select.Option value="month">Months</Select.Option>
                <Select.Option value="year">Years</Select.Option>
              </Select>
            </Input.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="Rent Cycel Count"
          name="rentCycleCount"
          rules={[{ required: true, message: "Please input rent cycle count" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Deposit"
          name="deposit"
          rules={[{ required: true, message: "Please input deposit" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddContractModal;
