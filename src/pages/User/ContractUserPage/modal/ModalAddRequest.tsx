import React, { useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { IContract } from 'interfaces';
import requestContractApi from 'api/requestContractApi/requestContractApi';

interface ModalAddRequestProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contract: IContract | undefined
}

const ModalAddRequest: React.FC<ModalAddRequestProps> = ({ open, setOpen, contract }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      
      if(contract){
        const request = await requestContractApi.postRequestContractApi(contract._id, false,0, values.description);
        if(request){
          message.success("You have sent a request to cancel the contract, please wait for the other party to approve it!")
        }
      }
      
      setConfirmLoading(false);
      setOpen(false);

    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      closable={false}
      confirmLoading={confirmLoading}
      footer={null} // Tùy chỉnh footer theo ý muốn
    >
      <div className="p-4 rounded-md text-black max-w-full bg-red-100">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          Notice Regarding Lease Termination
        </h1>
        <p className="mb-4 max-w-full">
          Before proceeding with the termination of your lease agreement, please be aware of the following:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Your lease agreement will be terminated at least 15 days from the date of your request.</li>
          <li>
            As stated in the terms and conditions of the agreement, terminating the lease will result in the
            forfeiture of your security deposit as compensation.
          </li>
        </ul>
        <p className="mb-4">
          By confirming the termination, you acknowledge and accept these terms. If you have any concerns or
          require assistance, please contact us before proceeding.
        </p>
        <p>Thank you for your attention.</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        initialValues={{ description: '' }}
      >
        <Form.Item
          label="Reason for cancellation"
          name="description"
          rules={[{ required: true, message: 'Please input your Reason!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>

      <div className="flex justify-end gap-2">
        <Button onClick={handleCancel} danger>
          Cancel
        </Button>
        <Button loading={confirmLoading} onClick={handleOk} type="primary">
          Add Request
        </Button>
      </div>
    </Modal>
  );
};

export default ModalAddRequest;
