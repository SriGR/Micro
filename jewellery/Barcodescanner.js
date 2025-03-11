"use client";
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats, Html5QrcodeScanType } from "html5-qrcode";

const BarcodeScannerComponent = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef(null);
  const alertShownRef = useRef(false);
  const [scannerSize, setScannerSize] = useState({ width: 100, height: 100 });

  // ✅ Check Camera Permissions
  const checkCameraPermission = async () => {
    try {
      if (window.location.protocol === "https:" || window.location.hostname === "localhost") {
        await navigator.mediaDevices.getUserMedia({ video: true });
        return true;
      } else {
        console.warn("Camera access is restricted on HTTP (except for localhost).");
        alert("For better security, please use HTTPS to access camera.");
        return false;
      }
    } catch (error) {
      if (!alertShownRef.current) {
        alertShownRef.current = true;
        alert("Camera access is required for scanning.");
        setTimeout(() => {
          alert("Please enable camera permissions in your browser settings and reload the page.");
        }, 500);
      }
      return false;
    }
  };

  // ✅ Update Scanner Size on Resize
  useEffect(() => {
    const updateScannerSize = () => {
      const screenWidth = window.innerWidth;
      const newSize = screenWidth < 480 ? { width: 300, height: 300 } : { width: 350, height: 350 };
      setScannerSize(newSize);
    };

    window.addEventListener("resize", updateScannerSize);
    updateScannerSize();

    return () => window.removeEventListener("resize", updateScannerSize);
  }, []);

  // ✅ Initialize Scanner
  useEffect(() => {
    const initializeScanner = async () => {
      const hasPermission = await checkCameraPermission();
      if (!hasPermission) return;

      setTimeout(() => {
        if (!scannerRef.current) {
          scannerRef.current = new Html5QrcodeScanner(
            "reader",
            {
              fps: 10,
              qrbox: scannerSize,
              aspectRatio: 1.0,
              disableFlip: false,
              formatsToSupport: [
                Html5QrcodeSupportedFormats.QR_CODE,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.EAN_13,
                Html5QrcodeSupportedFormats.EAN_8,
                Html5QrcodeSupportedFormats.UPC_A,
                Html5QrcodeSupportedFormats.UPC_E,
              ],
              supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
              videoConstraints: {
                facingMode: "environment", // ✅ Use back camera on mobile
              },
            },
            false
          );

          scannerRef.current.render(
            (decodedText) => {
              if (typeof onScanSuccess === "function") {
                onScanSuccess(decodedText);
                setIsScanning(false);
                scannerRef.current.clear();
              }
            },
            (error) => {
              if (error.name !== "NotFoundException") {
             //   // console.error("Scanning error:", error);
              }
            }
          );
        }
      }, 500); // Delay scanner initialization for better performance
    };

    if (isScanning) {
      initializeScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning, scannerSize]);

  return (
    <div>
      {isScanning && (
        <div id="reader" style={{ width: scannerSize.width, height: scannerSize.height }}></div>
      )}
      {!isScanning && <button onClick={() => setIsScanning(true)}>Restart Scanner</button>}
    </div>
  );
};

export default BarcodeScannerComponent;
