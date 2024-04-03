import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef, useCallback } from "react";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

/**
 * Component for scanning QR codes.
 * @returns {JSX.Element} ScanQRCode component.
 */
export default function ScanQRCode() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scannerRef = useRef(null);

  /**
   * Get current date in ISO string format.
   * @returns {string} Current date in ISO string format.
   */
  const getCurrentDate = useCallback(() => {
    const currentDate = new Date();
    const millisecondsSinceEpoch = currentDate.getTime();
    const bsonDate = new Date(millisecondsSinceEpoch);
    return bsonDate.toISOString();
  }, []);

  useEffect(() => {
    if (!scannerRef.current) return; // Ensure the ref is initialized

    const scanner = new Html5QrcodeScanner(scannerRef.current.id, {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const successCallback = (result) => {
      scanner.clear();
      setScanResult(result);
    };

    const errorCallback = (err) => {
      setError(err);
    };

    scanner.render(successCallback, errorCallback);

    // Cleanup function
    return () => {
      scanner.clear();
    };
  }, [scannerRef]);

  useEffect(() => {
    if (scanResult) {
      const data = JSON.parse(scanResult);
      if (data._id) {
        axiosInstance
          .put(`/inventory/${data._id}`, {
            dispatched_date: getCurrentDate(),
          })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            setError(
              err.response?.data?.message ||
                "Failed to submit invoice due to a server error."
            ); // Set error state based on server response
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setError("Invalid QR code");
      }
    }
  }, [scanResult, navigate, getCurrentDate]);

  return (
    <div>
      <div ref={scannerRef} id="reader"></div>

      {isLoading && (
        <h4 className="loadingMessage">
          Submitting the invoice to the server...
        </h4>
      )}
      {error && <h4 className="errorMessage">{error}</h4>}
    </div>
  );
}
