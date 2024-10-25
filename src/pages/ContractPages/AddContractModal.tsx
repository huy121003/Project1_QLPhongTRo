import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Input,
  DatePicker,
  Form,
  Select,
  message,
  App,
} from "antd";
import { postContractApi } from "../../services/contractApi";
import { ContractStatus } from "../../models/ContractModel";
import { fecthAccountApi } from "../../services/accountApi";
import { fetchRoomApi } from "../../services/roomApis";
interface Props {
  openAddContract: boolean;
  setOpenAddContract: (value: boolean) => void;
}

const AddContractModal: React.FC<Props> = ({ openAddContract, setOpenAddContract }) => {
    const [form] = Form.useForm();
    const [tenants, setTenants] = useState<any[]>([]);
    const [rooms, setRooms] = useState<any[]>([]);
    useEffect(() => {
        const getTenant = async () => {
            const response = await fecthAccountApi("pageSize=1000&current=1&role.name=NORMAL USER&populate=role&fields=role.name");
            if (response.data) {
                setTenants(response.data.result);
            } else {
                message.error(response.message);
            }
        }
        const getRoom = async () => {
            const response = await fetchRoomApi("pageSize=1000&current=1&status=AVALIABLE");
            if (response.data) {
                setRooms(response.data.result);
            } else {
                message.error(response.message);
            }
        }
        getTenant();
        getRoom();
    }
        , []);
        console.log(tenants);
        console.log(rooms);
    const hanleOk = async () => {
        const values = await form.validateFields();
        const response = await postContractApi(
            values.tenantId,
            values.roomId,
            values.startDate,
            values.endDate,
            values.deposit,
            ContractStatus.ACTIVE
        );
        if (response.statusCode === 201) {
            message.success(response.message);
            form.resetFields();
            setOpenAddContract(false);
        } else {
            message.error(response.message);
        }
    }
    return (
        <Modal
            title="Add Contract"
            visible={openAddContract}
            onOk={hanleOk}
            onCancel={() => setOpenAddContract(false)}
            footer={[
                <Button key="back" onClick={() => setOpenAddContract(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={hanleOk}>
                    Add
                </Button>,
            ]}
        >
            </Modal>
        )


}

export default AddContractModal
