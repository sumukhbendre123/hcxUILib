// QrCodeScanner.tsx
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import strings from "../../utils/strings";

// Props interface for the QrCodeScanner component
interface QrCodeScannerProps {
  fps?: number; // Frames per second for QR code scanning
  qrbox?: number; // Size of the QR code scanning box
  aspectRatio?: number; // Aspect ratio for the scanning box
  disableFlip?: boolean; // Whether to disable flipping of the QR code
  verbose?: boolean; // Enable verbose logging for debugging
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void; // Callback function when QR code is successfully scanned
  qrCodeErrorCallback?: (errorMessage: string) => void; // Optional callback function for errors
  onStartScanner?: () => void; // Optional callback function when scanner starts
  onStopScanner?: () => void; // Optional callback function when scanner stops
  startButtonLabel?: string; // Label for the start button
  stopButtonLabel?: string; // Label for the stop button
  scanMessage?: string; // Message displayed when scanner is not active
}

const QrCodeScanner: React.FC<QrCodeScannerProps> = ({
  fps,
  qrbox,
  aspectRatio,
  disableFlip,
  verbose,
  qrCodeSuccessCallback,
  qrCodeErrorCallback,
  onStartScanner,
  onStopScanner,
  startButtonLabel = "Start Scanner", // Default label for start button
  stopButtonLabel = "Stop Scanner", // Default label for stop button
  scanMessage = strings.SCAN_QRCODE, // Default message displayed when scanner is not active
}) => {
  const [isScanning, setIsScanning] = useState(false); // State to track if scanning is active
  let html5QrcodeScanner: Html5QrcodeScanner | undefined; // Reference to the Html5QrcodeScanner instance
  const qrcodeRegionId = "html5qr-code-full-region"; // ID for the QR code scanner container

  // Function to start the QR code scanner
  const startScanner = () => {
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }

    // Configuration object for the QR code scanner
    const config: any = {};
    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;

    // Initialize Html5QrcodeScanner with the provided configuration
    html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose || false
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    setIsScanning(true); // Set scanning state to true

    if (onStartScanner) {
      onStartScanner(); // Invoke optional callback for when scanning starts
    }
  };

  // Function to stop the QR code scanner
  const stopScanner = () => {
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });

      // Remove the HTML elements used by the scanner
      const qrcodeRegion = document.getElementById(qrcodeRegionId);
      if (qrcodeRegion) {
        qrcodeRegion.innerHTML = "";
      }

      setIsScanning(false); // Set scanning state to false

      if (onStopScanner) {
        onStopScanner(); // Invoke optional callback for when scanning stops
      }
    }
  };

  // Cleanup function to stop the scanner when the component is unmounted
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [qrCodeSuccessCallback, qrCodeErrorCallback]);

  return (
    <>
      {/* Message displayed when scanner is not active */}
      <div className="text-center pb-2">{scanMessage}</div>
      {/* Conditionally render start or stop button based on scanning state */}
      {!isScanning && (
        <div className="m-auto bg-primary p-3 text-center w-30 rounded">
          <button onClick={startScanner} className="text-black">
            {startButtonLabel}
          </button>
        </div>
      )}
      {isScanning && (
        <div className="m-auto bg-danger p-3 text-center w-30 rounded">
          <button onClick={stopScanner} className="text-black">
            {stopButtonLabel}
          </button>
        </div>
      )}
      {/* Container for the QR code scanner */}
      <div id={qrcodeRegionId} className="mt-3" />
    </>
  );
};

export default QrCodeScanner;
