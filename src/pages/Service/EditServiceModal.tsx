import React, { useEffect } from "react";
import { Modal, Button, Input, Form, message } from "antd";
import { postServiceApi, patchServiceApi } from "../../services/serviceApi";

interface AddServiceModalProps {
    openEditService: boolean;
    setOpenEditService: (value: boolean) => void;
    record: {
        _id: string;
        serviceName: string;
        description: string;
        price: string;
        unit: string;
    };
}

const EditServiceModal: React.FC<AddServiceModalProps> = ({ openEditService, setOpenEditService, record }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (openEditService && record) {
            
            form.setFieldsValue({
                serviceName: record.serviceName,
                description: record.description,
                price: String(record.price),
                unit: record.unit,
            });
        }
    }, [openEditService, record, form]);

    const handleOk = async () => {
        try {
            // Validate the form fields
            const values = await form.validateFields();

            // Call the API to post account data
            console.log(typeof values.price)
            const response = await patchServiceApi(record._id,
                values.serviceName,
                values.description,
                values.price,
                values.unit
            );

            if (response.statusCode === 200) {
                message.success(response.message);
                form.resetFields(); // Reset form fields
                setOpenEditService(false); // Close modal on success
            } else {
                message.error(response.message);
            }
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Modal
            centered
            visible={openEditService}
            title={<h1 className="text-3xl font-bold text-center">Edit Service</h1>}
            onCancel={() => {
                setOpenEditService(false);
                form.resetFields(); // Reset form fields
            }}
            footer={[
                <Button
                    key="back"
                    onClick={() => {
                        setOpenEditService(false);
                        form.resetFields(); // Reset form fields
                    }}
                    className="mr-2"
                >
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    <p className="font-xl text-white flex">Save</p>
                </Button>,
            ]}
            width={700}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label={<span>Service Name <span className="text-red-600">*</span></span>}
                    name="serviceName"
                    rules={[{ required: true, message: "Service name is required" }]}
                >
                    <Input placeholder="Enter service name" />
                </Form.Item>

                <Form.Item
                    label={<span>Description <span className="text-red-600">*</span></span>}
                    name="description"
                    rules={[{ required: true, message: "Description is required" }]}
                >
                    <Input placeholder="Enter description" />
                </Form.Item>

                <Form.Item
                    label={<span>Price <span className="text-red-600">*</span></span>}
                    name="price"
                    rules={[{ required: true, message: "Price is required" }]}
                >
                    <Input type="text" placeholder="Enter price" />
                </Form.Item>

                <Form.Item
                    label={<span>Unit <span className="text-red-600">*</span></span>}
                    name="unit"
                    rules={[{ required: true, message: "Unit is required" }]}
                >
                    <Input placeholder="Enter unit" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditServiceModal;
