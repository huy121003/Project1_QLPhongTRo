import { useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import { QRCode } from "antd";
import InformationPersonal from "./InformationPersonal";
import PaymentInformantion from "./PaymentInformantion";

export default function InvoiceUserPage() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="bg-[#e0f5e4] h-full flex flex-col  ">
            <div
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
            </div>
            <div className="bg-white mb-5 mx-5 mt-5 rounded-2xl p-6 shadow-lg text-[#2b6534] ">
       
                {/* Thông tin cá nhân */}
                <InformationPersonal />

                {/* Chức năng thanh toán */}
                <div className="flex items-center justify-end space-x-4  text-lg">
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

               
            </div>

            {/* Thông tin thanh toán */}
            <PaymentInformantion />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Scan QR Code to Pay
                        </h3>
                        <div className="flex justify-center mb-4">
                            <QRCode value="YourPaymentLinkHere" size={200} />
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
        </div>
    );
}
