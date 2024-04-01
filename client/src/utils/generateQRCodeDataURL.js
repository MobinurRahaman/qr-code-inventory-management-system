import QRCode from "qrcode";
async function generateQRCodeDataURL(item) {
  try {
    // Generate QR code data URL
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(item));
    return qrCodeDataURL;
  } catch (error) {
    return null;
  }
}

export default generateQRCodeDataURL;
