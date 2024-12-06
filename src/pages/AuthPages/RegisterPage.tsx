import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  notification,
  DatePicker,
} from "antd";
import { useState } from "react";
import ActiveAccountPage from "./ActiveAccountPage";
import { addressApi, authtApi } from "../../api";
import { Gender } from "../../enums";
import { useTheme } from "../../contexts/ThemeContext";
import { checkEmail, checkIdCard, checkPassword, checkPhoneNumberVN } from "../../utils/regex";
import { IAddress } from "../../interfaces";
import debounce from "lodash.debounce";

const { Option } = Select;

function RegisterPage() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";
  const textColor = isLightTheme ? "text-black" : "text-white";
  const bgColor = isLightTheme ? "bg-white" : "bg-gray-800";
  const [id, setId] = useState<string>("");
  const [openActiveAccount, setOpenActiveAccount] = useState<boolean>(false);
  const [address, setAddress] = useState<IAddress[]>([]);

  // Hàm tìm kiếm địa chỉ
  const searchAddress = debounce(async (value: string) => {
    if (value) {
      try {
        //tách chuoi bằng +
        value = value.split(" ").join("+");
        const result = await addressApi.fecthAddress(value);
        setAddress(result);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  }, 500); // Debounce 500ms, có thể thay đổi tùy theo nhu cầu

  const handleRegister = async (values: any) => {
    const birthdayDate = values.birthday.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);
    const fullName = `${values.FirstName} ${values.MiddleName || ""} ${
      values.LastName
    }`.trim();
    if (!checkEmail(values.email)) {
      notification.error({
        message: "Error",
        description: "Email is not correct",
      });

      return;
    }

    if (!checkPassword(values.password)) {
      notification.error({
        message: "Error",
        description:
          "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 digit, and 1 special character.",
      });

      return; // Stop further execution if password is invalid
    }

    if (!checkIdCard(values.idCard)) {
      notification.error({
        message: "Error",
        description: "IdCard is not correct",
      });

      return;
    }
    if (!checkPhoneNumberVN(values.phone)) {
      notification.error({
        message: "Error",
        description: "Phone number is not correct",
      });

      return;
    }

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
        <h2 className="text-4xl font-bold text-center mb-8">Register</h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label={<span className={`${textColor}`}>Full Name</span>}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "12px" }}
          >
            <div className="flex justify-between">
              <Form.Item
                name="FirstName"
                rules={[
                  { required: true, message: "Please input the first name!" },
                ]}
                className="mr-2 flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item
                name="MiddleName"
                className="mr-2 flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Middle Name" size="large" />
              </Form.Item>
              <Form.Item
                name="LastName"
                rules={[
                  { required: true, message: "Please input the last name!" },
                ]}
                className="flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Last Name" size="large" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className={`${textColor}`}>Email & Password</span>}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "12px" }}
          >
            <div className="flex justify-between">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Invalid email!" },
                ]}
                className="mr-2 flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Enter email" size="large" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
                className="flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input.Password placeholder="Enter password" size="large" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={
              <span className={`${textColor}`}>IdCard & Phone Number</span>
            }
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "12px" }}
          >
            <div className="flex justify-between">
              <Form.Item
                name="idCard"
                rules={[{ required: true, message: "IdCard is required" }]}
                className="mr-2 flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Enter account IdCard" size="large" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone!" },
                ]}
                className="flex-1"
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Enter phone" type="number" size="large" />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={<span className={`${textColor}`}>Birthday & Gender</span>}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: "12px" }}
          >
            <div className="flex justify-between">
              <Form.Item
                name="birthday"
                rules={[
                  { required: true, message: "Please enter your Birthday!" },
                ]}
                className="mr-2"
                style={{ marginBottom: 0 }}
              >
                <DatePicker placeholder="Enter BirthDay" size="large" />
              </Form.Item>
              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
                className="flex-1"
                style={{ marginBottom: 0 }}
              >
                <Select size="large" placeholder="Select gender">
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
            label={<span className={`${textColor}`}>Address</span>}
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Select
              showSearch
              onSearch={searchAddress} // Khi người dùng nhập vào trường này, gọi hàm tìm kiếm
              placeholder="Select address"
              size="large"
              filterOption={false} // Tắt chức năng filter mặc định của Ant Design
            >
              {address.map((a) => (
                <Option key={a.place_id} value={a.display_name}>
                  {a.display_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Submit Button */}
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

        {/* Already have an account link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className={`${
                theme === "light" ? "text-black" : "text-white"
              } font-semibold`}
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
