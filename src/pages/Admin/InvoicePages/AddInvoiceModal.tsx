import React, { useEffect, useState } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message } from "antd";
import dayjs from "dayjs";
import ContractModel  from "../../../models/ContractModel";
import { fetchContractApi } from "../../../services/contractApi";
import { fetchServiceApi } from "../../../services/serviceApi";
import { ServiceType } from "../../../models/ServiceModel";
import { postInvoiceApi } from "../../../services/invoiceApi";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const AddInvoiceModal: React.FC<Props> = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [contract, setContract] = useState<ContractModel[]>([]);
  const [services, setServices] = useState<any>([]);
  const [choosenTenant, setChoosenTenant] = useState<any>({
    _id: "",
    name: "",
    idCard: "",
    phone: "",
  });
  const [choosenRoom, setChoosenRoom] = useState<any>({
    _id: "",
    roomName: "",
  });

  const [choosenService, setChoosenService] = useState<any>({
    _id: "",
    name: "",
    priceUnit: "",
    unit: "",
  });
  const [choosenType, setChoosenType] = useState<any>("");
  const [price, setPrice] = useState(0);
  const [number, setNumber] = useState({
    firstIndex: 0,
    finalIndex: 0,
  });
  useEffect(() => {
    const getContract = async () => {
      const response = await fetchContractApi(
        `pageSize=1000&currentPage=1&status=ACTIVE`
      );

      if (response.data) {
        setContract(response.data.result);
        console.log(response.data.result);
      } else {
        message.error(response.message);
      }
    };
    const getService = async () => {
      const response = await fetchServiceApi(`pageSize=1000&currentPage=1`);

      if (response.data) {
        setServices(response.data.result);
      } else {
        message.error(response.message);
      }
    };

    getService();
    getContract();
  }, [open]);

  useEffect(() => {
    form.setFieldsValue({
      priceUnit: choosenService?.priceUnit || 0,
      totalNumber: number.finalIndex - number.firstIndex,
      month: dayjs(),
      amount:
        choosenType === ServiceType.Electricity ||
        choosenType === ServiceType.Water
          ? (number.finalIndex - number.firstIndex) * choosenService?.priceUnit
          : choosenService?.priceUnit,
    });
  }, [choosenService, price, number]);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values.month.format("MM-YYYY"));
      const response = await postInvoiceApi(
        choosenRoom,
        choosenTenant,
        choosenService,
        values.month,
        new Date(),
        choosenType === ServiceType.Electricity ||
          choosenType === ServiceType.Water
          ? number.finalIndex - number.firstIndex
          : 1,
        choosenType === ServiceType.Electricity ||
          choosenType === ServiceType.Water
          ? (number.finalIndex - number.firstIndex) * choosenService?.priceUnit
          : choosenService?.priceUnit,
        values.description,
        choosenType === ServiceType.Electricity ||
          choosenType === ServiceType.Water
          ? number.firstIndex
          : 0,
        choosenType === ServiceType.Electricity ||
          choosenType === ServiceType.Water
          ? number.finalIndex
          : 1
      );
      if (response.statusCode === 201) {
        message.success(response.message);
        form.resetFields();
        setOpen(false);
        setChoosenTenant({});
        setChoosenRoom({});
        setChoosenService({});
        setChoosenType("");
        setPrice(0);
        setNumber({
          firstIndex: 0,
          finalIndex: 0,
        });
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
      open={open}
      title={<h1 className="text-3xl font-bold text-center">Add Invoice</h1>}
      onCancel={() => {
        setOpen(false);
        form.resetFields(); // Reset form fields
        setChoosenTenant({});
        setChoosenRoom({});
        setChoosenService({});
        setChoosenType("");
        setPrice(0);
        setNumber({
          firstIndex: 0,
          finalIndex: 0,
        });
      }}
      footer={[
        <Button
          size="large"
          key="back"
          onClick={() => {
            setOpen(false);
            form.resetFields(); // Reset form fields
            setChoosenTenant({});
            setChoosenRoom({});
            setChoosenService({});
            setChoosenType("");
            setPrice(0);
            setNumber({
              firstIndex: 0,
              finalIndex: 0,
            });
          }}
        >
          Cancel
        </Button>,
        <Button size="large" key="submit" type="primary" onClick={handleOk}>
          <p className="font-xl text-white flex">Add</p>
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tenant-Room"
          name="tenant-room"
          rules={[{ required: true, message: "Please select tenant-room" }]}
        >
          <Select
            onSelect={(value) => {
              const tenant = contract.find((item) => item._id === value);
              setChoosenTenant(tenant?.tenant);
              setChoosenRoom(tenant?.room);
              setPrice(tenant?.room.price ?? 0);
            }}
            size="large"
          >
            {contract.map((item) => (
              <Select.Option key={item._id} value={item._id}>
                {item.tenant.name} - {item.room.roomName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {choosenTenant._id ? (
          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please select service" }]}
          >
            <Select
              size="large"
              onSelect={(value) => {
                const selectedService = services.find(
                  (item: any) => item._id === value
                );
                setChoosenService({
                  _id: selectedService?._id,
                  name: selectedService?.serviceName,
                  priceUnit:
                    selectedService?.serviceName === "RoomFee"
                      ? price
                      : selectedService?.price,
                  unit: selectedService?.unit,
                });
                console.log(choosenService);

                setChoosenType(selectedService?.type);
              }}
            >
              {services.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.serviceName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        {choosenType === ServiceType.Electricity ||
        choosenType === ServiceType.Water ? (
          <>
            <Form.Item
              label="First Index"
              name="firstIndex"
              rules={[{ required: true, message: "Please input first index" }]}
            >
              <Input
                type="number"
                size="large"
                onChange={(e) =>
                  setNumber({ ...number, firstIndex: Number(e.target.value) })
                }
              />
            </Form.Item>
            <Form.Item
              label="Final Index"
              name="finalIndex"
              rules={[{ required: true, message: "Please input final index" }]}
            >
              <Input
                type="number"
                size="large"
                onChange={(e) =>
                  setNumber({ ...number, finalIndex: Number(e.target.value) })
                }
              />
            </Form.Item>
            <Form.Item
              label="Total Number"
              name="totalNumber"
              rules={[{ required: true, message: "Please input total" }]}
            >
              <Input type="number" size="large" disabled />
            </Form.Item>
          </>
        ) : null}
        <Form.Item
          label="Price"
          name="priceUnit"
          rules={[{ required: true, message: "Please input Price" }]}
        >
          <Input type="number" disabled size="large" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input amount" }]}
        >
          <Input type="number" size="large" disabled />
        </Form.Item>
        <Form.Item
          label="Month"
          name="month"
          rules={[{ required: true, message: "Please select month" }]}
        >
          <DatePicker picker="month" size="large" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input description" }]}
        >
          <Input size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddInvoiceModal;
