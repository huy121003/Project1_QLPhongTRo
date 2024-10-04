import React, { useEffect } from "react";
import { Modal, Button, Input, DatePicker, Form } from "antd";
import TenantModel from "../../models/TenantModel";
import moment from "moment";

interface Props {
  openEditTenant: boolean;
  setOpenEditTenant: (value: boolean) => void;
  selectedTenant: TenantModel | null; // Nhận dịch vụ được chọn
}

const EditTenantModal: React.FC<Props> = ({
  openEditTenant,
  setOpenEditTenant,
  selectedTenant,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedTenant) {
      form.setFieldsValue({
        tenantName: selectedTenant.TenantName,
        tenantPhone: selectedTenant.TenantPhone,
        tenantEmail: selectedTenant.TenantEmail,
        tenantAddress: selectedTenant.TenantAddress,
        tenantCCCD: selectedTenant.TenantCCCD,
        tenantBirthDay: moment(selectedTenant.TenantBirthDay), // Chuyển đổi về moment
        tenantJob: selectedTenant.TenantJob,
      });
    }
  }, [selectedTenant, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      // Thực hiện các thao tác cập nhật dịch vụ (API call, cập nhật state cha,...)
      console.log("Updating tenant:", {
        ...values,
        tenantBirthDay: values.tenantBirthDay.format("YYYY-MM-DD"), // Chuyển đổi lại khi gửi
      });
      setOpenEditTenant(false);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <Modal
      centered
      visible={openEditTenant}
      title={<h1 className="text-3xl font-bold text-center">Edit Tenant</h1>}
      onCancel={() => setOpenEditTenant(false)}
      footer={[
        <Button key="back" onClick={() => setOpenEditTenant(false)} className="mr-2">
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          <p className="font-xl text-white">Update</p>
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="tenantName"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input.TextArea placeholder="Enter tenant name" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="tenantPhone"
          rules={[{ required: true, message: "Phone is required" }]}
        >
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="tenantEmail"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input.TextArea placeholder="Enter tenant email" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="tenantAddress"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input.TextArea placeholder="Enter tenant address" />
        </Form.Item>

        <Form.Item
          label="CCCD"
          name="tenantCCCD"
          rules={[{ required: true, message: "CCCD is required" }]}
        >
          <Input placeholder="Enter tenant CCCD" />
        </Form.Item>

        <Form.Item
          label="Birthday"
          name="tenantBirthDay"
          rules={[{ required: true, message: "Birthday is required" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Job"
          name="tenantJob"
          rules={[{ required: true, message: "Job is required" }]}
        >
          <Input.TextArea placeholder="Enter tenant job" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTenantModal;
