import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, message, Select, DatePicker } from "antd";
import moment from "moment"; // Import moment for date handling
import { patchAccountApi } from "../../../api/accountApi";
import AccountModel, { Gender } from "../../../models/AccountModel";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import { RoleModel } from "../../../models/RoleModel";
import { fecthRoleApi } from "../../../api/roleApi";
import { postFileApi } from "../../../api/upfileApi";
import { RenderUploadField } from "../../../components";

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
  const [role, setRole] = useState<RoleModel[]>([]);
  const [images, setImages] = useState<
    {
      imagePath: string;
    }[]
  >([]);
  useEffect(() => {
    const getRole = async () => {
      const res = await fecthRoleApi("");
      if (res?.data) {
        setRole(res.data.result);
      } else message.error(res.message);
    };
    getRole();
  }, [openEditAccount]);

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
      setImages(record.images);
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
      const imageUploadResponses = await Promise.all([
        postFileApi(values.profileImage.file),
        postFileApi(values.frontIdImage.file),
        postFileApi(values.backIdImage.file),
        postFileApi(values.temporaryResidenceImage.file),
      ]);

      setImages(
        imageUploadResponses.map((res) => ({
          imagePath: res.data.fileName,
        }))
      );
      const response = await patchAccountApi(
        record._id,
        values.Phone,
        `${values.FirstName} ${values.MiddleName || ""} ${values.LastName}`, // Combine names back
        birthday, // Send formatted birthday
        values.Gender,
        values.Address,
        values.IdCard,
        values.Role,
        images
      );

      if (response.statusCode === 200) {
        message.success("Account updated successfully");
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
        <RenderUploadField
          label="Profile Picture"
          name="profileImage"
          message="Profile picture is required"
          listType="picture-circle"
          defaultFileList={
            images
              ? [
                  {
                    uid: record._id,
                    name: "Profile Picture",
                    url: `${baseURL}/images/user/${images[0]?.imagePath}`,
                  },
                ]
              : []
          }
        />

        <Form.Item label={<span>Name</span>} wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="FirstName"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
              className="mr-2 flex-1"
            >
              <Input placeholder="First Name" size="large" />
            </Form.Item>
            <Form.Item
              name="MiddleName"
              style={{ flex: 1, marginRight: "8px" }}
            >
              <Input placeholder="Middle Name" size="large" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
              className="flex-1"
            >
              <Input placeholder="Last Name" size="large" />
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
              <Input placeholder="Enter Email" disabled size="large" />
            </Form.Item>
            <Form.Item
              name="Phone"
              label={<span>Phone</span>}
              rules={[{ required: true, message: "Please input the phone!" }]}
              className="flex-1"
            >
              <Input placeholder="Enter Phone" size="large" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item
          name="IdCard"
          label={<span>IdCard</span>}
          rules={[{ required: true, message: "Please input the IdCard!" }]}
        >
          <Input placeholder="Enter IdCard" type="number" size="large" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              name="BirthDay"
              label={<span>Birthday</span>}
              rules={[
                { required: true, message: "Please input the birthday!" },
              ]}
              className="flex-1"
            >
              <DatePicker format="YYYY-MM-DD" size="large" />
            </Form.Item>
            <Form.Item
              name="Gender"
              label={<span>Gender</span>}
              rules={[{ required: true, message: "Please input the Gender!" }]}
              className="flex-1 mx-2"
            >
              <Select size="large">
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
              className="flex-1"
            >
              <Select size="large">
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
          <Input placeholder="Enter Address" size="large" />
        </Form.Item>

        <RenderUploadField
          label="Front ID Image"
          name="frontIdImage"
          message="Front ID image is required"
          listType="picture"
          defaultFileList={
            images
              ? [
                  {
                    uid: record._id,
                    name: "Profile Picture",
                    url: `${baseURL}/images/user/${images[1]?.imagePath}`,
                  },
                ]
              : []
          }
        />
        <RenderUploadField
          label="Back ID Image"
          name="backIdImage"
          message="Back ID image is required"
          listType="picture"
          defaultFileList={
            images
              ? [
                  {
                    uid: record._id,
                    name: "Profile Picture",
                    url: `${baseURL}/images/user/${images[2]?.imagePath}`,
                  },
                ]
              : []
          }
        />
        <RenderUploadField
          label="Temporary Residence Image"
          name="temporaryResidenceImage"
          message="Temporary residence image is required"
          listType="picture"
          defaultFileList={
            images
              ? [
                  {
                    uid: record._id,
                    name: "Profile Picture",
                    url: `${baseURL}/images/user/${images[3]?.imagePath}`,
                  },
                ]
              : []
          }
        />
      </Form>
    </Modal>
  );
};

export default EditAccountModal;
