import React, { useEffect } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message, App } from "antd";
import { postAccountApi } from "../../services/accountApi"; // Adjust the path to your API function

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Gender } from "../../models/AccountModel";


interface Props {
  openAddAccount: boolean;
  setOpenAddAccount: (value: boolean) => void;
}

const { Option } = Select;

const AddAccountModal: React.FC<Props> = ({
  openAddAccount,
  setOpenAddAccount,
}) => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm();
  const role=useAppSelector((state)=>state.role.role)
//  const [role, setRole] = React.useState<{ _id: string; name: string }[]>([]);

  const handleOk = async () => {
    // Validate the form fields
    const values = await form.validateFields();

    const birthdayDate = values.BirthDay.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);
console.log( typeof birthdayAsDate)
    // Call the API to post account data
    const response = await postAccountApi(
      values.Email,
      values.Phone,
      values.Password,
      values.Name,
      birthdayAsDate,
      values.Gender,
      values.Address,
      values.IdCard,
      values.Role
    );

    if (response.statusCode === 201) {
      message.success(response.message);
      form.resetFields(); // Reset form fields
      
      setOpenAddAccount(false); // Close modal on success
    } else {
      message.error(response.message);
    }
  };

  return (
    <Modal
      centered
      visible={openAddAccount}
      title={<h1 className="text-3xl font-bold text-center">Add Account</h1>}
      onCancel={() => {
        setOpenAddAccount(false);
        form.resetFields(); // Reset form fields
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenAddAccount(false);
            form.resetFields(); // Reset form fields
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          <p className="font-xl text-white flex">Add</p>
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={<span>Name</span>}
          name="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter tenant name" />
        </Form.Item>

        <Form.Item
          label={<span>Email</span>}
          name="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Enter  email" />
        </Form.Item>
        <Form.Item
          label={<span>Phone</span>}
          name="Phone"
          rules={[{ required: true, message: "Phone is required" }]}
        >
          <Input type="number" placeholder="Enter  phone" />
        </Form.Item>

        <Form.Item
          label={<span>Password</span>}
          name="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label={<span>Birthday</span>}
          name="BirthDay"
          rules={[{ required: true, message: "BirthDay is required" }]}
        >
          <DatePicker placeholder="Enter BirthDay" />
        </Form.Item>

        <Form.Item
          label={<span>Address</span>}
          name="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder="Enter tenant address" />
        </Form.Item>

        <Form.Item
          label={<span>IdCard</span>}
          name="IdCard"
          rules={[{ required: true, message: "IdCard is required" }]}
        >
          <Input type="number" placeholder="Enter  IdCard" />
        </Form.Item>

        <Form.Item
          label={<span>Gender</span>}
          name="Gender"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select placeholder="Select gender">
          {
            Object.values(Gender).map((gender) => (
              <Option key={gender} value={gender}>
                {gender}
              </Option>
            ))
          }
          </Select>
        </Form.Item>

        <Form.Item
          label={<span>Role</span>}
          name="Role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select placeholder="Select role">
            {role.map((r) => (
              <Option key={r._id} value={r._id}>
                {r.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
