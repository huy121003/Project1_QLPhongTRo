import { useState } from "react";
import { SlPaperPlane } from "react-icons/sl";

import InformationPersonal from "./InformationPersonal";
import PaymentInformantion from "./PaymentInformantion";
import { IoClose } from "react-icons/io5";
import Payment from "./Payment";
import { createLinkPayment } from "../../../api/invoiceApi";
import { QRCode } from "antd";

export default function InvoiceUserPage() {
    const [showModal, setShowModal] = useState(false);
    const [hasCheckedInvoice, setHasCheckedInvoice] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [idInvoice, setIdInvoice] = useState<Array<string>>([]);
    const [res, setRes] = useState("");

    const closeModal = () => setShowModal(false);
    const openModal = async () => {
        if (!selectedBank) {
            setShowModal(true); // Chưa chọn ngân hàng
        } else if (!checkIfInvoiceSelected()) {
            setShowModal(true); // Chưa chọn hóa đơn
        } else {
            // ngân hàng và hóa đơn đều hợp lệ
            const response = await createLinkPayment(
                idInvoice,
                "672cf30b877bb21c52807201"
            );
            setRes(response);
            setShowModal(true);
        }
    };

    const checkIfInvoiceSelected = () => {
        // Kiểm tra xem có hóa đơn nào được chọn không
        return hasCheckedInvoice; // Trả về true nếu có hóa đơn được chọn
    };

    const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBank(event.target.value);
    };

    return (
        <div className="bg-[#e0f5e4] h-screen  flex flex-col  ">
            {/* <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a href="/tai-chinh" className=" hover:underline">
                            Finance
                        </a>
                    </li>
                    <li>
                        <span className="text-[#2b6534]">›</span>
                    </li>
                    <li className="font-semibold ">Pay online</li>
                </ol>
            </div> */}
            <div className="bg-white mb-5 mt-0 md:mt-5 mx-0 md:mx-5 rounded-2xl p-6 shadow-lg text-[#2b6534] ">
                {/* Thông tin cá nhân */}
                <InformationPersonal />

                {/* Chức năng thanh toán */}
                <div className="flex items-center justify-start lg:justify-end space-x-4  text-lg">
                    <select
                        className=" border-2 border-lime-600 rounded-md p-2"
                        defaultValue="SelectBank"
                        value={selectedBank}
                        onChange={handleBankChange}
                    >
                        <option value="SelectBank">
                            Chọn tài khoản ngân hàng
                        </option>
                        <option value="QRCode">QR Code</option>
                    </select>
                    <button
                        onClick={openModal}
                        className="bg-amber-300 text-[#2b6534]  px-4 py-2 rounded-md flex items-center hover:bg-amber-500 bg:text-[#1f5e28]"
                    >
                        <SlPaperPlane size={24} />
                        <span className="pl-2">Make Payment</span>
                    </button>
                </div>
            </div>

            {/* Thông tin thanh toán */}
            <PaymentInformantion
                onInvoiceSelectChange={(
                    selected: boolean,
                    selectedIds: string[]
                ) => {
                    setHasCheckedInvoice(selected); // Cập nhật trạng thái chọn hóa đơn
                    setIdInvoice(selectedIds); // Lưu id hóa đơn đã chọn
                }}
            />

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-3 max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2 text-[#2b6534]">
                            Thông báo
                        </h3>
                        {!selectedBank && (
                            <p className="text-[#2b6534] text-center mb-4">
                                Vui lòng chọn ngân hàng
                            </p>
                        )}
                        {!checkIfInvoiceSelected() && (
                            <p className="text-[#2b6534] text-center mb-4">
                                Vui lòng chọn khoản thanh toán
                            </p>
                        )}
                        {selectedBank && checkIfInvoiceSelected() && (
                            <Payment idInvoice={idInvoice} res={res} />
                        )}
                        <button
                            onClick={closeModal}
                            className=" text-[#2b6534] rounded-lg mt-4 font-semibold flex items-center justify-self-end"
                        >
                            <IoClose /> Close
                        </button>
                    </div>
                </div>
            )}

            </div>
        );
    }
