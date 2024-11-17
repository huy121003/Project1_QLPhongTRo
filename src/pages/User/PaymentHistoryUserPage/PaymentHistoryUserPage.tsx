import { useEffect, useState } from "react";
import InvoiceModel from "../../../models/InvoiceModal";
import { fetchInvoiceApi, fetchInvoiceByUserId } from "../../../api/invoiceApi";
import { message } from "antd";
import ModalDetailInvoice from "../InvoiceUserPage/ModalDetailInvoice";
import ContractModel from "../../../models/ContractModel";
import RoomModel from "../../../models/RoomModel";
import { fetchContractApi } from "../../../api/contractApi";
import { useAppSelector } from "../../../redux/hook";

export default function PaymentHistoryUserPage() {
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);

    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModel | null>(
        null
    );

    //Lưu trữ danh sách các hóa đơn đã được lọc theo danh mục
    const [filteredInvoices, setFilteredInvoices] = useState<InvoiceModel[]>(
        []
    );
    //Lưu trạng thái danh mục hóa đơn đang chọn để lọc.
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Quản lý hợp đồng và phòng
    const [contracts, setContracts] = useState<ContractModel[]>([]);
    const [rooms, setRooms] = useState<RoomModel[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

    useEffect(() => {
        const getContracts = async () => {
            const res = await fetchContractApi(`tenant._id=${iduser}`);
            if (res.data) {
                const allContracts = res.data.result;
                // Lọc chỉ lấy hợp đồng có status "active"
                const activeContracts = allContracts.filter(
                    (contract: ContractModel) => contract.status === "ACTIVE"
                );
                const roomsFromContracts = activeContracts.map(
                    (contract: ContractModel) => contract.room
                );
                setRooms(roomsFromContracts);
                // Đặt phòng đầu tiên làm mặc định
                if (roomsFromContracts.length > 0) {
                    setSelectedRoomId(roomsFromContracts[0]._id);
                }
            } else {
                message.error(res.message);
            }
        };
        getContracts();
    }, [iduser]);

    useEffect(() => {
        const getInvoices = async () => {
            const response = await fetchInvoiceByUserId();
            if (response.data) {
                // Lọc các hóa đơn có trạng thái PAID
                const paidInvoices = response.data.filter(
                    (invoice: InvoiceModel) => invoice.status === "PAID"
                );
                setInvoices(paidInvoices);
                setFilteredInvoices(paidInvoices); // Hiển thị tất cả hóa đơn PAID mặc định
            } else {
                message.error(response.message);
            }
        };
        getInvoices();
    }, []);

    useEffect(() => {
        // Lọc hóa đơn dựa trên danh mục đã chọn
        const filterByCategory = () => {
            let filtered = invoices;

            // Lọc theo phòng
            if (selectedRoomId) {
                filtered = filtered.filter(
                    (invoice) => invoice.room._id === selectedRoomId
                );
            }
            // Lọc theo danh mục
            if (selectedCategory !== "ALL") {
                if (selectedCategory === "RENT") {
                    filtered = filtered.filter(
                        (invoice) =>
                            invoice.service.name.toLowerCase() ===
                            "Trọ".toLowerCase()
                    );
                } else if (selectedCategory === "ELECTRICITY") {
                    filtered = filtered.filter(
                        (invoice) =>
                            invoice.service.name.toLowerCase() ===
                            "Điện".toLowerCase()
                    );
                } else if (selectedCategory === "WATER") {
                    filtered = filtered.filter(
                        (invoice) =>
                            invoice.service.name.toLowerCase() ===
                            "Nước".toLowerCase()
                    );
                } else if (selectedCategory === "OTHER") {
                    filtered = filtered.filter((invoice) =>
                        ["Mạng", "Vệ sinh", "Gửi xe"]
                            .map((item) => item.toLowerCase())
                            .includes(invoice.service.name.toLowerCase())
                    );
                }
            }

            setFilteredInvoices(filtered);
        };

        filterByCategory();
    }, [selectedCategory, invoices, selectedRoomId]);

    const totalAmount = filteredInvoices.reduce(
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
        <div className="bg-[#e0f5e4] text-[#2b6534] h-screen flex flex-col overflow-y-auto custom-scrollbar overflow-x-scroll sm:overflow-x-hidden">
            {/* <div
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
            </div> */}
            <div className="p-6 m-0 sm:m-6 bg-white rounded-lg shadow-md h-full">
                <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

                {/* Danh sách các phòng */}
                {rooms.length > 0 && (
                    <div className="flex flex-row gap-4 mb-4">
                        {rooms.map((room, index) => (
                            <button
                                key={room._id}
                                className={`px-4 py-2 rounded-lg shadow ${
                                    selectedRoomId === room._id
                                        ? "bg-green-300 text-white"
                                        : "bg-green-100 hover:bg-green-200"
                                }`}
                                onClick={() => setSelectedRoomId(room._id)}
                            >
                                Phòng {room.roomName}
                            </button>
                        ))}
                    </div>
                )}
                {/* Danh mục lọc */}
                <div className="flex flex-row gap-5 text-base font-semibold pb-4">
                    <span
                        className={`cursor-pointer ${
                            selectedCategory === "ALL"
                                ? "text-[#76e648] underline"
                                : ""
                        }`}
                        onClick={() => setSelectedCategory("ALL")}
                    >
                        All
                    </span>
                    <span
                        className={`cursor-pointer ${
                            selectedCategory === "RENT"
                                ? "text-[#76e648] underline"
                                : ""
                        }`}
                        onClick={() => setSelectedCategory("RENT")}
                    >
                        Tiền nhà
                    </span>
                    <span
                        className={`cursor-pointer ${
                            selectedCategory === "ELECTRICITY"
                                ? "text-[#76e648] underline"
                                : ""
                        }`}
                        onClick={() => setSelectedCategory("ELECTRICITY")}
                    >
                        Tiền điện
                    </span>
                    <span
                        className={`cursor-pointer ${
                            selectedCategory === "WATER"
                                ? "text-[#76e648] underline"
                                : ""
                        }`}
                        onClick={() => setSelectedCategory("WATER")}
                    >
                        Tiền nước
                    </span>
                    <span
                        className={`cursor-pointer ${
                            selectedCategory === "OTHER"
                                ? "text-[#76e648] underline"
                                : ""
                        }`}
                        onClick={() => setSelectedCategory("OTHER")}
                    >
                        Tiền dịch vụ khác
                    </span>
                </div>
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
                        {filteredInvoices.map((invoice) => (
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
