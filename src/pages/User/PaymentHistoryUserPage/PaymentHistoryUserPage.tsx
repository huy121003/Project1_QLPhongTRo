import { useEffect, useState } from "react";
import InvoiceModel from "../../../models/InvoiceModal";
import { fetchInvoiceApi } from "../../../api/invoiceApi";
import { message } from "antd";
import ModalDetailInvoice from "../InvoiceUserPage/ModalDetailInvoice";

export default function PaymentHistoryUserPage() {
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);

    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModel | null>(
        null
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        const getInvoices = async () => {
            const response = await fetchInvoiceApi(
                "pageSize=1000&currentPage=1&status=PAID"
            );
            console.log(response);
            if (response.data) {
                setInvoices(response.data.result);
            } else {
                message.error(response.message);
            }
        };
        getInvoices();
    }, []);

    const totalAmount = invoices.reduce(
        (total, invoice) => total + invoice.amount,
        0
    );

    const openModal = (invoice: InvoiceModel) => {
        setSelectedInvoice(invoice);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedInvoice(null);
    };
    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col overflow-y-auto custom-scrollbar">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a href="/finance" className="hover:underline">
                            Finance
                        </a>
                    </li>
                    <li>
                        <span className="text-[#2b6534]">›</span>
                    </li>
                    <li className="font-semibold">Payment history</li>
                </ol>
            </div>
            <div className="p-6 m-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
                <table className="w-full text-left table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b p-3 text-lg">
                                Invoice Description
                            </th>
                            <th className="border-b p-3 text-lg">
                                Payment Date
                            </th>
                            <th className="border-b p-3 text-lg">
                                Amount (VND)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr
                                key={invoice._id}
                                onClick={() => openModal(invoice)}
                                className="cursor-pointer"
                            >
                                <td className="border-b p-3 text-lg">
                                    {invoice.description}
                                </td>
                                <td className="border-b p-3 text-lg">
                                    {new Date(
                                        invoice.createdAt
                                    ).toLocaleDateString("en-GB")}
                                </td>
                                <td className="border-b p-3 text-lg">
                                    {invoice.amount.toLocaleString("vi-VN")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="text-red-600">
                            <td
                                colSpan="2"
                                className="p-3 font-semibold text-right border-t"
                            >
                                Total Amount Paid:
                            </td>
                            <td className="p-3 font-semibold border-t ">
                                {totalAmount.toLocaleString("vi-VN")} VND
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <ModalDetailInvoice
                visible={isModalVisible}
                onClose={closeModal}
                invoice={selectedInvoice}
            />
        </div>
    );
}
