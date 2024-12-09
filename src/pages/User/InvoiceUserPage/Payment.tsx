import  { useState, useEffect } from "react";

import { payOSApi } from "../../../api/";
import { Button } from "antd";

export const PaymentButton = ({
    onCreatePaymentLink,
}: {
    onCreatePaymentLink: any;
}) => (
    <div className="main-box">
        <div className="checkout">
            <Button
               
                id="create-payment-link-btn"
                onClick={onCreatePaymentLink}
                className=" text-blue-500"
            >
                Go to payment page
            </Button>
        </div>
    </div>
);

const CheckoutMessage = ({ message }: { message: string }) => (
    <div className="main-box">
        <div className="checkout">
            <div className="product">
                <p>{message}</p>
            </div>
            <button
                type="button"
                id="create-payment-link-btn"
                onClick={() => (window.location.href = "/")}
            >
                Return to home page
            </button>
        </div>
    </div>
);

export default function Payment({
    idInvoice,

}: {
    idInvoice: string[];
    res: any;
}) {
    const [message, setMessage] = useState("");

    const handleCreatePaymentLink = async () => {
        try {
            const response = await payOSApi.createLinkPayment(idInvoice);
            
            if (response.data && response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
            } else {
                setMessage("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error creating payment link:", error);
            setMessage("Unable to create payment link. Please try again.");
        }
    };

    useEffect(() => {
        // Kiểm tra trạng thái đơn hàng
        const query = new URLSearchParams(window.location.search);
        console.log(query);
        if (query.get("success")) {
            setMessage("Payment successful. Thank you for using payOS!");
            //  handleAutoUpdateStatus(); // Gọi cập nhật trạng thái khi thanh toán thành công
        }

        if (query.get("canceled")) {
            setMessage(
                "Payment failed If you have any questions, please email support@payos.vn."
            );
        }
    }, []);

    return message ? (
        <CheckoutMessage message={message} />
    ) : (
        <PaymentButton onCreatePaymentLink={handleCreatePaymentLink} />
    );
}
