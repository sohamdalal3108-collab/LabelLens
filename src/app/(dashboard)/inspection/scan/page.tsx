'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInspection } from '@/lib/context/InspectionContext';
import { CameraCapture } from '@/components/inspection/CameraCapture';
import { QRScanner } from '@/components/inspection/QRScanner';
import { Camera, QrCode, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const { runAnalysis, setCapturedImage } = useInspection();
  const [activeMode, setActiveMode] = useState<'CAMERA' | 'QR'>('CAMERA');

  const handleCameraCapture = async (imageDataUrl: string, panelType: string) => {
    setCapturedImage(imageDataUrl);
    router.push('/inspection/analyzing');
    await runAnalysis({
      fileOrUrl: imageDataUrl,
      mode: 'CAMERA_CAPTURE'
    });
    router.push('/inspection/results');
  };

  const handleScanSuccess = async (decodedText: string, format?: string) => {
    router.push('/inspection/analyzing');
    await runAnalysis({
      sampleId: 'sample-spices',
      mode: 'QR_CODE'
    });
    router.push('/inspection/results');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DBD6CA]">
        <div className="flex items-center gap-3">
          <Link
            href="/inspection/new"
            className="p-2 rounded bg-white hover:bg-[#FAF8F4] text-neutral-600 hover:text-neutral-900 border border-[#DBD6CA] shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider mb-0.5">
              LIVE SENSOR INTAKE
            </div>
            <h1 className="text-xl font-black text-neutral-900 tracking-tight">Live Field Capture & Scanner</h1>
            <p className="text-xs text-neutral-500">
              Align retail package inside camera viewport or scan barcode
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex p-1 bg-white rounded-md border border-[#DBD6CA] text-xs font-bold shadow-2xs">
          <button
            onClick={() => setActiveMode('CAMERA')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeMode === 'CAMERA'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Viewfinder</span>
          </button>
          <button
            onClick={() => setActiveMode('QR')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors ${
              activeMode === 'QR'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR / Barcode</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      {activeMode === 'CAMERA' ? (
        <CameraCapture onCapture={handleCameraCapture} />
      ) : (
        <QRScanner onScanSuccess={handleScanSuccess} />
      )}
    </div>
  );
}

