import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, Select, message, DatePicker, Upload } from "antd";
import { apiRegister } from "../../api/authtApi";
import { Gender } from "../../models/AccountModel";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ActiveAccountPage from "./ActiveAccountPage";
import { postFileApi } from "../../api/upfileApi";
import { RenderUploadField } from "../../components";
const { Option } = Select;

import { UploadListType } from "antd/es/upload/interface";
function RegisterPage() {
  const [id, setId] = useState<string>("");
  const [openActiveAccount, setOpenActiveAccount] = useState<boolean>(false);
  const handleRegister = async (values: any) => {
    const birthdayDate = values.birthday.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);
    const fullName =
      `${values.FirstName} ${values.MiddleName} ${values.LastName}`.trim();
    const imageUploadResponses = await Promise.all([
      postFileApi(values.profileImage.file),
      postFileApi(values.frontIdImage.file),
      postFileApi(values.backIdImage.file),
      postFileApi(values.temporaryResidenceImage.file),
    ]);

    const images = imageUploadResponses.map((res) => ({
      imagePath: res.data.fileName,
    }));

    const res = await apiRegister(
      values.email,
      values.phone,
      values.password,
      fullName,
      birthdayAsDate,
      values.gender,
      values.address,
      values.idCard,
      images
    );

    if (res.data) {
      setId(res.data._id);
      message.success("Register successfully");

      setOpenActiveAccount(true);
    } else {
      console.log("dd", res);
      message.error(res.message);
    }
  };

  return (
    <AuthLayout>
      <div className=" p-10 rounded-lg shadow-lg lg:w-[800px] mx-3">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Register
        </h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <RenderUploadField
            label="Profile Picture"
            name="profileImage"
           message="Profile picture is required"
           listType="picture-circle"
          
          />
          <Form.Item
            label="Profile Picture"
            name="profileImage"
            rules={[{ required: true, message: "Profile picture is required" }]}
            className="flex-1 justify-center items-center flex mt-5"
          >
            <Upload
              listType="picture-circle"
              accept="image/*"
              beforeUpload={() => false}
              className="avatar-uploader"
              maxCount={1} // Limit to 1 image
            >
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </Form.Item>
          <Form.Item label={<span>Name</span>} wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                name="FirstName"
                rules={[
                  { required: true, message: "Please input the first name!" },
                ]}
                className="mr-2 flex-1"
              >
                <Input placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item name="MiddleName" className="mr-2 flex-1">
                <Input placeholder="Middle Name" size="large" />
              </Form.Item>
              <Form.Item
                name="LastName"
                rules={[
                  { required: true, message: "Please input the last name!" },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Last Name" size="large" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "The input is not a valid email!" },
                ]}
                className="mr-2 flex-1"
              >
                <Input
                  placeholder="Enter email"
                  className="text-lg rounded-md border-gray-300"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone!" },
                ]}
                className=" flex-1"
              >
                <Input
                  placeholder="Enter phone"
                  type="number"
                  className="text-lg rounded-md border-gray-300"
                  size="large"
                />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                className="mr-2 flex-1"
              >
                <Input.Password placeholder="Enter password" size="large" />
              </Form.Item>
              <Form.Item
                label={<span>IdCard </span>}
                name="idCard"
                rules={[{ required: true, message: "IdCard is required" }]}
                className="mr-2 flex-1"
              >
                <Input placeholder="Enter account IdCard" size="large" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                  { required: true, message: "Please enter your Bỉrthday!" },
                ]}
                className="mr-2 flex-1"
              >
                <DatePicker placeholder="Enter BirthDay" size="large" />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
                className=" flex-1"
              >
                <Select
                  size="large"
                  placeholder="Select gender"
                  className="text-lg rounded-md border-gray-300 flex-1"
                >
                  {Object.values(Gender).map((gender) => (
                    <Option value={gender} key={gender}>
                      {gender}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input
              size="large"
              placeholder="Enter address"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              label="Front ID Image"
              name="frontIdImage"
              rules={[
                { required: true, message: "Front ID image is required" },
              ]}
              className="mr-2 flex-1"
            >
              <Upload
                listType="picture"
                accept="image/*"
                //showUploadList={{ showPreviewIcon: true }}
                maxCount={1} // Limit to 1 image
                beforeUpload={() => false} // Prevent automatic upload
              >
                <Button icon={<UploadOutlined />}>Upload Front ID</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Back ID Image"
              name="backIdImage"
              rules={[{ required: true, message: "Back ID image is required" }]}
              className="mr-2 flex-1"
            >
              <Upload
                listType="picture"
                accept="image/*"
                beforeUpload={() => false} // Prevent automatic upload
                maxCount={1} // Limit to 1 image
              >
                <Button icon={<UploadOutlined />}>Upload Back ID</Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item
            label="Temporary Residence Image"
            name="temporaryResidenceImage"
            rules={[
              {
                required: true,
                message: "Temporary residence image is required",
              },
            ]}
            className="mr-2 flex-1"
          >
            <Upload
              listType="picture"
              accept="image/*"
              maxCount={1} // Limit to 1 image
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>
                Upload Temporary Residence
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full text-lg bg-yellow-400 hover:bg-yellow-500"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?
            <Link to="/login" className="text-white font-semibold">
              Login
            </Link>
          </p>
        </div>
        <ActiveAccountPage
          open={openActiveAccount}
          setOpen={setOpenActiveAccount}
          id={id}
        />
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
