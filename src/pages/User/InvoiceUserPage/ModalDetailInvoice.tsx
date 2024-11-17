import { Modal, Form, Input, Row, Col } from "antd";
import InvoiceModel from "../../../models/InvoiceModal";

interface InvoiceDetailModalProps {
    visible: boolean;
    onClose: () => void;
    invoice: InvoiceModel | null;
}

const ModalDetailInvoice: React.FC<InvoiceDetailModalProps> = ({
    visible,
    onClose,
    invoice,
}) => {
    if (!invoice) return null;
    const isUtilityInvoice = ["điện", "nước"].includes(
        invoice.service.name.toLowerCase()
    );
    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <div className="text-[#2b6534] text-lg">
                <p className="text-2xl items-center justify-center pb-5 font-semibold">
                    Invoice Details
                </p>
                <Form
                    layout="vertical"
                    initialValues={{
                        invoiceId: invoice._id,
                        roomName: invoice.room.roomName,
                        tenantName: invoice.tenant.name,
                        idCard: invoice.tenant.idCard,
                        phone: invoice.tenant.phone,
                        serviceName: `Tiền ${invoice.service.name}`,
                        description: `${invoice.service.priceUnit.toLocaleString()} đ/${
                            invoice.service.unit
                        }`,
                        firstIndex: invoice.firstIndex,
                        finalIndex: invoice.finalIndex,
                        amount: `${invoice.amount.toLocaleString()} đ`,
                        month: invoice.month,
                        status: invoice.status,
                    }}
                >
                    <Row gutter={[16, 16]}>
                        {/* Cột bên trái */}
                        <Col span={12}>
                            <Form.Item label="ID Invoice" name="invoiceId">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Room Name" name="roomName">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Renter" name="tenantName">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="ID Card" name="idCard">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Invoice Name" name="serviceName">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        {/* Cột bên phải */}
                        <Col span={12}>
                            <Form.Item label="Month" name="month">
                                <Input disabled />
                            </Form.Item>
                            {isUtilityInvoice && (
                                <>
                                    <Form.Item
                                        label="Description"
                                        name="description"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label={`Chỉ số ${invoice.service.name.toLowerCase()} đầu tháng`}
                                        name="firstIndex"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label={`Chỉ số ${invoice.service.name.toLowerCase()} cuối tháng`}
                                        name="finalIndex"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </>
                            )}

                            <Form.Item label="Amount" name="amount">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item label="Status" name="status">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalDetailInvoice;
