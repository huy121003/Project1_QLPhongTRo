import React from 'react';

const RentalContract = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
        <p className="text-center text-lg">Độc lập - Tự do - Hạnh phúc</p>
        <hr className="my-4" />

        <h2 className="text-center text-xl font-bold mb-6">HỢP ĐỒNG THUÊ NHÀ</h2>

        <p className="mb-4">Hôm nay, ngày...tháng...năm 202..., tại Số nhà ...... ngách ....... tổ....., phường Yên Nghĩa, Q.Hà Đông, TP Hà Nội, chúng tôi gồm:</p>

        <h3 className="font-bold mb-2">I – BÊN CHO THUÊ (Bên A):</h3>
        <ul className="mb-4">
          <li>1. Ông/Bà (chủ sở hữu ngôi nhà): ...................................</li>
          <li>CCCD số: ...................................</li>
          <li>Hộ khẩu thường trú tại: Yên Nghĩa Hà Đông Hà Nội</li>
        </ul>

        <h3 className="font-bold mb-2">II – BÊN THUÊ (Bên B):</h3>
        <ul className="mb-4">
          <li>1. Ông/Bà: ...................................</li>
          <li>CCCD số: ...................................</li>
          <li>Hộ khẩu thường trú tại: ...................................</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 1: Mục đích thuê</h3>
        <p className="mb-4">Bên A đồng ý cho Bên B thuê phòng trọ số ….. tại địa chỉ Số nhà..... ngách........ tổ...., phường Yên Nghĩa, Q Hà Đông, TP Hà Nội làm nhà ở gồm có (số người) …</p>

        <h3 className="font-bold mb-2">Điều 2: Thời hạn hợp đồng</h3>
        <ul className="mb-4">
          <li>- Thời hạn: ......... năm, từ ngày ............ đến ngày ...........</li>
          <li>- Hết thời hạn, nếu Bên B có nhu cầu và Bên A đồng ý, hợp đồng sẽ được gia hạn dựa trên thỏa thuận mới.</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 3: Giá và phương thức thanh toán</h3>
        <ul className="mb-4">
          <li>- Đơn giá thuê: ...................... VND</li>
          <li>- Phương thức thanh toán: Chuyển khoản hoặc tiền mặt</li>
          <li>- Đặt cọc: Bên B đặt cọc ........... VND khi ký hợp đồng</li>
          <li>- Chu kỳ thanh toán: .......... tháng/lần, trong 5 ngày đầu chu kỳ</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 4: Trách nhiệm của Bên A</h3>
        <ul className="mb-4">
          <li>- Giao nhà đúng thời hạn và hiện trạng đã thỏa thuận</li>
          <li>- Hỗ trợ thủ tục cần thiết và phối hợp giải quyết tranh chấp</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 5: Trách nhiệm của Bên B</h3>
        <ul className="mb-4">
          <li>- Sử dụng nhà đúng mục đích</li>
          <li>- Không chuyển nhượng hợp đồng khi chưa có sự đồng ý của Bên A</li>
          <li>- Thanh toán tiền thuê đúng hạn và bảo quản tài sản</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 6: Chấm dứt hợp đồng</h3>
        <ul className="mb-4">
          <li>- Chấm dứt hợp đồng phải báo trước 01 tháng</li>
          <li>- Vi phạm điều khoản sẽ bồi thường 1 tháng tiền thuê</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 7: Điều khoản chung</h3>
        <ul className="mb-4">
          <li>- Hợp đồng lập thành 2 bản có giá trị như nhau</li>
          <li>- Hết hạn hợp đồng, nếu không thuê tiếp, Bên B phải thông báo trước 01 tháng</li>
        </ul>

        <div className="flex justify-between mt-8">
          <div>
            <p className="font-bold">BÊN CHO THUÊ NHÀ</p>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
          <div>
            <p className="font-bold">BÊN THUÊ NHÀ</p>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalContract;
