import React from "react";
import { Modal, Button, Input, Form, Select, message } from "antd";
import { postServiceApi } from "../../../services/serviceApi";


import { ServiceType } from "../../../models/ServiceModel";
interface Props {
    openAddService: boolean;
    setOpenAddService: (value: boolean) => void;
}

const  AddServiceModal:React.FC<Props>=({openAddService, setOpenAddService})=> {
    const [form] = Form.useForm();


 
   
    const handleOk = async () => {
      // Validate the form fields
      const values = await form.validateFields();
    
  
      // Call the API to post account data
      const response = await postServiceApi(
        values.serviceName,
        values.description,
        values.price,
        values.unit,
        values.type
      );
  
     
      if (response.statusCode === 201) {
        message.success("Service added successfully");
        form.resetFields(); // Reset form fields
     //   dispatch(addServiceAction(values))
     
        setOpenAddService(false); // Close modal on success
       
      } else {
        message.error(response.message);
      }
    };
  
    return (
      <Modal
        centered
        open={openAddService}
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
              Name 
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
                Description 
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
                Price 
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
                Unit 
              </span>
            }
            name="unit"
            rules={[{ required: true, message: "unit is required" }]}
          >
            <Input placeholder="Enter unit" />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Type 
              </span>
            }
            name="type"
            rules={[{ required: true, message: "type is required" }]}
          >
             <Select>
            {
              Object.values(ServiceType).map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))
            }
           </Select>
          </Form.Item>
         
  
         
        </Form>
      </Modal>
    );
}

export default AddServiceModal
