import React, { useEffect, useState } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message } from "antd";
import { postAccountApi } from "../../../api/accountApi"; // Adjust the path to your API function

import { Gender } from "../../../models/AccountModel";
import { fecthRoleApi } from "../../../api/roleApi"; // Note: Fixed the typo in the function name
import { RoleModel } from "../../../models/RoleModel";
import { postAvatarApi } from "../../../api/upfileApi";
import { RenderUploadField } from "../../../components";

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
  const [avatar, setAvatar] = useState<File | null>(null);
  const [frontIdImage, setFrontIdImage] = useState<File | null>(null);
  const [backIdImage, setBackIdImage] = useState<File | null>(null);
  const [temporaryResidenceImage, setTemporaryResidenceImage] =
    useState<File | null>(null);

  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await fecthRoleApi("current=1&pageSize=1000");
        if (res?.data) {
          setRole(res.data.result);
        } else {
          message.error(res.message);
        }
      } catch (error) {
        message.error("Failed to fetch roles.");
      }
    };
    getRole();
  }, [openAddAccount]);

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();

      // Combine first name, middle name, and last name into a single name
      const fullName = `${values.FirstName} ${values.MiddleName || ""} ${
        values.LastName
      }`.trim();

      const birthdayDate = values.BirthDay.toDate();
      const birthdayIsoString = new Date(birthdayDate).toISOString();
      const birthdayAsDate = new Date(birthdayIsoString);

      // Upload images if they exist
      if (
        avatar === null ||
        frontIdImage === null ||
        backIdImage === null ||
        temporaryResidenceImage === null
      ) {
        message.error("Please upload all required images.");
        return;
      }
      const imageUploadResponses = await Promise.all([
        postAvatarApi(avatar),
        postAvatarApi(frontIdImage),
        postAvatarApi(backIdImage),
        postAvatarApi(temporaryResidenceImage),
      ]);
      if (
        imageUploadResponses.some((response) => response.statusCode !== 201)
      ) {
        message.error("Failed to upload one or more images.");
        return;
      }

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
        values.Role,
        imageUploadResponses[0].data.fileName,
        [
          imageUploadResponses[1].data.fileName,
          imageUploadResponses[2].data.fileName,
          imageUploadResponses[3].data.fileName,
        ]
      );

      if (response.statusCode === 201) {
        message.success("Account added successfully");
        form.resetFields(); // Reset form fields
        setOpenAddAccount(false); // Close modal on success
      } else {
        // Display detailed error messages if available

        message.error(response.message);
      }
    } catch (error) {
      message.error("Form validation failed. Please check your input.");
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
        setAvatar(null);
        setFrontIdImage(null);
        setBackIdImage(null);
        setTemporaryResidenceImage(null);
        setRole([]);
      }}
      footer={[
        <Button
          size="large"
          key="back"
          onClick={() => {
            setOpenAddAccount(false);
            form.resetFields(); // Reset form fields
            setAvatar(null);
            setFrontIdImage(null);
            setBackIdImage(null);
            setTemporaryResidenceImage(null);
            setRole([]);
          }}
          className="mr-2"
        >
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk} size="large">
          <p className="font-xl text-white flex">Add</p>
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <RenderUploadField
          type="avatar"
          selectedImage={avatar}
          setSelectedImage={setAvatar}
        />

        <Form.Item label="Name" wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              name="FirstName"
              rules={[{ required: true, message: "First name is required" }]}
              className="m-1 flex-1"
            >
              <Input placeholder="First Name" size="large" />
            </Form.Item>
            <Form.Item name="MiddleName" className="m-1 flex-1">
              <Input placeholder="Middle Name" size="large" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[{ required: true, message: "Last name is required" }]}
              className="m-1 flex-1"
            >
              <Input placeholder="Last Name" size="large" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              className="m-1 flex-1"
              label="Email"
              name="Email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Email must be a valid email address",
                },
              ]}
            >
              <Input placeholder="Enter email" size="large" />
            </Form.Item>
            <Form.Item
              className="m-1 flex-1"
              label="Phone"
              name="Phone"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input type="number" placeholder="Enter phone" size="large" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              label="Password"
              name="Password"
              rules={[{ required: true, message: "Password is required" }]}
              className="m-1 flex-1"
            >
              <Input.Password placeholder="Enter password" size="large" />
            </Form.Item>
            <Form.Item
              label="IdCard"
              name="IdCard"
              rules={[{ required: true, message: "IdCard is required" }]}
              className="m-1 flex-1"
            >
              <Input type="number" placeholder="Enter IdCard" size="large" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              label="Birthday"
              name="BirthDay"
              rules={[{ required: true, message: "Birthday is required" }]}
              className="m-1 flex-1"
            >
              <DatePicker placeholder="Enter Birthday" size="large" />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="Gender"
              rules={[{ required: true, message: "Gender is required" }]}
              className="m-1 flex-1"
            >
              <Select placeholder="Select gender" size="large">
                {Object.values(Gender).map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Role"
              name="Role"
              rules={[{ required: true, message: "Role is required" }]}
              className="m-1 flex-1"
            >
              <Select
                placeholder="Select role"
                size="large"
                dropdownRender={(menu) => (
                  <div className="max-h-[150px] overflow-y-auto">{menu}</div>
                )}
              >
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
          label="Address"
          name="Address"
          rules={[{ required: true, message: "Address is required" }]}
          className="flex-1 m-1"
        >
          <Input placeholder="Enter address" size="large" />
        </Form.Item>
        <div className="lg:flex justify-between">
          <RenderUploadField
            type="frontIdCard"
            selectedImage={frontIdImage}
            setSelectedImage={setFrontIdImage}
          />
          <RenderUploadField
            type="backIdCard"
            selectedImage={backIdImage}
            setSelectedImage={setBackIdImage}
          />
          <RenderUploadField
            type="temporaryResidence"
            selectedImage={temporaryResidenceImage}
            setSelectedImage={setTemporaryResidenceImage}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default AddAccountModal;
