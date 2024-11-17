import React, { useEffect, useState } from "react";

import { message, notification } from "antd";
import ModalDetailInvoice from "./ModalDetailInvoice";
import { IInvoice } from "../../../interfaces";
import { invoiceApi } from "../../../api";

export default function PaymentInformantion() {
    const [invoices, setInvoices] = useState<IInvoice[]>([]);

    const [total, setTotal] = useState(0);

    const [idInvoice, setIdInvoice] = useState<Array<string>>([]);

    const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(
        null
    );
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const getInvoices = async () => {
            const response = await invoiceApi.fetchInvoiceByUserId();
            console.log(response);
            if (response.data) {
                setInvoices(response.data);
            } else {
                notification.error({
                    message: "Error",
                    description: response.message,
                });
                
            }
        };
        getInvoices();
    }, []);

    // const totalAmount = invoices.reduce(
    //     (total, invoice) => total + invoice.amount,
    //     0
    // );

    const handleCheckbox = (
        e: React.ChangeEvent<HTMLInputElement>,
        price: number,
        id: string
    ) => {
        if (e.target.checked) {
            setTotal(total + price);
            // Cập nhật idInvoice với setState
            setIdInvoice((prevIdInvoice) => [...prevIdInvoice, id]);
        } else {
            setTotal(total - price);
            // Cập nhật idInvoice với setState
            setIdInvoice((prevIdInvoice) =>
                prevIdInvoice.filter((item) => item !== id)
            );
        }
    };

    const openModal = (invoice: IInvoice) => {
        setSelectedInvoice(invoice);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedInvoice(null);
    };
    return (
        <div className="bg-white mb-5 mx-5 rounded-2xl p-6 shadow-lg text-[#2b6534] flex-grow overflow-y-auto h-[362px]">
            <h3 className="text-xl font-semibold text-[#2b6534] mb-2">
                Payment Information
            </h3>
            <table className="w-full border text-left border-collapse">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r">No.</th>
                        <th className="py-2 px-4 border-r">ID</th>
                        <th className="py-2 px-4 border-r">Description</th>
                        <th className="py-2 px-4 border-r">Amount</th>
                        <th className="py-2 px-4 border-r">Note</th>
                        <th className="py-2 px-4 border-r">Status</th>
                        <th className="py-2 px-4">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Ví dụ một hàng trong bảng */}
                    {invoices?.map((invoice, index) => (
                        <tr
                            key={invoice._id}
                            onClick={() => openModal(invoice)}
                            className="cursor-pointer"
                        >
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td className="py-2 px-4 border">{invoice._id}</td>

                            <td className="py-2 px-4 border">
                                {invoice.service.name}
                            </td>
                            <td className="py-2 px-4 border">
                                {invoice.amount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                    " đ"}
                            </td>
                            <td className="py-2 px-4 border">
                                {invoice.description}
                            </td>
                            <td className="py-2 px-4 border">
                                {invoice.status}
                            </td>
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        handleCheckbox(
                                            e,
                                            invoice.amount,
                                            invoice._id
                                        )
                                    }
                                    className="form-checkbox h-5 w-5"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Tổng tiền */}
            <div className="text-red-600 text-right mt-4 font-semibold">
                Total Selected Amount:
                <span className="p-3 font-semibold border-t">
                    {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                        " đ"}
                </span>
            </div>

            <ModalDetailInvoice
                visible={isModalVisible}
                onClose={closeModal}
                invoice={selectedInvoice}
            />
        </div>
    );
}