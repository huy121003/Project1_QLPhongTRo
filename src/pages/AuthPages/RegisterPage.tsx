import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  DatePicker,
  notification,
} from "antd";

import { useState } from "react";
import ActiveAccountPage from "./ActiveAccountPage";
import { authtApi } from "../../api";
import { Gender } from "../../enums";
import {
  checkEmail,
  checkIdCard,
  checkPassword,
  checkPhoneNumberVN,
} from "../../utils/regex";
import { useTheme } from "../../contexts/ThemeContext";

const { Option } = Select;

function RegisterPage() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const [id, setId] = useState<string>("");
  const [openActiveAccount, setOpenActiveAccount] = useState<boolean>(false);

  const handleRegister = async (values: any) => {
    const birthdayDate = values.birthday.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);
    const fullName = `${values.FirstName} ${values.MiddleName || ""} ${
      values.LastName
    }`.trim();

    // if (!checkEmail(values.email)) {
    //   notification.error({
    //     message: "Error",
    //     description: "Email is not correct",
    //   });
    //   return;
    // }

    // if (!checkPassword(values.password)) {
    //   notification.error({
    //     message: "Error",
    //     description:
    //       "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
    //   });
    //   return;
    // }

    // if (!checkIdCard(values.idCard)) {
    //   notification.error({
    //     message: "Error",
    //     description: "IdCard is not correct",
    //   });
    //   return;
    // }

    // if (checkPhoneNumberVN(values.phone)) {
    //   notification.error({
    //     message: "Error",
    //     description: "Phone number is not correct",
    //   });
    //   return;
    // }

    const res = await authtApi.apiRegister(
      values.email,
      values.phone,
      values.password,
      fullName,
      birthdayAsDate,
      values.gender,
      values.address,
      values.idCard
    );

    if (res.data) {
      setId(res.data._id);
      message.success("Register successfully");
      setOpenActiveAccount(true);
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  return (
    <AuthLayout>
      <div
        className={`p-10 rounded-3xl shadow-lg lg:w-[800px] mx-3 ${bgColor} ${textColor}`}
      >
        <h2 className={`text-4xl font-bold text-center  mb-8`}>Register</h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label={<span className={` ${bgColor} ${textColor}`}>Name</span>}
            wrapperCol={{ span: 24 }}
          >
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
                label={
                  <span
                    className={` 
                      ${bgColor} ${textColor}`}
                  >
                    Email
                  </span>
                }
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "The input is not a valid email!" },
                ]}
                className="mr-2 flex-1"
              >
                <Input placeholder="Enter email" size="large" />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`
                      ${bgColor} ${textColor}
                      `}
                  >
                    Password
                  </span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                className="mr-2 flex-1"
              >
                <Input.Password placeholder="Enter password" size="large" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                label={
                  <span
                    className={`
                      ${bgColor} ${textColor}
                      `}
                  >
                    IdCard
                  </span>
                }
                name="idCard"
                rules={[{ required: true, message: "IdCard is required" }]}
                className="mr-2 flex-1"
              >
                <Input placeholder="Enter account IdCard" size="large" />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`
                  ${bgColor} ${textColor}
                  `}
                  >
                    Phone
                  </span>
                }
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone!" },
                ]}
                className=" flex-1"
              >
                <Input placeholder="Enter phone" type="number" size="large" />
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex justify-between">
              <Form.Item
                label={
                  <span
                    className={`
                      ${bgColor} ${textColor}
                      `}
                  >
                    Birthday
                  </span>
                }
                name="birthday"
                rules={[
                  { required: true, message: "Please enter your Birthday!" },
                ]}
                className="mr-2 "
              >
                <DatePicker placeholder="Enter BirthDay" size="large" />
              </Form.Item>
              <Form.Item
                label={
                  <span
                    className={`
                      ${bgColor} ${textColor}`}
                  >
                    Gender
                  </span>
                }
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
            label={
              <span
                className={` 
                  ${bgColor} ${textColor}`}
              >
                Address
              </span>
            }
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input
              size="large"
              placeholder="Enter address"
              className="text-lg rounded-md border-gray-300"
            />
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
          <p className="text-gray-400">
            Already have an account?
            <Link
              to="/login"
              className={` ${theme === "light" ? "text-black" : "text-white"}
            font-semibold`}
            >
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
