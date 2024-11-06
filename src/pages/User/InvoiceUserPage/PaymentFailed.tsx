import React from 'react'

export default function PaymentFailed() {
    return (
        <div className="flex items-center justify-center bg-gray-100 bg-opacity-60 absolute top-0 bottom-0 left-0 right-0">
            <div className="bg-red-100 rounded-lg p-8 w-96 shadow-lg">
                <h2 className="text-xl font-semibold text-red-600 mb-4">
                    Thanh toán thất bại!
                </h2>

                <p className="text-gray-700 mb-6">
                    Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
                </p>

                <button
                    onClick={() => window.history.back()} // Quay lại trang trước
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}
