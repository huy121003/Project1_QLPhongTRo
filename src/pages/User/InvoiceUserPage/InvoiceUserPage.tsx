import { useEffect, useState } from "react";
import { SlPaperPlane } from "react-icons/sl";
import InformationPersonal from "./InformationPersonal";
import PaymentInformantion from "./PaymentInformantion";
import { IoClose } from "react-icons/io5";
import Payment from "./Payment";
import { invoiceApi, payOSApi } from "../../../api";
import { message, notification } from "antd";
import { InvoiceStatus } from "../../../enums";
import { useNavigate } from "react-router-dom";

export default function InvoiceUserPage() {
  const [showModal, setShowModal] = useState(false);
  //const [hasCheckedInvoice, setHasCheckedInvoice] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [idInvoice, setIdInvoice] = useState<Array<string>>(
    //lấy mảng id hóa đơn từ local storage
    JSON.parse(localStorage.getItem("idInvoice") || "[]")
  );
  console.log(idInvoice);

  useEffect(() => {
    localStorage.setItem(
      "idInvoice",
      JSON.stringify(
        idInvoice.filter((item, index) => idInvoice.indexOf(item) === index)
      )
    );
  }, [idInvoice]);

  const [res, setRes] = useState<string>("");

  const closeModal = () => setShowModal(false);
  const openModal = async () => {
    if (!selectedBank) {
      setShowModal(true); // Chưa chọn ngân hàng
    } else if (idInvoice.length === 0) {
      setShowModal(true); // Chưa chọn hóa đơn
    } else {
      // ngân hàng và hóa đơn đều hợp lệ
      const response = await payOSApi.createLinkPayment(idInvoice);
      if (response) {
        setRes(response.data.checkoutUrl);
        setShowModal(true);
      } else {
        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      }
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra phần pathname
    if (window.location.pathname === "/user/invoiceUser") {
      // Tạo đối tượng URL từ window.location.href
      const url = new URL(window.location.href);

      // Kiểm tra xem query string có chứa "code" không
      if (url.searchParams.has("code")) {
        console.log("Đang ở URL /user/invoiceUser với code");

        // Lấy giá trị từ query string
        //const code = url.searchParams.get("code");
        // const id = url.searchParams.get("id");
        const cancel = url.searchParams.get("cancel");
        const status = url.searchParams.get("status");
        const orderCode = url.searchParams.get("orderCode");
        if (cancel === "true") {
          notification.success({
            message: "Payment Cancel",
            description: "Your payment has been canceled",
          });
          return;
        }
        if (status === InvoiceStatus.PAID && orderCode) {
          notification.success({
            message: "Payment Success",
            description: "Your payment has been successfully",
          });
          //   console.log("aaa", idInvoice);
          const update = async () => {
            const res = await invoiceApi.postInvoiceStatusPaymentApi(
              orderCode,
              idInvoice
            );
            if (res.status === 201) {
              message.success("Payment success");

              setIdInvoice([]);

              //reload lại trang
              navigate("/user/invoiceUser");

              //   xóa id hóa đơn trong local
            }
          };
          update();

          return;
        }

        //     console.log({ code, id });
      }
    }
  }, [window.location.href]);

  //   const checkIfInvoiceSelected = () => {
  //     // Kiểm tra xem có hóa đơn nào được chọn không
  //     return hasCheckedInvoice; // Trả về true nếu có hóa đơn được chọn
  //   };

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  return (
    <div className="bg-[#e0f5e4] h-full flex flex-col  ">
      <div
        aria-label="breadcrumb"
        className="text-xl text-[#2b6534] bg-neutral-100 px-7 py-4 shadow-lg"
      >
        <ol className="flex space-x-2">
          <li>
            <a href="/tai-chinh" className=" hover:underline">
              Finance
            </a>
          </li>
          <li>
            <span className="text-[#2b6534]">›</span>
          </li>
          <li className="font-semibold ">Pay online</li>
        </ol>
      </div>
      <div className="bg-white mb-5 mx-5 mt-5 rounded-2xl p-6 shadow-lg text-[#2b6534] ">
        {/* Thông tin cá nhân */}
        <InformationPersonal />

        {/* Chức năng thanh toán */}
        <div className="flex items-center justify-end space-x-4  text-lg">
          <select
            className=" border-2 border-lime-600 rounded-md p-2"
            defaultValue="SelectBank"
            value={selectedBank}
            onChange={handleBankChange}
          >
            <option value="SelectBank">Chọn tài khoản ngân hàng</option>
            <option value="QRCode">QR Code</option>
          </select>
          <button
            onClick={openModal}
            className="bg-amber-300 text-[#2b6534]  px-4 py-2 rounded-md flex items-center hover:bg-amber-500 bg:text-[#1f5e28]"
          >
            <SlPaperPlane size={24} />
            <span className="pl-2">Make Payment</span>
          </button>
        </div>
      </div>

      {/* Thông tin thanh toán */}
      <PaymentInformantion
        setIdInvoices={setIdInvoice}
        idInvoice={idInvoice}
        //     onInvoiceSelectChange={(selected: boolean, selectedIds: string[]) => {
        //   //    setHasCheckedInvoice(selected); // Cập nhật trạng thái chọn hóa đơn
        //       setIdInvoice(selectedIds); // Lưu id hóa đơn đã chọn
        //       //lư id hóa đơn vào local storage nó là 1 mảng nếu id đã tồn tại thì không thêm vào
        //     }}
      />

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-3 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2 text-[#2b6534]">
              Thông báo
            </h3>
            {!selectedBank && (
              <p className="text-[#2b6534] text-center mb-4">
                Vui lòng chọn ngân hàng
              </p>
            )}
            {idInvoice.length === 0 && (
              <p className="text-[#2b6534] text-center mb-4">
                Vui lòng chọn khoản thanh toán
              </p>
            )}
            {selectedBank && idInvoice.length > 0 && (
              <Payment idInvoice={idInvoice} res={res} />
            )}
            <button
              onClick={closeModal}
              className=" text-[#2b6534] rounded-lg mt-4 font-semibold flex items-center justify-self-end"
            >
              <IoClose /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
