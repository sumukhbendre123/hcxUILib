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
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5QrcodeScanner | null>(null);
  const qrcodeRegionId = "html5qr-code-full-region";

  const startScanner = () => {
    const config: any = {};
    if (fps) config.fps = fps;
    if (qrbox) config.qrbox = qrbox;
    if (aspectRatio) config.aspectRatio = aspectRatio;
    if (disableFlip !== undefined) config.disableFlip = disableFlip;

    const scanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose || false
    );
    scanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);
    setHtml5QrcodeScanner(scanner);
    setIsScanning(true);
    onStartScanner && onStartScanner();
  };

  const stopScanner = () => {
    html5QrcodeScanner
      ?.clear()
      .then(() => {
        setIsScanning(false);
        setHtml5QrcodeScanner(null);
        onStopScanner && onStopScanner();
      })
      .catch(console.error);
  };

  useEffect(() => stopScanner, [qrCodeSuccessCallback, qrCodeErrorCallback]);

  return (
    <>
      <div className="text-center pb-2">{scanMessage}</div>
      {!isScanning && (
        <div className="m-auto bg-primary p-3 text-center w-30 rounded">
          <button onClick={startScanner} className="text-white">
            {startButtonLabel}
          </button>
        </div>
      )}
      {isScanning && (
        <div className="m-auto bg-danger p-3 text-center w-30 rounded">
          <button onClick={stopScanner} className="text-white">
            {stopButtonLabel}
          </button>
        </div>
      )}
      <div id={qrcodeRegionId} className="mt-3" />
    </>
  );
};

export default QrCodeScanner;
