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

const EditAccountModal: React.FC<Props> = ({
  openEditAccount,
  setOpenEditAccount,
  record,
}) => {
  const [form] = Form.useForm();
  const role = useAppSelector((state) => state.role.role);

  useEffect(() => {
    if (openEditAccount && record) {
      // Convert birthday to moment object
      const formattedBirthday = record.birthday
        ? moment(record.birthday)
        : null;

      // Split the name into three parts
      const nameParts = record.name.split(" ");
      const lastName = nameParts.pop(); // Get the last part as LastName
      const firstName = nameParts.shift(); // Get the first part as FirstName
      const middleName = nameParts.join(" "); // Join the remaining parts as MiddleName

      form.setFieldsValue({
        Email: record.email,
        Phone: record.phone,
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        BirthDay: formattedBirthday, // Set moment object for DatePicker
        Gender: record.gender,
        Address: record.address,
        IdCard: record.idCard,
        Role: record.role._id,
      });
    }
  }, [openEditAccount, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Convert DatePicker value to desired format (YYYY-MM-DD)
      const birthday = values.BirthDay
        ? values.BirthDay.format("YYYY-MM-DD")
        : null;

      const response = await patchAccountApi(
        record._id,
        values.Phone,
        `${values.FirstName} ${values.MiddleName} ${values.LastName}`, // Combine names back
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
      console.error("Validation failed:", error);
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
            <Form.Item
              name="MiddleName"
              style={{ flex: 1, marginRight: "8px" }}
            >
              <Input placeholder="Middle Name" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
              className="flex-1"
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="Email"
              label={<span>Email</span>}
              rules={[{ required: true, message: "Please input the email!" }]}
              className="mr-2 flex-1"
            >
              <Input placeholder="Enter Email" disabled />
            </Form.Item>
            <Form.Item
              name="Phone"
              label={<span>Phone</span>}
              rules={[{ required: true, message: "Please input the phone!" }]}
              className="flex-1"
            >
              <Input placeholder="Enter Phone" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          name="IdCard"
          label={<span>IdCard</span>}
          rules={[{ required: true, message: "Please input the IdCard!" }]}
        >
          <Input placeholder="Enter IdCard" type="number" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="BirthDay"
              label={<span>Birthday</span>}
              rules={[
                { required: true, message: "Please input the birthday!" },
              ]}
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
              name="Role"
              label={<span>Role</span>}
              rules={[{ required: true, message: "Please input the Role!" }]}
            >
              <Select>
                {role.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          name="Address"
          label={<span>Address</span>}
          rules={[{ required: true, message: "Please input the address!" }]}
        >
          <Input placeholder="Enter Address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditAccountModal;
