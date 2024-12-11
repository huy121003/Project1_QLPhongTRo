import { Button, Modal, Radio } from "antd";
import React from "react";
interface IRegisterServiceModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  registerService: (serviceId: string, excuteNow: boolean) => void;
  serviceId: string;
}
const RegisterServiceModal: React.FC<IRegisterServiceModal> = ({
  openModal,
  setOpenModal,
  registerService,
  serviceId,
}) => {
  const [excuteNow, setExcuteNow] = React.useState<boolean>(true);
  return (
    <Modal
      title="Register Service"
      visible={openModal}
      onCancel={() => setOpenModal(false)}
      footer={null}
    >
      <div className="register-service-modal">
        <div className="register-service-modal__content">
          <div className="font-bold text-xl">
            Are you sure you want to register this service?
          </div>
          <div className="my-10">
            <p className="py-1">
              Please select the time to excute this service
            </p>
            <Radio.Group
              onChange={(e) => setExcuteNow(e.target.value)}
              value={excuteNow}
            >
              <Radio value={true}> Now</Radio>
              <Radio value={false}>Next month</Radio>
            </Radio.Group>
          </div>
          <div className="flex flex-1 justify-between gap-2">
            <div className="flex-1" />
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                registerService(serviceId, excuteNow);
                setOpenModal(false);
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterServiceModal;
