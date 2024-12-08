import React, { useState } from "react";
import { Modal, Button, Input, DatePicker, Form, Select } from "antd";
import { IContract } from "../../../interfaces";
import moment from "moment";

interface Props {
    openAddContract: boolean;
    setOpenAddContract: (value: boolean) => void;
    contractextension: IContract;
}

const ContractExtension: React.FC<Props> = ({
    openAddContract,
    setOpenAddContract,
    contractextension,
}) => {
    console.log(contractextension);
    const [time, setTime] = useState({
        number: 0,
        unit: "month",
    });
    const [form] = Form.useForm();

    const handleOk = async () => {
        const values = await form.validateFields();
        alert(values);
    };

    return (
        <Modal
            title="Contract Extension"
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
                    Extend
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    tenantId: contractextension?.tenant?.name,
                    roomId: contractextension?.room?.roomName,
                    address: contractextension?.tenant.address,
                    deposit: contractextension?.depositAmount,
                    rentCycleCount: contractextension?.rentCycleCount,
                    startDate: contractextension?.endDate
                        ? moment(contractextension?.endDate)
                        : null,
                }}
            >
                <Form.Item
                    label="Tenant"
                    name="tenantId"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Room"
                    name="roomId"

                >
                    <Select disabled></Select>
                </Form.Item>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Form.Item
                        label="Start Date"
                        name="startDate"
                        className="flex-1"
                    >
                        <DatePicker  />
                    </Form.Item>
                    <Form.Item
                        label="End Date"
                        name="endDate"
                        className="flex-3"
                        rules={[
                            {
                                required: true,
                                message: "Please select start date",
                            },
                        ]}
                    >
                        <Input.Group compact>
                            <Input
                                style={{ width: "60%" }}
                                type="number"
                                placeholder="Enter duration"
                                onChange={(e) =>
                                    setTime({
                                        ...time,
                                        number: parseInt(e.target.value) || 0,
                                    })
                                }
                            />
                            <Select
                                defaultValue="month"
                                style={{ width: "40%" }}
                                onChange={(value) =>
                                    setTime({ ...time, unit: value })
                                }
                            >
                                <Select.Option value="month">
                                    Months
                                </Select.Option>
                                <Select.Option value="year">
                                    Years
                                </Select.Option>
                            </Select>
                        </Input.Group>
                    </Form.Item>
                </div>
                <Form.Item label="Rent Cycel Count" name="rentCycleCount">
                    <Input type="number" disabled />
                </Form.Item>
                <Form.Item label="Address" name="address">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Deposit" name="deposit">
                    <Input type="number" disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ContractExtension;
