'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, Check, RotateCcw, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string, panelType: string) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState<'Front PDP' | 'Back Panel' | 'MRP & Dates'>('Front PDP');
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError(null);
    } catch (err: unknown) {
      console.warn('Camera stream error:', err);
      const e = err as { message?: string };
      setCameraError(e.message || 'Unable to access field camera device.');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
      setCapturedImage(dataUrl);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage, activePanel);
    }
  };

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 flex flex-col items-center max-w-2xl mx-auto space-y-4">
      {/* Panel Selection Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F7F5F0] rounded-md border border-[#E5E2D9] text-xs font-bold">
        {(['Front PDP', 'Back Panel', 'MRP & Dates'] as const).map((panel) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className={`px-3 py-1 rounded transition-colors ${
              activePanel === panel
                ? 'bg-white text-neutral-900 shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900 font-medium'
            }`}
          >
            {panel}
          </button>
        ))}
      </div>

      {/* Camera / Captured Viewport */}
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-inner">
        {capturedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={capturedImage} alt="Captured Package" className="w-full h-full object-contain" />
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Simple rectangular guide */}
            <div className="pointer-events-none absolute inset-8 border border-dashed border-white/60 rounded flex items-center justify-center">
              <div className="text-[11px] font-bold text-white bg-black/75 px-3 py-1 rounded border border-white/20 font-mono">
                Align {activePanel}
              </div>
            </div>
          </>
        )}

        {cameraError && !capturedImage && (
          <div className="absolute inset-0 bg-neutral-900 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">Camera Device Inactive</div>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-xs">{cameraError}</p>
            </div>
            <label className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold cursor-pointer">
              <span>Select File from Device</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setCapturedImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between w-full max-w-md pt-1">
        {!capturedImage ? (
          <>
            <button
              onClick={toggleCamera}
              className="p-2.5 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              title="Switch Camera Device"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Switch</span>
            </button>

            {/* Practical Shutter Button */}
            <button
              onClick={handleCapture}
              className="px-6 py-2.5 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all hover:translate-y-[-0.5px]"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Image</span>
            </button>

            <label
              className="p-2.5 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] text-xs font-bold cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Upload File Instead"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Browse</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setCapturedImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={handleRetake}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 text-xs font-bold border border-[#DBD6CA] shadow-2xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Image</span>
            </button>

            <button
              onClick={handleConfirm}
              className="flex items-center gap-1.5 px-5 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Accept & Proceed to Review</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

