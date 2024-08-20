import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import strings from "../../utils/strings";

interface QrCodeScannerProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
  onStartScanner?: () => void;
  onStopScanner?: () => void;
  startButtonLabel?: string;
  stopButtonLabel?: string;
  scanMessage?: string;
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
  startButtonLabel = "Start Scanner",
  stopButtonLabel = "Stop Scanner",
  scanMessage = strings.SCAN_QRCODE,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  let html5QrcodeScanner: Html5QrcodeScanner | undefined;
  const qrcodeRegionId = "html5qr-code-full-region";

  const startScanner = () => {
    if (html5QrcodeScanner) {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }

    const config: any = {};
    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;

    html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose || false
    );
    html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

    setIsScanning(true);

    if (onStartScanner) {
      onStartScanner();
    }
  };

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

      setIsScanning(false);

      if (onStopScanner) {
        onStopScanner();
      }
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, [qrCodeSuccessCallback, qrCodeErrorCallback]);

  return (
    <>
      <div className="text-center pb-2">{scanMessage}</div>
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
      <div id={qrcodeRegionId} className="mt-3" />
    </>
  );
};

export default QrCodeScanner;
