import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Form, message, Select, DatePicker } from "antd";
import moment from "moment"; // Import moment for date handling

import { IRole, IAccount } from "../../../interfaces";
import { RenderUploadField } from "../../../components";
import { accountApi, roleApi, upfileApi } from "../../../api";
import { Gender } from "../../../enums";
interface Props {
  openEditAccount: boolean;
  setOpenEditAccount: (value: boolean) => void;
  record: IAccount;
}

const EditAccountModal: React.FC<Props> = ({
  openEditAccount,
  setOpenEditAccount,
  record,
}) => {
  const [form] = Form.useForm();
  const [role, setRole] = useState<IRole[]>([]);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [frontIdImage, setFrontIdImage] = useState<File | null>(null);
  const [backIdImage, setBackIdImage] = useState<File | null>(null);
  const [temporaryResidenceImage, setTemporaryResidenceImage] =
    useState<File | null>(null);
  const [imageAvatar, setImageAvatar] = useState<string>("");
  const [imageFrontId, setImageFrontId] = useState<string>("");
  const [imageBackId, setImageBackId] = useState<string>("");
  const [imageTemporaryResidence, setImageTemporaryResidence] =
    useState<string>("");
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    const getRole = async () => {
      const res = await roleApi.fecthRoleApi("");
      if (res?.data) {
        setRole(res.data.result);
      } else message.error(res.message);
    };
    getRole();
  }, [openEditAccount]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
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
      setImageAvatar(record.avatar);
      setImageFrontId(record.imagesIdCard[0]);
      setImageBackId(record.imagesIdCard[1]);
      setImageTemporaryResidence(record.imagesIdCard[2]);

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
      });
    }
  }, [openEditAccount, record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const birthday = values.BirthDay
        ? values.BirthDay.format("YYYY-MM-DD")
        : null;

      // Tạo biến tạm thời để lưu tên ảnh đã tải lên
      let avatarFileName = imageAvatar;
      let frontIdFileName = imageFrontId;
      let backIdFileName = imageBackId;
      let temporaryResidenceFileName = imageTemporaryResidence;

      // Kiểm tra sự thay đổi của ảnh và upload nếu có
      if (avatar) {
        const res = await upfileApi.postAvatarApi(avatar);
        if (res.statusCode === 201) {
          avatarFileName = res.data.fileName;
        } else {
          message.error(res.message);
          return;
        }
      }

      if (frontIdImage) {
        const res = await upfileApi.postAvatarApi(frontIdImage);
        if (res.statusCode === 201) {
          frontIdFileName = res.data.fileName;
        } else {
          message.error(res.message);
          return;
        }
      }

      if (backIdImage) {
        const res = await upfileApi.postAvatarApi(backIdImage);
        if (res.statusCode === 201) {
          backIdFileName = res.data.fileName;
        } else {
          message.error(res.message);
          return;
        }
      }

      if (temporaryResidenceImage) {
        const res = await upfileApi.postAvatarApi(temporaryResidenceImage);
        if (res.statusCode === 201) {
          temporaryResidenceFileName = res.data.fileName;
        } else {
          message.error(res.message);
          return;
        }
      }

      // Gọi API cập nhật thông tin tài khoản sau khi tất cả ảnh đã được tải lên
      const response = await accountApi.patchAccountApi(
        record._id,
        values.Phone,
        `${values.FirstName} ${values.MiddleName || ""} ${values.LastName}`,
        birthday,
        values.Gender,
        values.Address,
        values.IdCard,
        values.Role,
        avatarFileName,
        [frontIdFileName, backIdFileName, temporaryResidenceFileName]
      );

      if (response.statusCode === 200) {
        message.success("Account updated successfully");
        refresh();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  const refresh = () => {
    setOpenEditAccount(false);
    form.resetFields(); // Reset form fields
    setAvatar(null);
    setBackIdImage(null);
    setFrontIdImage(null);
    setTemporaryResidenceImage(null);
    setImageAvatar("");
    setImageBackId("");
    setImageFrontId("");
    setImageTemporaryResidence("");
    setRole([]);
    setIsLoad(true);
  };

  return (
    <Modal
      loading={isLoad}
      width={800}
      centered
      open={openEditAccount}
      title={<h1 className="text-3xl font-bold text-center">Edit Account</h1>}
      onCancel={refresh}
      footer={[
        <Button key="back" onClick={refresh}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <RenderUploadField
          type="avatar"
          selectedImage={avatar}
          setSelectedImage={setAvatar}
          imageUrl={imageAvatar}
        />

        <Form.Item label={<span>Name</span>} wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              name="FirstName"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
              className="m-1 flex-1"
            >
              <Input placeholder="First Name" size="large" />
            </Form.Item>
            <Form.Item name="MiddleName" className="m-1 flex-1">
              <Input placeholder="Middle Name" size="large" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
              className="flex-1 m-1"
            >
              <Input placeholder="Last Name" size="large" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              name="Email"
              label={<span>Email</span>}
              rules={[{ required: true, message: "Please input the email!" }]}
              className="m-1 flex-1"
            >
              <Input placeholder="Enter Email" disabled size="large" />
            </Form.Item>
            <Form.Item
              name="Phone"
              label={<span>Phone</span>}
              rules={[{ required: true, message: "Please input the phone!" }]}
              className="flex-1 m-1"
            >
              <Input placeholder="Enter Phone" size="large" />
            </Form.Item>
            <Form.Item
              name="IdCard"
              label={<span>IdCard</span>}
              rules={[{ required: true, message: "Please input the IdCard!" }]}
              className="flex-1 m-1"
            >
              <Input placeholder="Enter IdCard" type="number" size="large" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="lg:flex justify-between">
            <Form.Item
              name="BirthDay"
              label={<span>Birthday</span>}
              rules={[
                { required: true, message: "Please input the birthday!" },
              ]}
              className="flex-1 m-1"
            >
              <DatePicker format="YYYY-MM-DD" size="large" />
            </Form.Item>
            <Form.Item
              name="Gender"
              label={<span>Gender</span>}
              rules={[{ required: true, message: "Please input the Gender!" }]}
              className="flex-1 m-1"
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
              className="flex-1 m-1"
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
          className="flex-1 m-1"
        >
          <Input placeholder="Enter Address" size="large" />
        </Form.Item>

        <div className="lg:flex justify-between">
          <RenderUploadField
            type="frontIdCard"
            selectedImage={frontIdImage}
            setSelectedImage={setFrontIdImage}
            imageUrl={imageFrontId}
          />
          <RenderUploadField
            type="backIdCard"
            selectedImage={backIdImage}
            setSelectedImage={setBackIdImage}
            imageUrl={imageBackId}
          />
          <RenderUploadField
            type="temporaryResidence"
            selectedImage={temporaryResidenceImage}
            setSelectedImage={setTemporaryResidenceImage}
            imageUrl={imageTemporaryResidence}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default EditAccountModal;
