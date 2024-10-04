import React from "react";
import { Modal, Button, Input, DatePicker, Form } from "antd";

interface Props {
  openAddTenant: boolean;
  setOpenAddTenant: (value: boolean) => void;
}

const AddTenantModal: React.FC<Props> = ({ openAddTenant, setOpenAddTenant }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log("Received values:", values);
        // Xử lý dữ liệu tại đây
        setOpenAddTenant(false);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      centered
      visible={openAddTenant}
      title={<h1 className="text-3xl font-bold text-center">Add Tenant</h1>}
      onCancel={() => setOpenAddTenant(false)}
      footer={[
        <Button key="back" onClick={() => setOpenAddTenant(false)} className="mr-2">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          <p className="font-xl text-white flex">Add</p>
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={<span>Name <span className="text-red-600">*</span></span>}
          name="tenantName"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input placeholder="Enter tenant name" />
        </Form.Item>

        <Form.Item
          label={<span>Email <span className="text-red-600">*</span></span>}
          name="tenantEmail"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input placeholder="Enter tenant email" />
        </Form.Item>

        <Form.Item
          label={<span>Phone <span className="text-red-600">*</span></span>}
          name="tenantPhone"
          rules={[{ required: true, message: 'Phone is required' }]}
        >
          <Input type="number" placeholder="Enter tenant phone" />
        </Form.Item>

        <Form.Item
          label={<span>Address <span className="text-red-600">*</span></span>}
          name="tenantAddress"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Input placeholder="Enter tenant address" />
        </Form.Item>

        <Form.Item
          label={<span>CCCD <span className="text-red-600">*</span></span>}
          name="tenantCCCD"
          rules={[{ required: true, message: 'CCCD is required' }]}
        >
          <Input type="number" placeholder="Enter tenant CCCD" />
        </Form.Item>

        <Form.Item
          label={<span>Birthday <span className="text-red-600">*</span></span>}
          name="tenantBirthday"
          rules={[{ required: true, message: 'Birthday is required' }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={<span>Job <span className="text-red-600">*</span></span>}
          name="tenantJob"
          rules={[{ required: true, message: 'Job is required' }]}
        >
          <Input placeholder="Enter tenant job" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTenantModal;
