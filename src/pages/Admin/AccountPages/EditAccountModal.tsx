import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, message, Select, DatePicker } from "antd";
import moment from "moment"; // Import moment for date handling
import { patchAccountApi } from "../../../api/accountApi";
import AccountModel, { Gender } from "../../../models/AccountModel";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import { RoleModel } from "../../../models/RoleModel";
import { fecthRoleApi } from "../../../api/roleApi";
import { postAvatarApi } from "../../../api/upfileApi";
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
  const [imageIdCard, setImagesIdCard] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>("");

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
      const lastName = nameParts.pop();
      const firstName = nameParts.shift();
      const middleName = nameParts.join(" ");

      // Update avatar and imagesIdCard from the new record
      setAvatar(record.avatar);
      setImagesIdCard(record.imagesIdCard);

      // Update the form with the information
      form.setFieldsValue({
        Email: record.email,
        Phone: record.phone,
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        BirthDay: formattedBirthday,
        Gender: record.gender,
        Address: record.address,
        IdCard: record.idCard,
        Role: record.role._id,
        profileImage: record.avatar, // Update profile image in the form
        frontIdImage: record.imagesIdCard[0], // Update front ID image in the form
        backIdImage: record.imagesIdCard[1], // Update back ID image in the form
        temporaryResidenceImage: record.imagesIdCard[2], // Update temporary residence image in the form
      });
    }
  }, [openEditAccount, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const birthday = values.BirthDay
        ? values.BirthDay.format("YYYY-MM-DD")
        : null;

      // Kiểm tra sự thay đổi của ảnh
      const imagesToUpload = [];
      if (values.profileImage && values.profileImage.file) {
        imagesToUpload.push(postAvatarApi(values.profileImage.file));
      } else {
        setAvatar(record.avatar);
      }

      if (values.frontIdImage && values.frontIdImage.file) {
        imagesToUpload.push(postAvatarApi(values.frontIdImage.file));
      } else {
        setImagesIdCard((prev) => [record.imagesIdCard[0], prev[1], prev[2]]);
      }

      if (values.backIdImage && values.backIdImage.file) {
        imagesToUpload.push(postAvatarApi(values.backIdImage.file));
      } else {
        setImagesIdCard((prev) => [prev[0], record.imagesIdCard[1], prev[2]]);
      }

      if (
        values.temporaryResidenceImage &&
        values.temporaryResidenceImage.file
      ) {
        imagesToUpload.push(postAvatarApi(values.temporaryResidenceImage.file));
      } else {
        setImagesIdCard((prev) => [prev[0], prev[1], record.imagesIdCard[2]]);
      }

      const imageUploadResponses = await Promise.all(imagesToUpload);

      if (
        imageUploadResponses.some((response) => response.statusCode !== 201)
      ) {
        message.error("Failed to upload one or more images.");
        return;
      }

      // Cập nhật URL mới nếu upload thành công
      setAvatar(imageUploadResponses[0]?.data?.fileName || avatar);
      setImagesIdCard([
        imageUploadResponses[1]?.data?.fileName || imageIdCard[0],
        imageUploadResponses[2]?.data?.fileName || imageIdCard[1],
        imageUploadResponses[3]?.data?.fileName || imageIdCard[2],
      ]);

      const response = await patchAccountApi(
        record._id,
        values.Phone,
        `${values.FirstName} ${values.MiddleName || ""} ${values.LastName}`,
        birthday,
        values.Gender,
        values.Address,
        values.IdCard,
        values.Role,
        avatar,
        imageIdCard
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
      width={800}
      centered
      open={openEditAccount}
      title={<h1 className="text-3xl font-bold text-center">Edit Account</h1>}
      onCancel={() => {
        setOpenEditAccount(false);
        form.resetFields(); // Reset form fields
        setAvatar("");
        setImagesIdCard([]);
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setOpenEditAccount(false);
            form.resetFields(); // Reset form fields
            setAvatar("");
            setImagesIdCard([]);
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
            record?.avatar
              ? [
                  {
                    uid: record._id,
                    name: avatar,
                    url: `${record?.avatar}`,
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
            imageIdCard[0]
              ? [
                  {
                    uid: record._id,
                    name: imageIdCard[0],
                    url: `${imageIdCard[0]}`,
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
            imageIdCard[1]
              ? [
                  {
                    uid: record._id,
                    name: imageIdCard[1],
                    url: `${imageIdCard[1]}`,
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
            imageIdCard[2]
              ? [
                  {
                    uid: record._id,
                    name: imageIdCard[2],
                    url: `${imageIdCard[2]}`,
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
