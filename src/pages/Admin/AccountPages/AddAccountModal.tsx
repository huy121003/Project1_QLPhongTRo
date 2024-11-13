import React, { useEffect, useState } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message } from "antd";
import { Gender } from "../../../enums";
import { IRole } from "../../../interfaces";
import { RenderUploadField } from "../../../components";
import { upfileApi, roleApi, accountApi } from "../../../api";

interface Props {
  openAddAccount: boolean;
  setOpenAddAccount: (value: boolean) => void;
}

const { Option } = Select;

const AddAccountModal: React.FC<Props> = ({
  openAddAccount,
  setOpenAddAccount,
}) => {
  const [role, setRole] = useState<IRole[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [frontIdImage, setFrontIdImage] = useState<File | null>(null);
  const [backIdImage, setBackIdImage] = useState<File | null>(null);
  const [temporaryResidenceImage, setTemporaryResidenceImage] =
    useState<File | null>(null);
  const [imageAvatar] = useState<string>("");
  const [imageFrontId] = useState<string>("");
  const [imageBackId] = useState<string>("");
  const [imageTemporaryResidence] = useState<string>("");

  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await roleApi.fecthRoleApi("current=1&pageSize=1000");
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
      let avatarFileName = imageAvatar;
      let frontIdFileName = imageFrontId;
      let backIdFileName = imageBackId;
      let temporaryResidenceFileName = imageTemporaryResidence;
      // Upload images if they exist
      if (avatar) {
        const response = await upfileApi.postAvatarApi(avatar);
        if (response.statusCode === 201) {
          avatarFileName = response.data.fileName;
        } else {
          message.error("Failed to upload avatar image.");
          return;
        }
      }
      if (frontIdImage) {
        const response = await upfileApi.postAvatarApi(frontIdImage);
        if (response.statusCode === 201) {
          frontIdFileName = response.data.fileName;
        } else {
          message.error("Failed to upload front id image.");
          return;
        }
      }
      if (backIdImage) {
        const response = await upfileApi.postAvatarApi(backIdImage);
        if (response.statusCode === 201) {
          backIdFileName = response.data.fileName;
        } else {
          message.error("Failed to upload back id image.");
          return;
        }
      }
      if (temporaryResidenceImage) {
        const response = await upfileApi.postAvatarApi(temporaryResidenceImage);
        if (response.statusCode === 201) {
          temporaryResidenceFileName = response.data.fileName;
        } else {
          message.error("Failed to upload temporary residence image.");
          return;
        }
      }

      // Call the API to post account data
      const response = await accountApi.postAccountApi(
        values.Email,
        values.Phone,
        values.Password,
        fullName, // Use the combined full name
        birthdayAsDate,
        values.Gender,
        values.Address,
        values.IdCard,
        values.Role,
        avatarFileName,
        [frontIdFileName, backIdFileName, temporaryResidenceFileName]
      );

      if (response.statusCode === 201) {
        message.success("Account added successfully");
        refesh();
      } else {
        // Display detailed error messages if available

        message.error(response.message);
      }
    } catch (error) {
      message.error("Form validation failed. Please check your input.");
    }
  };
  const refesh = () => {
    setOpenAddAccount(false);
    form.resetFields(); // Reset form fields
    setAvatar(null);
    setFrontIdImage(null);
    setBackIdImage(null);
    setTemporaryResidenceImage(null);
    setRole([]);
  };
  return (
    <Modal
      centered
      open={openAddAccount}
      title={<h1 className="text-3xl font-bold text-center">Add Account</h1>}
      onCancel={refesh}
      footer={[
        <Button size="large" key="back" onClick={refesh} className="mr-2">
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
          imageUrl={imageAvatar}
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
