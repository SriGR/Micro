"use client";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const BarcodeScannerComponent = ({ onScanSuccess, CloseCamera }) => {
  const [deviceId, setDeviceId] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    // Only run this code on mobile devices or when the camera is enabled
    if (cameraActive && typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        // Filter out video devices (cameras)
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        if (videoDevices.length > 0) {
          // Try to find the back camera first
          const backCamera = videoDevices.find((device) =>
            device.label.toLowerCase().includes("back")
          );
          if (backCamera) {
            setDeviceId(backCamera.deviceId);
          } else {
            // If no back camera found, fall back to the first available camera
            setDeviceId(videoDevices[0].deviceId);
          }
        }
      }).catch((error) => {
        console.error("Error accessing media devices:", error);
      });
    }

    return () => {
      // Cleanup the camera when the component unmounts
      setCameraActive(false);
    };
  }, [cameraActive]);

  const handleCloseCamera = () => {
    setCameraActive(false);
    CloseCamera(); 
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
      {cameraActive && (
        <QrReader
          constraints={{ video: { deviceId: deviceId ? { exact: deviceId } : undefined } }}
          scanDelay={300}
          onResult={(result, error) => {
            if (result) {
              onScanSuccess(result.text);
            }
          }}
          style={{ width: "100%", height: "100%" }}
        />
      )}
      <button onClick={handleCloseCamera}>Close Camera</button>
    </div>
  );
};

export default BarcodeScannerComponent;
