import React, { useEffect, useState } from "react";
import InvoiceModel from "../../../models/InvoiceModal";
import { fetchInvoiceByUserId } from "../../../api/invoiceApi";
import { message, Pagination } from "antd";
import ModalDetailInvoice from "./ModalDetailInvoice";
import ContractModel from "../../../models/ContractModel";
import RoomModel from "../../../models/RoomModel";
import { useAppSelector } from "../../../redux/hook";
import { fetchContractApi } from "../../../api/contractApi";

interface PaymentInformationProps {
    onInvoiceSelectChange: (selected: boolean, selectedIds: string[]) => void; // Cập nhật callback để trả lại ids
}

export default function PaymentInformantion({
    onInvoiceSelectChange,
}: PaymentInformationProps) {
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);

    const [total, setTotal] = useState(0);

    //DS ID hóa đơn mà người dùng đã chọn
    const [idInvoice, setIdInvoice] = useState<Array<string>>([]);

    //Lưu trữ hóa đơn cụ thể mà click vào để xem chi tiết.
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModel | null>(
        null
    );
    const [isModalVisible, setIsModalVisible] = useState(false);

    //Lưu trữ danh sách các hóa đơn đã được lọc theo danh mục
    const [filteredInvoices, setFilteredInvoices] = useState<InvoiceModel[]>(
        []
    );
    //Lưu trạng thái danh mục hóa đơn đang chọn để lọc.
    const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

    const [selectAll, setSelectAll] = useState(false); // State để quản lý checkbox chính

    const iduser = useAppSelector((state) => state.auth.user._id);
    // Quản lý hợp đồng và phòng
    const [contracts, setContracts] = useState<ContractModel[]>([]);
    const [rooms, setRooms] = useState<RoomModel[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
    //call api

    //Lấy hợp đồng ứng vs user
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

    //lấy hóa đơn
    useEffect(() => {
        const getInvoices = async () => {
            const response = await fetchInvoiceByUserId();
            console.log(response);
            if (response.data && Array.isArray(response.data)) {
                // Chỉ lấy các hóa đơn có trạng thái "unpaid"
                const unpaidInvoices = response.data.filter(
                    (invoice: InvoiceModel) => invoice.status === "UNPAID"
                );
                setInvoices(unpaidInvoices);
                setFilteredInvoices(unpaidInvoices); // Hiển thị tất cả hóa đơn mặc định
            } else {
                message.error(response.message || "Data format is incorrect");
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

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        // Nếu checkbox chính được chọn, thêm tất cả ID vào danh sách
        if (isChecked) {
            setIdInvoice(filteredInvoices.map((invoice) => invoice._id));
            setTotal(
                filteredInvoices.reduce(
                    (sum, invoice) => sum + invoice.amount,
                    0
                )
            );
            onInvoiceSelectChange(
                true,
                filteredInvoices.map((invoice) => invoice._id)
            );
        } else {
            // Nếu checkbox chính được bỏ chọn, xóa tất cả ID
            setIdInvoice([]);
            setTotal(0);
            onInvoiceSelectChange(false, []);
        }
    };

    const handleCheckbox = (
        e: React.ChangeEvent<HTMLInputElement>,
        price: number,
        id: string
    ) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setTotal(total + price);
            // Cập nhật idInvoice với setState
            setIdInvoice((prevIdInvoice) => [...prevIdInvoice, id]);
            onInvoiceSelectChange(true, [...idInvoice, id]);
        } else {
            setTotal(total - price);
            // Cập nhật idInvoice với setState
            setIdInvoice((prevIdInvoice) =>
                prevIdInvoice.filter((item) => item !== id)
            );

            onInvoiceSelectChange(
                idInvoice.length > 1,
                idInvoice.filter((item) => item !== id)
            );
        }
        // Nếu tất cả checkbox được check, tự động chọn checkbox chính
        if (!isChecked) {
            setSelectAll(false);
        } else if (
            filteredInvoices.every(
                (invoice) =>
                    idInvoice.includes(invoice._id) || invoice._id === id
            )
        ) {
            setSelectAll(true);
        }
    };

    const openModal = (invoice: InvoiceModel) => {
        setSelectedInvoice(invoice);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedInvoice(null);
    };

    console.log(idInvoice);
    return (
        <div className="bg-white mb-0 md:mb-5 mx-0 md:mx-5 rounded-2xl p-6 shadow-lg text-[#2b6534] flex-grow overflow-x-auto md:overflow-x-hidden">
            <h3 className="text-xl font-semibold text-[#2b6534] mb-2">
                Payment Information
            </h3>
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
            <table className="w-full border text-left ">
                <thead>
                    <tr className="border">
                        <th className="py-2 px-4 border-r">No.</th>
                        <th className="py-2 px-4 border-r">ID</th>

                        <th className="py-2 px-4 border-r">Name</th>

                        <th className="py-2 px-4 border-r">Description</th>
                        <th className="py-2 px-4 border-r">Amount</th>

                        <th className="py-2 px-4 border-r">Status</th>
                        <th className="py-2 px-4 border-r">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5"
                                checked={selectAll} // Liên kết với trạng thái `selectAll`
                                onChange={handleSelectAll}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Ví dụ một hàng trong bảng */}
                    {filteredInvoices?.map((invoice, index) => (
                        <tr key={invoice._id}>
                            <td className="py-2 px-4 border">{index + 1}</td>
                            <td
                                className="py-2 px-4 border cursor-pointer"
                                onClick={() => openModal(invoice)}
                            >
                                {invoice._id}
                            </td>

                            <td className="py-2 px-4 border">
                                {invoice.service.name}
                            </td>

                            <td className="py-2 px-4 border">
                                {invoice.description}
                            </td>
                            <td className="py-2 px-4 border">
                                {invoice.amount
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                                    " đ"}
                            </td>

                            <td className="py-2 px-4 border">
                                {invoice.status}
                            </td>
                            <td className="py-2 px-4">
                                <input
                                    type="checkbox"
                                    checked={idInvoice.includes(invoice._id)} // Đánh dấu nếu ID đã được chọn
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
