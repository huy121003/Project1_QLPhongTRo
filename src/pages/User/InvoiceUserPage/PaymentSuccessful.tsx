import { unstable_HistoryRouter } from "react-router-dom";

export default function PaymentSuccessful({ transactionDetails }) {
    // const history = unstable_HistoryRouter();

    const {
        senderName,
        senderBank,
        receiverName,
        receiverBank,
        amount,
        transferContent,
    } = transactionDetails;

    const handleBack = () => {
        // Quay lại trang trước đó
        // history.push("/user"); // Thay thế bằng đường dẫn mong muốn
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 bg-opacity-65 absolute top-0 bottom-0 left-0 right-0">
            <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
                <h2 className="text-xl font-semibold text-green-500 mb-4">
                    Thanh toán thành công!
                </h2>

                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-sm font-semibold">Tên người gửi:</p>
                        <p className="text-gray-700">{senderName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Ngân hàng người gửi:
                        </p>
                        <p className="text-gray-700">{senderBank}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Tên người nhận:</p>
                        <p className="text-gray-700">{receiverName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Ngân hàng người nhận:
                        </p>
                        <p className="text-gray-700">{receiverBank}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">Số tiền chuyển:</p>
                        <p className="text-gray-700">{amount}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">
                            Nội dung chuyển:
                        </p>
                        <p className="text-gray-700">{transferContent}</p>
                    </div>
                </div>

                <button
                    onClick={handleBack}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}
