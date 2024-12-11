import { useEffect, useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import PaymentInformation from "./child-components/PaymentInformation"; 
import Payment from "./child-components/Payment";
import { Button, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import payOSApi from "api/payOSApi/payOSApi";
import { InvoiceStatus } from "enums";
import invoiceApi from "api/invoiceApi/invoiceApi";
import InformationPersonal from "./child-components/InformationPersonal";

export default function InvoiceUserPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("QR");
  const [idInvoice, setIdInvoice] = useState<Array<string>>(() => {
    const storedInvoice = localStorage.getItem("idInvoice");
    try {
      const parsedInvoices = JSON.parse(storedInvoice || "[]");
      return Array.isArray(parsedInvoices) ? parsedInvoices : [];
    } catch (e) {
      console.error("Invalid invoice data in localStorage", e);
      return [];
    }
  });
  const [res, setRes] = useState<string>("");

  const navigate = useNavigate();

  // Effect to update localStorage whenever idInvoice changes
  useEffect(() => {
    if (idInvoice.length > 0) {
      console.log("Updating localStorage:", idInvoice);
      localStorage.setItem(
        "idInvoice",
        JSON.stringify(
          idInvoice.filter((item, index) => idInvoice.indexOf(item) === index) // Ensure uniqueness
        )
      );
    } else {
      localStorage.removeItem("idInvoice"); // Clear localStorage if no invoices
    }
  }, [idInvoice]);

  const closeModal = () => setShowModal(false);

  // Open modal with payment URL creation logic
  const openModal = async () => {
    if (!selectedBank) {
      setShowModal(true); // No bank selected
    } else if (idInvoice.length === 0) {
      setShowModal(true); // No invoices selected
    } else {
      // Bank and invoices are valid
      try {
        const response = await payOSApi.createLinkPayment(idInvoice);
        if (response) {
          setRes(response.data.checkoutUrl);
          setShowModal(true);
        } else {
          notification.error({
            message: "Error",
            description: "Something went wrong while creating payment link.",
          });
        }
      } catch (error) {
        notification.error({
          message: `Error: `,
          description: "Failed to create payment link.",
        });
      }
    }
  };

  // Handle URL query params to process payment response
  useEffect(() => {
    if (window.location.pathname === "/user/invoiceUser") {
      const url = new URL(window.location.href);
      const cancel = url.searchParams.get("cancel");
      const status = url.searchParams.get("status");
      const orderCode = url.searchParams.get("orderCode");

      if (cancel === "true") {
        notification.success({
          message: "Payment Cancel",
          description: "Your payment has been canceled.",
        });
        return;
      }

      if (status === InvoiceStatus.PAID && orderCode) {
        const update = async () => {
          try {
            const res = await invoiceApi.postInvoiceStatusPaymentApi(
              orderCode,
              idInvoice
            );
            if (res.status === 201) {
              message.success("Payment success");
              setIdInvoice([]); // Reset invoice IDs

              navigate("/user/invoiceUser"); // Reload the page or navigate to the same page
            }
          } catch (error) {
            console.error("Error updating invoice status:", error);
            message.error("Failed to update invoice status.");
          }
        };
        update();
      }
    }
  }, [window.location.href, idInvoice]);

  // Handle bank change selection
  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  return (
    <div className="bg-[#e0f5e4] h-full flex flex-col">

      <div className="bg-white mx-5 my-5 rounded-xl p-6 text-black">
      
        <InformationPersonal />

      </div>
     
      <PaymentInformation />
    
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-3 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2 text-black">
              Notification
            </h3>
            {!selectedBank && (
              <p className="text-[#2b6534] text-center mb-4">
                Please select payment method
              </p>
            )}
            {idInvoice.length === 0 && (
              <p className="text-[#2b6534] text-center mb-4">
                Please select payment
              </p>
            )}
            {selectedBank && idInvoice.length > 0 && (
              <Payment idInvoice={idInvoice} res={res} />
            )}

            <Button
              className="flex justify-self-end"
              onClick={closeModal}
              type="primary"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
