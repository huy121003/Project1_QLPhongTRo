import React, { useEffect } from "react";
import { Modal, Button, Input, DatePicker, Form, Select, message } from "antd";
import { postServiceApi } from "../../services/serviceApi";
interface AddServiceModalProps {
    openAddService: boolean;
    setOpenAddService: (value: boolean) => void;
}
const { Option } = Select;
const  AddServiceModal:React.FC<AddServiceModalProps>=({openAddService, setOpenAddService})=> {
    const [form] = Form.useForm();

 
   
    const handleOk = async () => {
      // Validate the form fields
      const values = await form.validateFields();
    
  
      // Call the API to post account data
      const response = await postServiceApi(
        values.serviceName,
        values.description,
        values.price,
        values.unit
      );
  
     
      if (response.statusCode === 201) {
        message.success(response.message);
        form.resetFields(); // Reset form fields
        setOpenAddService(false); // Close modal on success
       
      } else {
        message.error(response.message);
      }
    };
  
    return (
      <Modal
        centered
        visible={openAddService}
        title={<h1 className="text-3xl font-bold text-center">Add Service</h1>}
        onCancel={() => {
            setOpenAddService(false);
          form.resetFields(); // Reset form fields
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
                setOpenAddService(false);
              form.resetFields(); // Reset form fields
            }}
            className="mr-2"
          >
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
            label={
              <span>
                serviceName <span className="text-red-600">*</span>
              </span>
            }
            name="serviceName"
            rules={[{ required: true, message: "serviceName is required" }]}
          >
            <Input placeholder="Enter serviceName" />
          </Form.Item>
  
          <Form.Item
            label={
              <span>
                description <span className="text-red-600">*</span>
              </span>
            }
            name="description"
            rules={[{ required: true, message: "description is required" }]}
          >
            <Input placeholder="Enter  description" />
          </Form.Item>
  
         
  
          <Form.Item
            label={
              <span>
                price <span className="text-red-600">*</span>
              </span>
            }
            name="price"
            rules={[{ required: true, message: "price is required" }]}
          >
            <Input type="number" placeholder="Enter  price" />
          </Form.Item>
  
          <Form.Item
            label={
              <span>
                unit <span className="text-red-600">*</span>
              </span>
            }
            name="unit"
            rules={[{ required: true, message: "unit is required" }]}
          >
            <Input placeholder="Enter unit" />
          </Form.Item>
  
         
  
         
        </Form>
      </Modal>
    );
}

export default AddServiceModal
