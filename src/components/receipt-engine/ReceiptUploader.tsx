"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Sparkles,
  FileText,
  RotateCw,
  Contrast,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Layers,
} from "lucide-react";
import { SAMPLE_RECEIPTS, SampleReceipt } from "@/lib/receipt-engine/sample-receipts";
import { preprocessImageCanvas, runBrowserOCR } from "@/lib/receipt-engine/ocr-parser";
import { OCRScanResult } from "@/lib/receipt-engine/types";

interface ReceiptUploaderProps {
  onScanComplete: (result: OCRScanResult, previewUrl?: string, fileName?: string) => void;
  isScanning: boolean;
  setIsScanning: (val: boolean) => void;
  scanProgress: { percent: number; message: string };
  setScanProgress: (val: { percent: number; message: string }) => void;
}

export function ReceiptUploader({
  onScanComplete,
  isScanning,
  setIsScanning,
  scanProgress,
  setScanProgress,
}: ReceiptUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isGrayscale, setIsGrayscale] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setRotation(0);
    setIsGrayscale(false);
    setIsHighContrast(false);
  };

  // Start Live Camera
  const startCamera = async () => {
    setIsCameraOpen(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera not found on this device.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `camera-receipt-${Date.now()}.png`, { type: "image/png" });
          processFile(file);
          stopCamera();
        }
      }, "image/png");
    }
  };

  // Run OCR on Selected File
  const handleStartOCR = async () => {
    if (!selectedFile && !previewUrl) return;

    setIsScanning(true);
    setScanProgress({ percent: 15, message: "Preprocessing receipt image canvas..." });

    try {
      let finalDataUrl = previewUrl!;
      if (selectedFile) {
        const preprocessed = await preprocessImageCanvas(selectedFile, {
          rotation,
          grayscale: isGrayscale,
          contrast: isHighContrast ? 1.4 : 1.1,
        });
        finalDataUrl = preprocessed.dataUrl;
      }

      setScanProgress({ percent: 35, message: "Running OCR character recognition..." });
      const scanResult = await runBrowserOCR(finalDataUrl, (pct, msg) => {
        setScanProgress({ percent: pct, message: msg });
      });

      onScanComplete(scanResult, finalDataUrl, selectedFile?.name || "Scanned Receipt");
    } catch (error) {
      console.error("OCR Scan failed", error);
      setScanProgress({ percent: 100, message: "Completed with standard parsing heuristics" });
    } finally {
      setIsScanning(false);
    }
  };

  // 1-Click Load Sample Receipt
  const handleSelectSample = (sample: SampleReceipt) => {
    setIsScanning(true);
    setScanProgress({ percent: 30, message: `Loading ${sample.name} receipt demo...` });
    setTimeout(() => {
      setScanProgress({ percent: 70, message: "Extracting verified line items..." });
      setTimeout(() => {
        setIsScanning(false);
        onScanComplete(sample.data, sample.thumbnailUrl, `${sample.name}.jpg`);
      }, 400);
    }, 400);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-6 sm:p-10 text-center transition-all bg-surface hover:border-primary/60 group ${
          previewUrl ? "border-primary bg-primary/5" : "border-hairline-strong"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {previewUrl ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative max-h-72 max-w-sm rounded-lg overflow-hidden border border-hairline shadow-sm bg-canvas flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Receipt preview"
                className="max-h-72 object-contain transition-transform duration-200"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  filter: `${isGrayscale ? "grayscale(100%)" : ""} ${
                    isHighContrast ? "contrast(150%) brightness(95%)" : ""
                  }`,
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-surface/90 text-ink hover:bg-expense-bg hover:text-expense border border-hairline shadow-sm transition-colors"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preprocessing Toolbar */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleRotate}
                className="px-3 py-1.5 rounded-md border border-hairline bg-surface hover:bg-canvas text-ink flex items-center gap-1.5 font-medium transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5 text-primary" />
                <span>Rotate ({rotation}°)</span>
              </button>
              <button
                type="button"
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isHighContrast
                    ? "bg-primary text-white border-primary"
                    : "border-hairline bg-surface hover:bg-canvas text-ink"
                }`}
              >
                <Contrast className="w-3.5 h-3.5" />
                <span>High Contrast B&W</span>
              </button>
              <button
                type="button"
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isGrayscale
                    ? "bg-primary text-white border-primary"
                    : "border-hairline bg-surface hover:bg-canvas text-ink"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Grayscale</span>
              </button>
            </div>

            {/* Start Scan Button */}
            <button
              type="button"
              disabled={isScanning}
              onClick={handleStartOCR}
              className="mt-2 px-8 py-3 rounded-lg bg-primary hover:bg-primary-active text-white font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing OCR ({scanProgress.percent}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Extract Receipt Data Automatically</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-income-bg text-primary flex items-center justify-center mb-1 group-hover:scale-105 transition-transform border border-income-border shadow-sm">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-ink tracking-tight">
              Drag and drop your receipt here
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-md">
              Supports JPG, PNG, WebP, and scanned documents. Client-side OCR extracts vendor, date,
              subtotal, tax, and totals in seconds.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-active text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Browse Receipt Image</span>
              </button>

              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 rounded-lg border border-hairline-strong bg-surface hover:bg-canvas text-ink text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
              >
                <Camera className="w-4 h-4 text-primary" />
                <span>Use Phone / Web Camera</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OCR Progress Bar */}
      {isScanning && (
        <div className="p-4 rounded-xl bg-surface border border-primary/30 shadow-sm animate-pulse">
          <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2">
            <span className="flex items-center gap-2 text-primary">
              <Loader2 className="w-4 h-4 animate-spin" />
              {scanProgress.message}
            </span>
            <span>{scanProgress.percent}%</span>
          </div>
          <div className="w-full h-2 bg-hairline rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${scanProgress.percent}%` }}
            />
          </div>
        </div>
      )}

      {/* 1-Click Sample Receipts Test Drive */}
      <div className="p-4 sm:p-6 rounded-xl bg-surface border border-hairline shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-bold text-ink">
              No receipt on hand? Test with 1-click sample receipts:
            </span>
          </div>
          <span className="text-[11px] text-ink-muted font-mono hidden sm:inline">Instant Demo</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_RECEIPTS.slice(0, 4).map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className="p-3 rounded-lg border border-hairline hover:border-primary/80 bg-canvas hover:bg-income-bg/40 text-left transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-ink-muted font-mono mb-1">
                  <span>{sample.badge}</span>
                  <span className="font-bold text-ink">${sample.data.total.toFixed(2)}</span>
                </div>
                <div className="text-xs font-bold text-ink group-hover:text-primary transition-colors">
                  {sample.name}
                </div>
              </div>
              <span className="text-[10px] text-primary font-medium mt-2 flex items-center gap-1 group-hover:underline">
                <span>Scan Demo</span>
                <span>→</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Camera Stream Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-surface rounded-2xl max-w-lg w-full overflow-hidden border border-hairline shadow-2xl flex flex-col">
            <div className="p-4 border-b border-hairline flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                <h4 className="text-sm font-bold text-ink">Live Receipt Camera Scanner</h4>
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-canvas"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center aspect-[4/3] overflow-hidden">
              {cameraError ? (
                <div className="p-6 text-center text-xs text-expense flex flex-col items-center gap-2">
                  <AlertCircle className="w-8 h-8" />
                  <span>{cameraError}</span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 px-4 py-1.5 rounded-md bg-surface text-ink border border-hairline font-semibold"
                  >
                    Select file from library instead
                  </button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Visual Receipt Viewfinder Grid */}
                  <div className="absolute inset-6 border-2 border-primary/80 rounded-lg pointer-events-none flex items-center justify-center">
                    <span className="px-3 py-1 rounded bg-black/60 text-white text-[11px] font-mono backdrop-blur-sm">
                      Align receipt within frame
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-surface border-t border-hairline flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 rounded-lg border border-hairline text-xs font-semibold text-ink hover:bg-canvas"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={capturePhoto}
                disabled={Boolean(cameraError)}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-active text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Receipt Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
