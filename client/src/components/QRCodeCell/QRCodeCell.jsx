import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import generateQRCodeDataURL from "../../utils/generateQRCodeDataURL";

/**
 * Component for rendering QR code cell.
 * @param {object} props - Component props.
 * @param {object} props.item - Data object for generating QR code.
 * @returns {JSX.Element} QRCodeCell component.
 */
export default function QRCodeCell({ item }) {
  const [qrCodeDataURL, setQRCodeDataURL] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    /**
     * Asynchronously generates QR code data URL.
     */
    async function generateQRCode() {
      const dataURL = await generateQRCodeDataURL(item);
      setQRCodeDataURL(dataURL);
    }
    generateQRCode();
  }, [item]);

  /**
   * Handles downloading the QR code image.
   */
  const handleImageDownload = () => {
    const img = imgRef.current;
    if (img) {
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return qrCodeDataURL ? (
    <img
      ref={imgRef}
      className="qrImg"
      src={qrCodeDataURL}
      alt="QR Code"
      onClick={handleImageDownload}
    />
  ) : (
    <div>Loading QR Code...</div>
  );
}

QRCodeCell.propTypes = {
  item: PropTypes.object.isRequired, // Assuming `item` is an object
};
