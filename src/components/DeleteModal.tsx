import React from 'react';
import { Modal, Button } from 'antd';

interface Props {
  openDelete: boolean;
  setOpenDelete: (value: boolean) => void;
  
  
 
  onConfirm: () => void; // Function to execute when the confirm button is clicked
}

const CustomModal: React.FC<Props> = ({ openDelete, setOpenDelete, onConfirm }) => {
  return (
    <Modal
      centered
      visible={openDelete}
      title={<h1 className="text-2xl font-bold">Delete service Id</h1>}
      onOk={() => setOpenDelete(false)} // Optional: handle automatic closure on OK
      onCancel={() => setOpenDelete(false)}
      footer={[
        <Button key="back" onClick={() => setOpenDelete(false)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            onConfirm(); // Perform the custom action (e.g., delete, remove, etc.)
            setOpenDelete(false); // Close modal after action
          }}
          className="bg-red-600 p-2 rounded-xl"
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
