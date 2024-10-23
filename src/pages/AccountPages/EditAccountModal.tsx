import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message, Select, DatePicker } from "antd";
import moment from "moment"; // Import moment for date handling
import { patchAccountApi } from "../../services/accountApi";
import AccountModel, { Gender } from "../../models/AccountModel";
import { useAppSelector } from "../../redux/hook";

interface Props {
    openEditAccount: boolean;
    setOpenEditAccount: (value: boolean) => void;
    record: AccountModel;
}

const EditAccountModal: React.FC<Props> = ({ openEditAccount, setOpenEditAccount, record }) => {
    const [form] = Form.useForm();
   const role=useAppSelector((state)=>state.role.role)
    useEffect(() => {
        if (openEditAccount && record) {
            // Convert birthday to moment object
            const formattedBirthday = record.birthday
                ? moment(record.birthday)
                : null;
            console.log(formattedBirthday);
            form.setFieldsValue({
                Email: record.email,
                Phone: record.phone,
                Name: record.name,
                BirthDay: formattedBirthday, // Set moment object for DatePicker
                Gender: record.gender,
                Address: record.address,
                IdCard: record.idCard,
                Role: record.role._id
            });
        }
    }, [openEditAccount, record, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            
            // Convert DatePicker value to desired format (YYYY-MM-DD)
            const birthday = values.BirthDay ? values.BirthDay.format('YYYY-MM-DD') : null;

            const response = await patchAccountApi(
                record._id,     
                values.Phone,
                values.Name,
                birthday, // Send formatted birthday
                values.Gender,
                values.Address,
                values.IdCard,
                values.Role
            );
            if (response.statusCode === 200) {
                message.success(response.message);
                form.resetFields();
                setOpenEditAccount(false);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            centered
            open={openEditAccount}
            title={<h1 className="text-3xl font-bold text-center">Edit Account</h1>}
            onCancel={() => {
                setOpenEditAccount(false);
                form.resetFields(); // Reset form fields
            }}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        setOpenEditAccount(false);
                        form.resetFields(); // Reset form fields
                    }}
                >
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Save
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="Email"
                    label={<span>Email</span>}
                    rules={[{ required: true, message: "Please input the email!" }]}
                >
                    <Input placeholder="Enter Email"  disabled />
                </Form.Item>
                <Form.Item
                    name="Phone"
                    label={<span>Phone</span>}
                    rules={[{ required: true, message: "Please input the phone!" }]}
                >
                    <Input placeholder="Enter Phone" />
                </Form.Item>
                <Form.Item
                    name="Name"
                    label={<span>Name</span>}
                    rules={[{ required: true, message: "Please input the name!" }]}
                >
                    <Input placeholder="Enter Name" />
                </Form.Item>
                <Form.Item
                    name="BirthDay"
                    label={<span>Birthday</span>}
                    rules={[{ required: true, message: "Please input the birthday!" }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="Gender"
                    label={<span>Gender</span>}
                    rules={[{ required: true, message: "Please input the Gender!" }]}
                >
                    <Select>
                        {Object.values(Gender).map((item) => (
                            <Select.Option key={item} value={item}>
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="Address"
                    label={<span>Address</span>}
                    rules={[{ required: true, message: "Please input the address!" }]}
                >
                    <Input placeholder="Enter Address" />
                </Form.Item>
                <Form.Item
                    name="IdCard"
                    label={<span>IdCard</span>}
                    rules={[{ required: true, message: "Please input the IdCard!" }]}
                >
                    <Input placeholder="Enter IdCard" type="number" />
                </Form.Item>
                <Form.Item
                    name="Role"
                    label={<span>Role</span>}
                    rules={[{ required: true, message: "Please input the Role!" }]}
                >
                    <Select>
                       {
                        role.map((item) => (
                            <Select.Option key={item._id} value={item._id}>
                                {item.name}
                            </Select.Option>
                        ))

                       }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditAccountModal;
