'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  Camera,
  QrCode,
  Sparkles,
  Trash2,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Info,
  Layers,
  Scale
} from 'lucide-react';
import { SAMPLE_PACKAGE_SCENARIOS } from '@/lib/mock/mockInspections';
import { SamplePackageScenario } from '@/lib/types/inspection';
import { ComplianceBadge } from '@/components/shared/ComplianceBadge';
import Link from 'next/link';

export interface PackageImageItem {
  id: string;
  url: string;
  file?: File;
  panelType: 'Front / Principal Display Panel' | 'Back / Declarations Panel' | 'MRP & Date Stamp' | 'Additional Angle';
  quality: 'GOOD' | 'LOW_QUALITY' | 'UNREADABLE';
  qualityReason?: string;
}

interface ImageUploaderProps {
  onStartAnalysis: (primaryImage: string | File, allImages?: PackageImageItem[], sampleId?: string) => void;
}

export function ImageUploader({ onStartAnalysis }: ImageUploaderProps) {
  const [activeMode, setActiveMode] = useState<'DEMO_SAMPLES' | 'UPLOAD'>('DEMO_SAMPLES');
  const [packageImages, setPackageImages] = useState<PackageImageItem[]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, panelType?: PackageImageItem['panelType']) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: PackageImageItem[] = Array.from(files).map((file, index) => {
      const url = URL.createObjectURL(file);
      const quality: PackageImageItem['quality'] = file.size < 40000 ? 'LOW_QUALITY' : 'GOOD';
      return {
        id: `img-${Date.now()}-${index}`,
        url,
        file,
        panelType: panelType || (packageImages.length === 0 ? 'Front / Principal Display Panel' : 'Back / Declarations Panel'),
        quality,
        qualityReason: quality === 'LOW_QUALITY' ? 'Low image resolution. Text lines may be difficult to read.' : undefined
      };
    });

    setPackageImages((prev) => [...prev, ...newItems]);
    setSelectedSampleId(null);
  };

  const handleSelectSample = (sample: SamplePackageScenario) => {
    setSelectedSampleId(sample.id);
    setPackageImages([
      {
        id: `sample-img-${sample.id}`,
        url: sample.sampleData.imageUrl,
        panelType: 'Front / Principal Display Panel',
        quality: sample.id === 'sample-cosmetic' ? 'LOW_QUALITY' : 'GOOD',
        qualityReason: sample.id === 'sample-cosmetic' ? 'Surface reflection glare detected on date stamp area.' : undefined
      }
    ]);
  };

  const handleDeleteImage = (id: string) => {
    setPackageImages((prev) => prev.filter((img) => img.id !== id));
    if (selectedSampleId) setSelectedSampleId(null);
  };

  const handleAnalyze = () => {
    if (packageImages.length === 0) return;
    const primary = packageImages[0].file || packageImages[0].url;
    onStartAnalysis(primary, packageImages, selectedSampleId || undefined);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* STEP 1: Identify & Acquire Product Images */}
      <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E2D9]">
          <div>
            <div className="text-[11px] font-bold text-orange-600 font-mono">STEP 1 OF 3</div>
            <h2 className="text-sm font-bold text-neutral-900">Acquire Package Images / Data</h2>
          </div>
          <div className="flex p-1 bg-[#F7F5F0] rounded-md border border-[#E5E2D9] text-xs">
            <button
              onClick={() => setActiveMode('DEMO_SAMPLES')}
              className={`px-3 py-1 rounded transition-colors font-bold ${
                activeMode === 'DEMO_SAMPLES' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Demo Scenarios
            </button>
            <button
              onClick={() => setActiveMode('UPLOAD')}
              className={`px-3 py-1 rounded transition-colors font-bold ${
                activeMode === 'UPLOAD' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Upload / Field Capture
            </button>
          </div>
        </div>

        {activeMode === 'DEMO_SAMPLES' ? (
          /* Demo Scenarios Grid */
          <div className="space-y-3">
            <p className="text-xs text-neutral-600">
              Select one of the standard Legal Metrology (Packaged Commodities) Rules, 2011 inspection test cases:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAMPLE_PACKAGE_SCENARIOS.map((sample) => {
                const isSelected = selectedSampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3.5 rounded-lg border text-left flex items-start gap-3.5 transition-all ${
                      isSelected
                        ? 'bg-orange-50/60 border-orange-600 ring-1 ring-orange-500 shadow-xs'
                        : 'bg-[#FAF8F4] border-[#DBD6CA] hover:border-neutral-400'
                    }`}
                  >
                    <div className="w-12 h-12 rounded bg-white border border-[#DBD6CA] overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={sample.thumbnailUrl} alt={sample.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-neutral-900 truncate">{sample.title}</span>
                        <ComplianceBadge status={sample.badgeStatus} size="sm" showIcon={false} />
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                        {sample.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Field Upload / Capture Options */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/inspection/scan"
              className="p-4 rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] hover:border-orange-500 text-left flex flex-col items-center justify-center text-center space-y-2 group transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded bg-white border border-[#DBD6CA] text-neutral-800 group-hover:text-orange-600 flex items-center justify-center transition-colors">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-neutral-900">Live Camera Capture</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Field viewfinder</div>
              </div>
            </Link>

            <Link
              href="/inspection/scan"
              className="p-4 rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] hover:border-orange-500 text-left flex flex-col items-center justify-center text-center space-y-2 group transition-colors shadow-2xs"
            >
              <div className="w-10 h-10 rounded bg-white border border-[#DBD6CA] text-neutral-800 group-hover:text-orange-600 flex items-center justify-center transition-colors">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-neutral-900">Scan QR / Barcode</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">EAN-13 & DataMatrix</div>
              </div>
            </Link>

            <label className="p-4 rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] hover:border-orange-500 text-left flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-colors shadow-2xs group">
              <div className="w-10 h-10 rounded bg-white border border-[#DBD6CA] text-neutral-800 group-hover:text-orange-600 flex items-center justify-center transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-neutral-900">Upload Image File</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG, WEBP</div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>

      {/* STEP 2: Review Captured / Uploaded Images */}
      {packageImages.length > 0 && (
        <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
            <div>
              <div className="text-[11px] font-bold text-orange-600 font-mono">STEP 2 OF 3</div>
              <h2 className="text-sm font-bold text-neutral-900">Review Package Images & Quality</h2>
            </div>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer shadow-xs transition-colors">
              <Plus className="w-3.5 h-3.5 text-orange-400" />
              <span>Add Another Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'Additional Angle')}
              />
            </label>
          </div>

          <div className="flex items-start gap-2 text-xs text-neutral-600 bg-[#FAF8F4] p-3 rounded-md border border-[#DBD6CA]">
            <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              Guidance: Capture front, back and relevant declaration panels for better verification under Legal Metrology Rules, 2011.
            </span>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {packageImages.map((img) => (
              <div
                key={img.id}
                className="rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] overflow-hidden space-y-2 p-3"
              >
                <div className="aspect-[4/3] rounded bg-white overflow-hidden relative border border-[#DBD6CA]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.panelType} className="w-full h-full object-contain" />
                  <button
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-2 right-2 p-1.5 rounded bg-white/90 hover:bg-red-50 text-neutral-600 hover:text-red-600 border border-[#DBD6CA] shadow-2xs transition-colors"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-900">{img.panelType}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                        img.quality === 'GOOD'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : img.quality === 'LOW_QUALITY'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      {img.quality.replace('_', ' ')}
                    </span>
                  </div>

                  {img.quality !== 'GOOD' && (
                    <p className="text-[10px] text-amber-800 leading-tight">
                      {img.qualityReason || 'Some declarations may not be readable. Capture a clearer image.'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Start AI Analysis */}
      {packageImages.length > 0 && (
        <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold text-orange-600 font-mono">STEP 3 OF 3</div>
            <h3 className="text-sm font-bold text-neutral-900">Execute Legal Metrology Inspection Pipeline</h3>
            <p className="text-xs text-neutral-500">
              Extract declarations via OCR/CV and evaluate against Legal Metrology Rules, 2011.
            </p>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-bold shadow-xs transition-all hover:translate-y-[-0.5px] flex items-center justify-center gap-2"
          >
            <span>Start AI Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

