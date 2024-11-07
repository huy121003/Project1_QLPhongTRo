import React from "react";

export default function ContractUserPage() {
    // Sample data for rental contract
    const contractInfo = {
        contractId: "HD123456",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        status: "Active",
    };

    const landlordInfo = {
        name: "Nong Van Lo",
        address: "132 Cau Giay, Hanoi",
        phone: "0123 456 789",
        idNumber: "123456789",
    };

    const tenantInfo = {
        name: "Hoang Van Hai",
        address: "Thai Binh",
        phone: "0987 654 321",
        idNumber: "987654321",
    };

    const roomInfo = {
        roomName: "Room 203",
        roomType: "Single Room",
        area: "20m²",
        price: "1,500,000 VND",
        amenities: "Bed, wardrobe, air conditioning",
    };

    const paymentInfo = {
        rent: "1.500.000 VND",
        deposit: "3.000.000 VND",
        paymentMethod: "Bank Transfer",
        dueDate: "Every 5th of the month",
    };

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full  overflow-y-scroll">
            <div
                aria-label="breadcrumb"
                className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
            >
                <ol className="flex space-x-2">
                    <li>
                        <a
                            href="/tai-chinh"
                            className=" hover:underline font-semibold"
                        >
                            Contract
                        </a>
                    </li>
                </ol>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 m-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Contract Information
                </h2>
                <p className="text-lg">Contract ID: {contractInfo.contractId}</p>
                <p className="text-lg">Start Date: {contractInfo.startDate}</p>
                <p className="text-lg">End Date: {contractInfo.endDate}</p>
                <p className="text-lg">Status: {contractInfo.status}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 m-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Landlord Information
                </h2>
                <p className="text-lg">Name: {landlordInfo.name}</p>
                <p className="text-lg">Address: {landlordInfo.address}</p>
                <p className="text-lg">Phone: {landlordInfo.phone}</p>
                <p className="text-lg">ID Number: {landlordInfo.idNumber}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 m-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Tenant Information
                </h2>
                <p className="text-lg">Name: {tenantInfo.name}</p>
                <p className="text-lg">Address: {tenantInfo.address}</p>
                <p className="text-lg">Phone: {tenantInfo.phone}</p>
                <p className="text-lg">ID Number: {tenantInfo.idNumber}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 m-6">
                <h2 className="text-2xl font-semibold mb-4">Room Details</h2>
                <p className="text-lg">Room Name: {roomInfo.roomName}</p>
                <p className="text-lg">Room Type: {roomInfo.roomType}</p>
                <p className="text-lg">Area: {roomInfo.area}</p>
                <p className="text-lg">Rent Price: {roomInfo.price}</p>
                <p className="text-lg">Amenities: {roomInfo.amenities}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 m-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <p className="text-lg">Rent: {paymentInfo.rent}</p>
                <p className="text-lg">Deposit: {paymentInfo.deposit}</p>
                <p className="text-lg">Payment Method: {paymentInfo.paymentMethod}</p>
                <p className="text-lg">Payment Due Date: {paymentInfo.dueDate}</p>
            </div>
        </div>
    );
}
