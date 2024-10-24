import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Form, Input, Button, Select, notification, message, DatePicker } from "antd";
import { apiRegister } from "../../services/authtApi"
import { Gender } from "../../models/AccountModel";
const { Option } = Select;

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    const birthdayDate = values.birthday.toDate();
    const birthdayIsoString = new Date(birthdayDate).toISOString();
    const birthdayAsDate = new Date(birthdayIsoString);
    const fullName =
    `${values.FirstName} ${values.MiddleName} ${values.LastName}`.trim();


    const res = await apiRegister(
      values.email,
      values.phone,
      values.password,
      fullName,
      birthdayAsDate,
      values.gender,
      values.address,
      values.idCard
    );
    if (res.statusCode === 201) {
      message.success(res.message);
      navigate("/login");
    } else message.error(res.message);
  };

  return (
    <AuthLayout>
      <div className="bg-gradient-to-br from-purple-400 to-green-300 p-12 rounded-lg shadow-lg w-[800px] mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Register
        </h2>
        <Form layout="vertical" onFinish={handleRegister}>
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
            <Form.Item name="MiddleName" className="mr-2 flex-1">
              <Input placeholder="Middle Name" />
            </Form.Item>
            <Form.Item
              name="LastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              placeholder="Enter phone" type="number"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>
        </div>
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            className="mr-2 flex-1"
          >
            <Input.Password
              placeholder="Enter password"
           
            />
          </Form.Item>
          <Form.Item
            label={<span>IdCard </span>}
            name="idCard"
            rules={[{ required: true, message: "IdCard is required" }]}
            className="mr-2 flex-1"
          >
            <Input type="number" placeholder="Enter account CCCD" />
          </Form.Item>
        </div>
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[{ required: true, message: "Please enter your Bỉrthday!" }]}
            className="mr-2 flex-1"
          >
               <DatePicker placeholder="Enter BirthDay" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
            className=" flex-1"
          >
            <Select
              placeholder="Select gender"
              className="text-lg rounded-md border-gray-300"
            >
            {
              Object.values(Gender).map((gender)=>(
                <Option value={gender} key={gender}>{gender}</Option>

              )
            )
            }
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
              placeholder="Enter address"
              className="text-lg rounded-md border-gray-300"
            />
          </Form.Item>
        
         
   
          <Form.Item>
            <Button
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
