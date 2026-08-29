'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useInspection } from '@/lib/context/InspectionContext';
import { ImageUploader, PackageImageItem } from '@/components/inspection/ImageUploader';
import { Camera, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewInspectionPage() {
  const router = useRouter();
  const { runAnalysis, setCapturedImage } = useInspection();

  const handleStartAnalysis = async (primaryImage: string | File, allImages?: PackageImageItem[], sampleId?: string) => {
    try {
      if (typeof primaryImage === 'string') {
        setCapturedImage(primaryImage);
      } else if (typeof window !== 'undefined' && primaryImage instanceof File) {
        setCapturedImage(URL.createObjectURL(primaryImage));
      }
      router.push('/inspection/analyzing');
      await runAnalysis({
        fileOrUrl: primaryImage,
        sampleId,
        mode: sampleId ? 'DEMO_SAMPLE' : 'FILE_UPLOAD'
      });
      router.push('/inspection/results');
    } catch (err) {
      console.error('Analysis execution issue, redirecting to results:', err);
      router.push('/inspection/results');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DBD6CA]">
        <div>
          <div className="text-[11px] font-bold text-orange-600 font-mono uppercase tracking-wider mb-0.5">
            STEP 1 // PACKAGE INTAKE & SCAN
          </div>
          <h1 className="text-xl font-black text-neutral-900 tracking-tight">
            New Commodity Inspection
          </h1>
          <p className="text-xs text-neutral-500">
            Intake package photos or scan barcode to verify Legal Metrology (Packaged Commodities) Rules, 2011
          </p>
        </div>

        <Link
          href="/inspection/scan"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-[#FAF8F4] text-neutral-800 border border-[#DBD6CA] text-xs font-bold transition-colors shadow-xs self-start sm:self-auto"
        >
          <Camera className="w-3.5 h-3.5 text-neutral-600" />
          <span>Live Field Scanner</span>
        </Link>
      </div>

      {/* 3-Step Guided Inspection Uploader Component */}
      <ImageUploader onStartAnalysis={handleStartAnalysis} />
    </div>
  );
}

