import { Modal } from "antd";
import { IInvoice } from "../../../interfaces";


interface InvoiceDetailModalProps {
    visible: boolean;
    onClose: () => void;
    invoice: IInvoice | null;
}
const ModalDetailInvoice: React.FC<InvoiceDetailModalProps> = ({
    visible,
    onClose,
    invoice,
}) => {
    if (!invoice) return null;

    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <div className="text-[#2b6534] text-lg flex flex-col">
                <p className="text-2xl items-center justify-center p pb-5 font-semibold">
                    Invoice Details
                </p>
                <p className="pb-2">ID: {invoice._id}</p>
                <p className="pb-2">Room name:{invoice.room.roomName}</p>
                <p className="pb-2">Service:{invoice.service.name}</p>
                <p className="pb-2">
                    Amount: {invoice.amount.toLocaleString() + " đ"}
                </p>
                <p className="pb-2">Description:{invoice.description}</p>
                <p className="pb-2">Month:{invoice.month}</p>
                <p className="pb-2">Status:{invoice.status}</p>
            </div>
        </Modal>
    );
};

export default ModalDetailInvoice;