import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { SlPaperPlane } from "react-icons/sl";
import { QRCode } from "antd";
import PaymentSuccessful from "./PaymentSuccessful";
import PaymentFailed from "./PaymentFailed";

export default function InvoiceUserPage() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // const [transactionDetails, setTransactionDetails] = useState({
    //     senderName: "Hoàng Thị Chúc",
    //     senderBank: "Vietinbank",
    //     receiverName: "Nguyễn Thị Thương",
    //     receiverBank: "Sacombank",
    //     amount: "1.999.999 VND",
    //     transferContent: "Phòng 203 đóng trọ",
    // });
    // const [showSuccess, setShowSuccess] = useState(false);
    // const [showFailed, setShowFailed] = useState(true);
    return (
        <div className="bg-[#e0f5e4] h-full flex flex-col flex-shrink-0">
            <Breadcrumb />
            <div className="bg-neutral-100 flex-grow m-5 rounded-2xl p-6 shadow-lg text-[#2b6534] relative">
                {/* <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg"> */}
                {/* Thông tin cá nhân */}
                <div className="border-b pb-4 mb-4">
                    <h2 className="text-2xl font-semibold ">
                        PERSONAL INFORMATION
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-xl">
                        <div>
                            <p className="font-medium py-2">
                                Full Name:{" "}
                                <span className="font-semibold">
                                    Lưu Huy Hiếu
                                </span>
                            </p>
                            <p className="font-medium py-2">
                                Address:{" "}
                                <span className="font-semibold">
                                    Cầu giấy - Hà Nội
                                </span>
                            </p>
                            <p className="font-medium py-2">
                                Phone:{" "}
                                <span className="font-semibold">
                                    0343310165
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="font-medium py-2">
                                ID Card:{" "}
                                <span className="font-semibold">240820829</span>
                            </p>
                            <p className="font-medium py-2">
                                Date of Birth:{" "}
                                <span className="font-semibold">24/2/2000</span>
                            </p>
                            <p className="font-medium py-2">
                                Email:{" "}
                                <span className="font-semibold">
                                    xeoxeo1895@gmail.com
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Chức năng thanh toán */}
                <div className="flex items-center justify-end space-x-4 mb-4 text-lg">
                    <select className=" border-2 border-lime-600 rounded-md p-2">
                        <option value="">QR Code</option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </select>
                    <button
                        onClick={openModal}
                        className="bg-amber-300 text-[#2b6534]  px-4 py-2 rounded-md flex items-center hover:bg-amber-500 bg:text-[#1f5e28]"
                    >
                        <SlPaperPlane size={24} />
                        <span className="pl-2">Make Payment</span>
                    </button>
                </div>
                {/* Thông tin thanh toán */}
                <h3 className="text-xl font-semibold text-[#2b6534] mb-2">
                    Payment Information
                </h3>
                <table className="w-full border text-left border-collapse ">
                    <thead>
                        <tr className="border">
                            <th className="py-2 px-4 border-r">No.</th>
                            <th className="py-2 px-4 border-r">Description</th>
                            <th className="py-2 px-4 border-r">Amount</th>
                            <th className="py-2 px-4 border-r">Note</th>
                            <th className="py-2 px-4">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ví dụ một hàng trong bảng */}
                        <tr>
                            <td className="py-2 px-4 border">1</td>
                            <td className="py-2 px-4 border">Tiền nhà</td>
                            <td className="py-2 px-4 border">3.000.000 VND</td>
                            <td className="py-2 px-4 border">-</td>
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border">2</td>
                            <td className="py-2 px-4 border">Tiền nước</td>
                            <td className="py-2 px-4 border">150.000 VND</td>
                            <td className="py-2 px-4 border">-</td>
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5"
                                />
                            </td>
                        </tr>
                        {/* Thêm các hàng khác tại đây */}
                    </tbody>
                </table>
                {/* Tổng tiền */}
                <div className="text-red-600 text-right mt-4 font-semibold">
                    Total Selected Amount: 0
                </div>
                {/* </div> */}
                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                            <h3 className="text-xl font-semibold mb-4 text-center">
                                Scan QR Code to Pay
                            </h3>
                            <div className="flex justify-center mb-4">
                                <QRCode
                                    value="YourPaymentLinkHere"
                                    size={200}
                                />
                            </div>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-red-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {/* Hiển thị kết quả thanh toán */}
                {/* {showSuccess && (
                    <PaymentSuccessful
                        transactionDetails={transactionDetails}
                    />
                )} */}
                {/* {showFailed && <PaymentFailed />}{" "} */}
                {/* Hiển thị trang thanh toán thất bại */}
            </div>
        </div>
    );
}
