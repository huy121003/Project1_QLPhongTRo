import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, Select, notification } from "antd";
import { apiRegister } from "../../services/authtApi";

const { Option } = Select;

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    try {
      await apiRegister(
        values.email,
        values.password,
        values.username,
        values.age,
        values.gender,
        values.address
      );
      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Registration failed",
        description: "An error occurred during registration. Please try again.",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="bg-gradient-to-br from-purple-400 to-green-300 p-12 rounded-lg shadow-lg w-[500px] mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Register</h2>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              placeholder="Enter username"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter email"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "Please enter your age!" }]}
          >
            <Input
              placeholder="Enter age"
              type="number"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input
              placeholder="Enter address"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select
              placeholder="Select gender"
              className="text-lg rounded-md border-gray-300"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full text-lg bg-yellow-400 hover:bg-yellow-500">
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
