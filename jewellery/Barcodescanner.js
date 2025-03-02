"use client";
import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const BarcodeScannerComponent = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(true); // Manage scanner visibility
  const scannerRef = useRef(null);
  const mediaStreamRef = useRef(null); // To hold the camera stream
  const alertShownRef = useRef(false); // Track if alerts were shown

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream; // Save the stream
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately after permission
      return true;
    } catch (error) {
      if (!alertShownRef.current) {
        alertShownRef.current = true; // Prevent duplicate alerts
        alert("Camera access is required for scanning.");
        setTimeout(() => {
          alert("Please enable camera permissions in your browser settings and reload the page.");
        }, 500); // Second alert after a short delay
      }
      return false;
    }
  };

  useEffect(() => {
    const initializeScanner = async () => {
      const hasPermission = await checkCameraPermission();
      if (!hasPermission) return;

      if (!scannerRef.current && isScanning) {
        const scanner = new Html5QrcodeScanner('reader', {
          fps: 10,
          qrbox: { width: 150, height: 150 }, // Reduced size of the QR scanner box
          aspectRatio: 1.0,
        }, false);

        scanner.render(
          (decodedText) => {
            onScanSuccess(decodedText); // Send the scanned text to the parent component
            setIsScanning(false); // Hide the scanner after scan
            scanner.stop().catch(err => console.log("Stop Error:", err));
            if (mediaStreamRef.current) {
              mediaStreamRef.current.getTracks().forEach(track => track.stop()); // Stop the stream after scanning
            }
          },
          (error) => console.log('Scanning error:', error) // Handle scanning errors
        );

        scannerRef.current = scanner;
      }
    };

    initializeScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop()); // Stop the stream when component unmounts
      }
    };
  }, [isScanning]); // Dependency on `isScanning`

  return (
    <div>
      {isScanning && (
        <div id="reader" style={{ width: '200px', height: '200px' }}></div> // Set the scanner area size smaller
      )}
    </div>
  );
};

export default BarcodeScannerComponent;
