import { IInvoice } from "../../../interfaces";

import { Modal, Form, Input, Row, Col } from "antd";

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

    const isUtilityInvoice = ["điện", "nước"].includes(
        invoice?.service?.name.toLowerCase()
    );
    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <div className="text-black text-lg">
                <p className="text-2xl items-center justify-center pb-5 font-semibold">
                    Invoice Details
                </p>
                <Form
                    layout="vertical"
                    initialValues={{
                        invoiceId: invoice?._id,
                        roomName: invoice?.room?.roomName,
                        tenantName: invoice?.tenant?.name,
                        idCard: invoice?.tenant?.idCard,
                        phone: invoice?.tenant?.phone,
                        serviceName: `Tiền ${invoice?.service?.name}`,
                        price: `${invoice?.service?.priceUnit.toLocaleString()} đ/${
                            invoice?.service?.unit
                        }`,
                        firstIndex: invoice?.firstIndex,
                        finalIndex: invoice?.finalIndex,
                        amount: `${invoice?.amount.toLocaleString()} đ`,
                        month: invoice?.month,
                        status: invoice?.status,
                    }}
                >
                    <Row gutter={[16, 16]}>
                        {/* Cột bên trái */}
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        ID Invoice
                                    </span>
                                }
                                name="invoiceId"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Room Name
                                    </span>
                                }
                                name="roomName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Renter
                                    </span>
                                }
                                name="tenantName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        ID Card
                                    </span>
                                }
                                name="idCard"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Phone
                                    </span>
                                }
                                name="phone"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Invoice Name
                                    </span>
                                }
                                name="serviceName"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        {/* Cột bên phải */}
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Month
                                    </span>
                                }
                                name="month"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            {isUtilityInvoice && (
                                <>
                                    <Form.Item
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    color: "#000000",
                                                }}
                                            >
                                                Price
                                            </span>
                                        }
                                        name="price"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input
                                            disabled
                                            style={{
                                                fontSize: "16px",
                                                color: "#000000",
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    color: "#000000",
                                                }}
                                            >
                                                First Index
                                            </span>
                                        }
                                        name="firstIndex"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input
                                            disabled
                                            style={{
                                                fontSize: "16px",
                                                color: "#000000",
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "18px",
                                                    color: "#000000",
                                                }}
                                            >
                                               Final Index
                                            </span>
                                        }
                                        name="finalIndex"
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                    >
                                        <Input
                                            disabled
                                            style={{
                                                fontSize: "16px",
                                                color: "#000000",
                                            }}
                                        />
                                    </Form.Item>
                                </>
                            )}

                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Amount
                                    </span>
                                }
                                name="amount"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            color: "#000000",
                                        }}
                                    >
                                        Status
                                    </span>
                                }
                                name="status"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input
                                    disabled
                                    style={{
                                        fontSize: "16px",
                                        color: "#000000",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalDetailInvoice;
