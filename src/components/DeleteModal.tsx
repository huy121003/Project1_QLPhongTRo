import React, { useState } from 'react';
import { Modal, Button } from 'antd';

interface Props {
  openDelete: boolean;
  setOpenDelete: (value: boolean) => void;
  onConfirm: (record: any) => Promise<void>; // Include record parameter
  record: any; // Add a record prop
}

const CustomModal: React.FC<Props> = ({ openDelete, setOpenDelete, onConfirm, record }) => {
  const [isLoading,setIsLoading]=useState(false)
  return (
    <Modal
      centered
      visible={openDelete}
      title={<h1 className="text-2xl font-bold">Delete service Id</h1>}
      onCancel={() => setOpenDelete(false)}
      footer={[
        <Button key="back" onClick={() => setOpenDelete(false)}>
          Cancel
        </Button>,
        <Button
        loading={isLoading}
          key="submit"
          type="primary"
          onClick={async () => {
            setIsLoading(true)
            await onConfirm(record); // Pass the record to the onConfirm function
            setIsLoading(false)
            setOpenDelete(false); // Close modal after action
          }}
          className="bg-red-600 "
        >
          <p className="text-white">Delete</p>
        </Button>,
      ]}
    >
      <span className="text-xl">
        Are you sure you want to delete this service?
      </span>
    </Modal>
  );
};

export default CustomModal;
