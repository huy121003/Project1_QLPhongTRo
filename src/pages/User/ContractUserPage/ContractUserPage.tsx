import React from 'react';

export default function ContractUserPage() {
    // Sample data for rental contract
    const contractInfo = {
        contractId: 'HD123456',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'Active',
    };

    const landlordInfo = {
        name: 'Nong Van Lo',
        address: '132 Cau Giay, Hanoi',
        phone: '0123 456 789',
        idNumber: '123456789',
    };

    const tenantInfo = {
        name: 'Hoang Van Hai',
        address: 'Thai Binh',
        phone: '0987 654 321',
        idNumber: '987654321',
    };

    const roomInfo = {
        roomName: 'Room 203',
        roomType: 'Single Room',
        area: '20m²',
        price: '1,500,000 VND',
        amenities: 'Bed, wardrobe, air conditioning',
    };

    const paymentInfo = {
        rent: '1.500.000 VND',
        deposit: '3.000.000 VND',
        paymentMethod: 'Bank Transfer',
        dueDate: 'Every 5th of the month',
    };

    return (
        <div className="bg-[#e0f5e4] text-[#2b6534] h-full p-6 overflow-y-scroll">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Contract Information</h2>
                <p>Contract ID: {contractInfo.contractId}</p>
                <p>Start Date: {contractInfo.startDate}</p>
                <p>End Date: {contractInfo.endDate}</p>
                <p>Status: {contractInfo.status}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Landlord Information</h2>
                <p>Name: {landlordInfo.name}</p>
                <p>Address: {landlordInfo.address}</p>
                <p>Phone: {landlordInfo.phone}</p>
                <p>ID Number: {landlordInfo.idNumber}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Tenant Information</h2>
                <p>Name: {tenantInfo.name}</p>
                <p>Address: {tenantInfo.address}</p>
                <p>Phone: {tenantInfo.phone}</p>
                <p>ID Number: {tenantInfo.idNumber}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Room Details</h2>
                <p>Room Name: {roomInfo.roomName}</p>
                <p>Room Type: {roomInfo.roomType}</p>
                <p>Area: {roomInfo.area}</p>
                <p>Rent Price: {roomInfo.price}</p>
                <p>Amenities: {roomInfo.amenities}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
                <p>Rent: {paymentInfo.rent}</p>
                <p>Deposit: {paymentInfo.deposit}</p>
                <p>Payment Method: {paymentInfo.paymentMethod}</p>
                <p>Payment Due Date: {paymentInfo.dueDate}</p>
            </div>
        </div>
    );
}
