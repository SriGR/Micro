"use client";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

const BarcodeScannerComponent = ({ onScanSuccess, CloseCamera }) => {
  const [deviceId, setDeviceId] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

  useEffect(() => {
    if (cameraActive && typeof navigator !== "undefined" && navigator.mediaDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );
        if (backCamera) {
          setDeviceId(backCamera.deviceId);
        }
      }).catch((error) => {
        console.error("Error accessing media devices:", error);
      });
    }
    
    return () => {
      if (cameraActive) {
        setCameraActive(false);
      }
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
