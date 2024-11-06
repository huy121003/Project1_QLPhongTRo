import { Button, Divider, Form, Input, message, Modal, Steps } from "antd";
import React, { useState } from "react";
import { apiActiveAccount } from "../../api/authtApi";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}
const ActiveAccountPage: React.FC<Props> = ({ open, setOpen, id }) => {
  const navigate = useNavigate();
  const [formCode] = Form.useForm();

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const activateAccount = async () => {
    setLoading(true); // Start loading
    try {
      const values = await formCode.validateFields();
      const code = values.code;

      const res = await apiActiveAccount(id, code);
      if (res.statusCode === 201) {
        message.success("Account activated successfully.");
        setCurrent(current + 1);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error("Please enter a valid code.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const EnterCode = () => (
    <div className="mt-12">
      <p className="text-gray-500 mb-4">
        A code has been sent to your email address. Please enter the code to
        activate your account.
      </p>
      <Form form={formCode}>
        <Form.Item
          name="code"
          rules={[{ required: true, message: "Please input your code!" }]}
        >
          <Input placeholder="Code" size="large" />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={activateAccount}
        loading={loading}
        disabled={loading}
        size="large"
      >
        Submit
      </Button>
    </div>
  );

  const Done = () => (
    <div className="mt-12 flex flex-col items-center">
      <i className="fa-solid fa-circle-check text-[100px] text-blue-500 mb-4"></i>
      <p className="text-gray-500">
        Your account has been activated successfully.
      </p>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          setOpen(false);
          setCurrent(0);
          navigate("/login");
        }}
      >
        Go back to login
      </Button>
    </div>
  );

  const steps = [
    {
      title: "Enter Code",
      content: <EnterCode />,
      icon: <i className="fa-solid fa-lock" />,
    },
    {
      title: "Done",
      content: <Done />,
      icon: <i className="fa-solid fa-check" />,
    },
  ];

  return (
    <Modal
      open={open}
      centered
      onCancel={() => {
        setOpen(false);
        setCurrent(0);
      }}
      footer={null}
      title={
        <h1 className="text-3xl font-bold text-center">Activate Account</h1>
      }
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Activate Account
      </h2>
      <Divider />
      <Steps current={current}>
        {steps.map((item, index) => (
          <Steps.Step
            key={index}
            title={item.title}
            icon={item.icon}
            className="flex"
          />
        ))}
      </Steps>
      <div className="mt-8">{steps[current].content}</div>
    </Modal>
  );
};

export default ActiveAccountPage;
