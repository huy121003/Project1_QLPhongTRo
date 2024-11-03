import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ContractModel from '../models/ContractModel';
import moment from 'moment';

const generateContractPDF = (contract: ContractModel) => {
  // Khởi tạo PDF với encoding UTF-8
  const doc = new jsPDF('p', 'mm', 'a4', true);
  
  doc.addFont('https://raw.githubusercontent.com/tienhieu03/fonts/main/Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto', 'normal');

  doc.setFontSize(12);
  doc.text('CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM', 105, 10, { align: 'center' });
  doc.text('Độc lập - Tự do - Hạnh phúc', 105, 20, { align: 'center' });
  doc.text('-------------o0o-------------', 105, 25, { align: 'center' });
  
  doc.setFontSize(18);
  const title = 'HỢP ĐỒNG THUÊ PHÒNG';
  const titleWidth = doc.getStringUnitWidth(title) * doc.getFontSize() / doc.internal.scaleFactor;
  const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
  doc.text(title, titleX, 40);
  
  const currentDate = moment().format('DD [tháng] MM [năm] YYYY');
  doc.setFontSize(12);
  doc.text(`Hôm nay, ngày ${currentDate}, tại TP Hà Nội, chúng tôi gồm:`, 20, 60);

  // doc.setFontSize(12);
  // const contractInfo = [
  //   { text: `Số hợp đồng: ${contract._id}`, x: 20, y: 50 },
  //   { text: `Ngày lập: ${moment(contract.createdAt).format('DD/MM/YYYY')}`, x: 20, y: 60 }
  // ];
  // contractInfo.forEach(({ text, x, y }) => doc.text(text, x, y));

  doc.setFontSize(14);
  doc.text('BÊN CHO THUÊ (BÊN A):', 20, 70);
  doc.setFontSize(12);
  doc.text(`Họ và tên: ${contract.innkeeper.name}`, 30, 80);

  doc.setFontSize(14);
  doc.text('BÊN THUÊ (BÊN B):', 20, 100);
  doc.setFontSize(12);
  const tenantInfo = [
    `Họ và tên: ${contract.tenant.name}`,
    `Số điện thoại: ${contract.tenant.phone}`,
    `CCCD/CMND: ${contract.tenant.idCard}`
  ];
  tenantInfo.forEach((text, index) => {
    doc.text(text, 30, 110 + (index * 10));
  });

  doc.setFontSize(14);
  doc.text('NỘI DUNG HỢP ĐỒNG:', 20, 150);
  doc.setFontSize(12);
  const contractDetails = [
    `1. Phòng cho thuê: ${contract.room.roomName}`,
    `2. Giá thuê: ${contract.room.price.toLocaleString('vi-VN')} đồng/tháng`,
    `3. Tiền đặt cọc: ${contract.depositAmount.toLocaleString('vi-VN')} đồng`,
    '4. Thời hạn thuê:',
    `   - Từ ngày: ${moment(contract.startDate).format('DD/MM/YYYY')}`,
    `   - Đến ngày: ${moment(contract.endDate).format('DD/MM/YYYY')}`
  ];
  contractDetails.forEach((text, index) => {
    doc.text(text, 30, 160 + (index * 10));
  });

  doc.text('Chữ ký các bên:', 20, 240);
  doc.text('Bên cho thuê (Bên A)', 50, 260);
  doc.text('Bên thuê (Bên B)', 150, 260);

  doc.setFontSize(10);
  doc.text(`Thông tin liên hệ: ${contract.createdBy.email}`, 20, 290);

  return doc;
};

export const downloadContractPDF = (contract: ContractModel) => {
  const doc = generateContractPDF(contract);
  const fileName = `Contract_${contract._id}_${moment().format('DDMMYYYY')}.pdf`;
  doc.save(fileName);
};

export default generateContractPDF;