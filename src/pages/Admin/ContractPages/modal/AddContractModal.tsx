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

import debounce from "lodash.debounce";
import { useTheme } from "contexts/ThemeContext";
import { IAccount, IAddress, IRoom } from "interfaces";
import addressApi from "api/addressApi/addressApi";
import accountApi from "api/accountApi/accountApi";
import roomApi from "api/roomApi/roomApi";
import contractApi from "api/contractApi/contractApi";
import { ContractStatus } from "enums";

interface Props {
  openAddContract: boolean;
  setOpenAddContract: (value: boolean) => void;
}

const AddContractModal: React.FC<Props> = ({
  openAddContract,
  setOpenAddContract,
}) => {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const [loading, setLoading] = useState(false);
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
  const [address, setAddress] = useState<IAddress[]>([]);

  // Hàm tìm kiếm địa chỉ
  const searchAddress = debounce(async (value: string) => {
    if (value) {
      try {
        //tách chuoi bằng +
        value = value.split(" ").join("+");
        const result = await addressApi.fecthAddress(value);
        setAddress(result);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  }, 500); // Debounce 500ms, có thể thay đổi tùy theo nhu cầu

  useEffect(() => {
    const currentStartDate = form.getFieldValue("startDate");
    form.setFieldsValue({
      deposit: choosenRoom?.price || 0,
      startDate: currentStartDate || dayjs(), // Giữ nguyên ngày đã chọn nếu có
    });
  }, [choosenRoom]);

  useEffect(() => {
    const getTenant = async () => {
      const response = await accountApi.fecthAccountApi(
        `pageSize=1000&current=1&populate=role&fields=role.name&isActive=true`
      );
      if (response.data) {
        const tenants = response.data.result.filter(
          (tenant: IAccount) => tenant.role.name === "NORMAL USER"
        );
        setTenants(tenants);
      } else {
        notification.error({
          message: "Error",
          description: response.message,
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
    setLoading(true);
    if (time.number <= 0) {
      notification.error({
        message: "Error",
        description: "Duration must be greater than 0",
      });
      setLoading(false);
      return;
    }
    if (values.rentCycleCount <= 0) {
      notification.error({
        message: "Error",
        description: "Rent cycle count must be greater than 0",
      });
      setLoading(false);
      return;
    }
    if (
      time.unit === "year" &&
      (time.number * 12) % values.rentCycleCount !== 0
    ) {
      notification.error({
        message: "Error",
        description: "Duration must be divisible by rent cycle count",
      });
      setLoading(false);
      return;
    }
    if (time.unit === "month" && time.number % values.rentCycleCount !== 0) {
      notification.error({
        message: "Error",
        description: "Duration must be divisible by rent cycle count",
      });
      setLoading(false);
      return;
    }
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
    setLoading(false);
  };

  return (
    <Modal
      closable={false}
      //  title="Add Contract"
      open={openAddContract}
      onOk={handleOk}
      onCancel={() => {
        setOpenAddContract(false);
        form.resetFields();
      }}
      footer={null}
    >
      <div
        className={`
   ${bgColor} ${textColor} p-4
    `}
      >
        <h1
          className={`text-3xl font-bold text-center
        ${textColor} ${bgColor}
        
        `}
        >
          Add Contract
        </h1>
        <Form form={form} layout="vertical">
          <Form.Item
            label={
              <span
                className={`
           ${bgColor} ${textColor}
              `}
              >
                Tenant
              </span>
            }
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
            label={
              <span
                className={`
              ${textColor} ${bgColor}
        
              `}
              >
                Room
              </span>
            }
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
              label={
                <span
                  className={`
              ${textColor} ${bgColor}
        
              `}
                >
                  Start Date
                </span>
              }
              name="startDate"
              rules={[{ required: true, message: "Please select start date" }]}
              className="flex-1"
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label={
                <span
                  className={`
             ${textColor} ${bgColor}
        
              `}
                >
                  Duration
                </span>
              }
              name="endDate"
              className="flex-3"
            >
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
            label={
              <span
                className={`
             ${textColor} ${bgColor}
        
              `}
              >
                Rent Cycle Count
              </span>
            }
            name="rentCycleCount"
            rules={[
              { required: true, message: "Please input rent cycle count" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={
              <span
                className={`
             ${textColor} ${bgColor}
        
              `}
              >
                Address
              </span>
            }
            name="address"
            rules={[{ required: true, message: "Please input address" }]}
          >
            <Select
              showSearch
              onSearch={searchAddress} // Khi người dùng nhập vào trường này, gọi hàm tìm kiếm
              placeholder="Select address"
              size="large"
              filterOption={false} // Tắt chức năng filter mặc định của Ant Design
            >
              {address.map((a) => (
                <Select.Option key={a.place_id} value={a.display_name}>
                  {a.display_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <span
                className={`
             ${textColor} ${bgColor}
        
              `}
              >
                Deposit
              </span>
            }
            name="deposit"
            rules={[{ required: true, message: "Please input deposit" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
        <div className="mt-4 flex-1 justify-end text-end gap-2">
          <Button
            key="back"
            onClick={() => {
              setOpenAddContract(false);
              form.resetFields();
            }}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={loading}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddContractModal;
