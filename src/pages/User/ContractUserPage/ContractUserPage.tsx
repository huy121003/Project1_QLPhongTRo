import React, { useEffect, useState } from "react";


import { useAppSelector } from "../../../redux/hook";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { IContract } from "../../../interfaces";
import { contractApi } from "../../../api";

export default function ContractUserPage() {
    const iduser = useAppSelector((state) => state.auth.user._id);
    const [contract, setContract] = useState<IContract[]>([]);
    const [openContractIndex, setOpenContractIndex] = useState<number | null>(
        null
    ); // State để theo dõi hợp đồng nào đang mở

    useEffect(() => {
        const getContract = async () => {
            const res = await contractApi.fetchContractApi(`tenant._id=${iduser}`);
            if (res.data) {
                const contractData = res.data.result;
                setContract(contractData); // Set contract data
            }
        };
        getContract();
    }, [iduser]);

    const toggleContract = (index: number) => {
        // Đóng nếu hợp đồng đang mở hoặc mở hợp đồng được chọn
        setOpenContractIndex((prevIndex) =>
            prevIndex === index ? null : index
        );
    };

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full flex flex-col">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a
                            href="/tai-chinh"
                            className="hover:underline font-semibold"
                        >
                            Contract
                        </a>
                    </li>
                </ol>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 m-5 overflow-y-auto h-[670px] ">
                {contract.map((contract, index) => (
                    <div
                        key={index}
                        className=" mb-3 bg-[#fffad3] rounded-lg shadow-md p-5 "
                    >
                        <div
                            className="   flex justify-between cursor-pointer"
                            onClick={() => toggleContract(index)}
                        >
                            <h2 className="text-2xl font-semibold">
                                Contract {index + 1}
                            </h2>
                            {openContractIndex === index ? (
                                <IoMdArrowDropup className="h-8" size={24} />
                            ) : (
                                <IoMdArrowDropdown className="h-8" size={24} />
                            )}
                        </div>
                        {openContractIndex === index && (
                            <div className="">
                                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Contract Information
                                    </h2>
                                    <p className="text-lg">
                                        Start Date:{" "}
                                        {new Date(
                                            contract.startDate
                                        ).toLocaleDateString("en-GB")}
                                    </p>
                                    <p className="text-lg">
                                        End Date:{" "}
                                        {new Date(
                                            contract.endDate
                                        ).toLocaleDateString("en-GB")}
                                    </p>
                                    <p className="text-lg">
                                        Status: {contract.status}
                                    </p>
                                </div>
                                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                                    {" "}
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Landlord Information
                                    </h2>
                                    <p className="text-lg">
                                        Name: {contract.innkeeper.name}
                                    </p>
                                    {/* fix cứng */}
                                    <p className="text-lg">
                                        Address: Số 7, Quan trung
                                    </p>
                                    <p className="text-lg">Phone: 0343310165</p>
                                </div>

                                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Tenant Information
                                    </h2>
                                    <p className="text-lg">
                                        Name: {contract.tenant.name}
                                    </p>
                                    <p className="text-lg">
                                        Address: {contract.tenant.address}
                                    </p>
                                    <p className="text-lg">
                                        Phone: {contract.tenant.phone}
                                    </p>
                                    <p className="text-lg">
                                        Email: {contract.tenant.email}
                                    </p>
                                </div>

                                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Room Details
                                    </h2>
                                    <p className="text-lg">
                                        Room Name: {contract.room.roomName}
                                    </p>
                                    <p className="text-lg">Room Type: Quad</p>
                                    <p className="text-lg">Area: A</p>
                                    <p className="text-lg">
                                        Rent Price: {contract.room.price}
                                    </p>
                                    <p className="text-lg">
                                        Amenities: Self-contained room, 45m2,
                                        with loft, 2 windows, refrigerator,
                                        water heater, full kitchen
                                    </p>
                                </div>
                                <div className="bg-[#e2face] w-full rounded-lg shadow-md p-6 mt-3">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Payment Terms
                                    </h2>
                                    <p className="text-lg">
                                        Rent: {contract.depositAmount}
                                    </p>
                                    <p className="text-lg">
                                        Deposit: 2.500.000 VND
                                    </p>
                                    <p className="text-lg">
                                        Payment Method: Chuyển khoản
                                    </p>
                                    <p className="text-lg">
                                        Payment Due Date: 13
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}