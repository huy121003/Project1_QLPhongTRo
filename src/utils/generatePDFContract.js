
import {} from 'pdf-lib';
import { PDFDocument, rgb } from 'pdf-lib';

export const generatePDFContract = async (data) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);

  page.drawText('Hello, World!', {
    x: 50,
    y: 750,
    size: 30,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
