import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Skeleton } from 'antd';
import { IContract } from 'interfaces';

interface Props {
  contract: IContract ;
  
}

const RentalContract: React.FC<Props> = ({ contract }) => {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, [contract])
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <Skeleton loading= {loading} className='h-dvh' active >
        <h1 className="text-center text-2xl font-bold mb-4">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
        <p className="text-center text-lg">Độc lập - Tự do - Hạnh phúc</p>
        <hr className="my-4" />

        <h2 className="text-center text-xl font-bold mb-6">HỢP ĐỒNG THUÊ NHÀ</h2>

        <p className="mb-4">Hôm nay, ngày {dayjs(contract?.startDate).format('DD')} tháng {dayjs(contract.startDate).format('MM')} năm {dayjs(contract.startDate).format('YYYY')}, tại {contract.address}, chúng tôi gồm:</p>

        <h3 className="font-bold mb-2">I – BÊN CHO THUÊ (Bên A):</h3>
        <ul className="mb-4">
          <li>1. Ông/Bà (chủ sở hữu ngôi nhà): {contract?.innkeeper.name}</li>
          <li>CCCD số: {contract?.innkeeper._id}</li>
          <li>Hộ khẩu thường trú tại: {contract?.innkeeper.address}</li>
        </ul>

        <h3 className="font-bold mb-2">II – BÊN THUÊ (Bên B):</h3>
        <ul className="mb-4">
          <li>1. Ông/Bà: {contract?.tenant.name}</li>
          <li>CCCD số: {contract?.tenant.idCard}</li>
          <li>Hộ khẩu thường trú tại: {contract?.tenant.address}</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 1: Mục đích thuê</h3>
        <p className="mb-4">Bên A đồng ý cho Bên B thuê phòng trọ số {contract?.room.roomName} tại địa chỉ {contract.address} làm nhà ở gồm có (số người) {contract.numberPeople}</p>

        <h3 className="font-bold mb-2">Điều 2: Thời hạn hợp đồng</h3>
        <ul className="mb-4">
          <li>- Thời gian thuê từ ngày {dayjs(contract?.startDate).format("DD-MM-YYYY")} đến ngày {dayjs(contract.endDate).format("DD-MM-YYYY")}</li>
          <li>- Hết thời hạn, nếu Bên B có nhu cầu và Bên A đồng ý, hợp đồng sẽ được gia hạn dựa trên thỏa thuận mới.</li>
        </ul>

        <h3 className="font-bold mb-2">Điều 3: Giá và phương thức thanh toán</h3>
        <ul className="mb-4">
          <li>- Đơn giá thuê: {(contract.room.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</li>
          <li>- Phương thức thanh toán: Chuyển khoản hoặc tiền mặt</li>
          <li>- Đặt cọc: Bên B đặt cọc {(contract.depositAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND khi ký hợp đồng</li>
          <li>- Chu kỳ thanh toán: {contract.rentCycleCount} tháng/lần, trong 5 ngày đầu chu kỳ</li>
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
        </Skeleton>
      </div>
    </div>
  );
};

export default RentalContract;
