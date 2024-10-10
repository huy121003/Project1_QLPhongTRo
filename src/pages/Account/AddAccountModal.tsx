import React, { useEffect } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message } from "antd";
import { postAccountApi } from "../../services/accountApi"; // Adjust the path to your API function
import { fecthRoleApi } from "../../services/roleApi";

interface Props {
  openAddAccount: boolean;
  setOpenAddAccount: (value: boolean) => void;
}

const { Option } = Select;

const AddAccountModal: React.FC<Props> = ({
  openAddAccount,
  setOpenAddAccount,
}) => {
  const [form] = Form.useForm();

  const [role, setRole] = React.useState<{ _id: string; name: string }[]>([]);
  useEffect(() => {
    const fetchRole = async () => {
      const res = await fecthRoleApi();
      console.log(res);
      setRole(res.data.result);
    };
    fetchRole();
  }, []);
  const handleOk = async () => {
    // Validate the form fields
    const values = await form.validateFields();
    console.log("Received values:", values);

    // Call the API to post account data
    const response = await postAccountApi(
      values.Email,
      values.Password,
      values.Name,
      values.Age,
      values.Gender,
      values.Address,
      values.IdCard,
      values.Role
    );

    // console.log("Account added successfully:", response);
    // Optionally handle success notification or further actions
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
          label={
            <span>
              Name <span className="text-red-600">*</span>
            </span>
          }
          name="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter tenant name" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Email <span className="text-red-600">*</span>
            </span>
          }
          name="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input placeholder="Enter  email" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Password <span className="text-red-600">*</span>
            </span>
          }
          name="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Age <span className="text-red-600">*</span>
            </span>
          }
          name="Age"
          rules={[{ required: true, message: "Age is required" }]}
        >
          <Input type="number" placeholder="Enter  age" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Address <span className="text-red-600">*</span>
            </span>
          }
          name="Address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder="Enter tenant address" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              IdCard <span className="text-red-600">*</span>
            </span>
          }
          name="IdCard"
          rules={[{ required: true, message: "IdCard is required" }]}
        >
          <Input type="number" placeholder="Enter  IdCard" />
        </Form.Item>

        <Form.Item
          label={
            <span>
              Gender <span className="text-red-600">*</span>
            </span>
          }
          name="Gender"
          rules={[{ required: true, message: "Gender is required" }]}
        >
          <Select placeholder="Select gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={
            <span>
              Role <span className="text-red-600">*</span>
            </span>
          }
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
