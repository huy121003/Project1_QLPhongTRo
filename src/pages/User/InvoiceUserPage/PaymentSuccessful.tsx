export default function PaymentSuccessful() {
    const transactionDetails = {
        senderName: "Hoàng Thị Chúc",
        senderBank: "Vietinbank",
        receiverName: "Nguyễn Thị Thương",
        receiverBank: "Sacombank",
        amount: "1.999.999 VND",
        transferContent: "Phòng 203 đóng trọ",
    };

    const handleBack = () => {
       
    };

    return (
        <div className="bg-[#e0f5e4] h-full flex flex-col flex-shrink-0 ">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <h2 className="text-xl font-semibold text-green-500 mb-4">
                    Thanh toán thành công!
                </h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-sm font-semibold">Tên người gửi:</p>
                        <p className="text-gray-700">
                            {transactionDetails.senderName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Ngân hàng người gửi:
                        </p>
                        <p className="text-gray-700">
                            {transactionDetails.senderBank}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Tên người nhận:</p>
                        <p className="text-gray-700">
                            {transactionDetails.receiverName}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Ngân hàng người nhận:
                        </p>
                        <p className="text-gray-700">
                            {transactionDetails.receiverBank}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Số tiền chuyển:</p>
                        <p className="text-gray-700">
                            {transactionDetails.amount}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Nội dung chuyển:
                        </p>
                        <p className="text-gray-700">
                            {transactionDetails.transferContent}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleBack}
                    className="w-52 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}
