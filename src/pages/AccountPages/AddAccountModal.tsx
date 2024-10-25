import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  message,
  
} from "antd";
import { postAccountApi } from "../../services/accountApi"; // Adjust the path to your API function


import { Gender } from "../../models/AccountModel";
import { fecthRoleApi } from "../../services/roleApi";
import { RoleModel } from "../../models/RoleModel";

interface Props {
  openAddAccount: boolean;
  setOpenAddAccount: (value: boolean) => void;
}

const { Option } = Select;

const AddAccountModal: React.FC<Props> = ({
  openAddAccount,
  setOpenAddAccount,
}) => {
  const [role, setRole] = useState<RoleModel[]>([]);
  useEffect(() => {
    const getRole = async () => {
      const res = await fecthRoleApi("current=1&pageSize=1000");
      if (res?.data) {
    
        setRole(res.data.result);
      } else message.error(res.message);
    };
    getRole();
  }
    , [ openAddAccount]);

  const [form] = Form.useForm();
 

  const handleOk = async () => {
    // Validate the form fields
    const values = await form.validateFields();

    // Combine first name, middle name, and last name into a single name
    const fullName =
      `${values.FirstName} ${values.MiddleName} ${values.LastName}`.trim();

    const birthdayDate = values.BirthDay.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);

    // Call the API to post account data
    const response = await postAccountApi(
      values.Email,
      values.Phone,
      values.Password,
      fullName, // Use the combined full name
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
      open={openAddAccount}
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
        <Form.Item label={<span>Name</span>} wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="FirstName"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
              className="mr-2 flex-1"
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="MiddleName" className="mr-2 flex-1">
              <Input placeholder="Middle Name" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              className="mr-2 flex-1"
              label={<span>Email</span>}
              name="Email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              className="mr-2 flex-1"
              label={<span>Phone</span>}
              name="Phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input type="number" placeholder="Enter phone" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label={<span>Password</span>}
              name="Password"
              rules={[{ required: true, message: "Password is required" }]}
              className="mr-2 flex-1"
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              label={<span>IdCard</span>}
              name="IdCard"
              rules={[{ required: true, message: "IdCard is required" }]}
              className="mr-2 flex-1"
            >
              <Input type="number" placeholder="Enter IdCard" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label={<span>Birthday</span>}
              name="BirthDay"
              rules={[{ required: true, message: "Birthday is required" }]}
              className="mr-2 flex-1"
            >
              <DatePicker placeholder="Enter Birthday" />
            </Form.Item>
            <Form.Item
              label={<span>Gender</span>}
              name="Gender"
              rules={[{ required: true, message: "Gender is required" }]}
              className="mr-2 flex-1"
            >
              <Select placeholder="Select gender">
                {Object.values(Gender).map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={<span>Role</span>}
              name="Role"
              rules={[{ required: true, message: "Role is required" }]}
              className="mr-2 flex-1"
            >
              <Select placeholder="Select role"
              
              
                dropdownRender={(menu) => (
                  <div className="max-h-[150px] overflow-y-auto">
                    {menu}
                  </div>
                )}>
                {role.map((r) => (
                  <Option key={r._id} value={r._id}>
                    {r.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          label={<span>Address</span>}
          name="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
