'use client';

import React, { useState, useRef } from 'react';
import { BoundingBox, ExtractedField } from '@/lib/types/inspection';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Info, Scan, Target, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface EvidenceViewerProps {
  imageUrl: string;
  boundingBoxes: BoundingBox[];
  selectedFieldKey: string | null;
  hoveredBoxId: string | null;
  onSelectBox?: (fieldKey: string) => void;
  onHoverBox?: (boxId: string | null) => void;
  violationsCount?: number;
  declarations?: Record<string, ExtractedField | undefined>;
}

export function EvidenceViewer({
  imageUrl,
  boundingBoxes,
  selectedFieldKey,
  hoveredBoxId,
  onSelectBox,
  onHoverBox,
  violationsCount = 0,
  declarations
}: EvidenceViewerProps) {
  const { isDemoMode } = useDemoMode();
  const [zoom, setZoom] = useState(1);
  const [showBoxes, setShowBoxes] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(1, z - 0.25));
  const handleResetZoom = () => setZoom(1);

  // Find active selected bounding box
  const selectedBox = boundingBoxes.find((b) => b.fieldKey === selectedFieldKey) || (boundingBoxes.length > 0 ? boundingBoxes[0] : null);
  const selectedFieldData = selectedBox && declarations ? declarations[selectedBox.fieldKey] : null;

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#E5E2D9] bg-[#FAF8F4]">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-bold text-neutral-900">Package Physical Evidence</span>
          <span className="text-[11px] text-neutral-500 font-mono">
            ({boundingBoxes.length} Spatial Regions)
          </span>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-2 py-1 rounded text-xs transition-colors flex items-center gap-1 border ${
              showBoxes
                ? 'bg-white border-[#DBD6CA] text-neutral-900 shadow-2xs font-bold'
                : 'bg-transparent border-transparent text-neutral-500'
            }`}
            title="Toggle Bounding Boxes"
          >
            {showBoxes ? <Eye className="w-3.5 h-3.5 text-orange-600" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">Evidence Boxes</span>
          </button>

          <div className="h-3.5 w-px bg-[#DBD6CA] mx-1" />

          <button
            onClick={handleZoomIn}
            className="p-1 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] shadow-2xs"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] shadow-2xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 rounded bg-white hover:bg-[#FAF8F4] text-neutral-700 border border-[#DBD6CA] shadow-2xs"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div
        ref={containerRef}
        className="relative flex-1 bg-neutral-900 overflow-auto flex items-center justify-center p-3 min-h-[320px] lg:min-h-[400px]"
      >
        <div
          className="relative max-w-full max-h-full transition-transform duration-150 origin-center rounded overflow-hidden border border-neutral-800 shadow-lg"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Package Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Inspected Package Physical Evidence"
            className="w-auto max-h-[460px] object-contain block select-none"
          />

          {/* Clean SVG Bounding Boxes Overlay */}
          {showBoxes && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-auto"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {boundingBoxes.map((box) => {
                const isSelected = selectedFieldKey === box.fieldKey;
                const isHovered = hoveredBoxId === box.id;
                const isRedViolation = box.color === '#EF4444' || box.color?.includes('EF4444');
                const isAmberReview = box.color === '#F59E0B' || box.color?.includes('F59E0B');

                const strokeColor = isSelected
                  ? '#EA580C' // High-contrast orange when selected
                  : isRedViolation
                  ? '#DC2626' // Red for potential violation
                  : isAmberReview
                  ? '#D97706' // Amber for manual review
                  : '#16A34A'; // Emerald for compliant

                const fillColor = isSelected
                  ? 'rgba(234, 88, 12, 0.25)'
                  : isHovered
                  ? 'rgba(234, 88, 12, 0.18)'
                  : isRedViolation
                  ? 'rgba(220, 38, 38, 0.16)'
                  : isAmberReview
                  ? 'rgba(217, 119, 6, 0.14)'
                  : 'rgba(22, 163, 74, 0.12)';

                const x = box.xmin * 100;
                const y = box.ymin * 100;
                const width = (box.xmax - box.xmin) * 100;
                const height = (box.ymax - box.ymin) * 100;

                return (
                  <g
                    key={box.id}
                    className="cursor-pointer"
                    onClick={() => onSelectBox?.(box.fieldKey)}
                    onMouseEnter={() => onHoverBox?.(box.id)}
                    onMouseLeave={() => onHoverBox?.(null)}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 1.4 : 0.9}
                      strokeDasharray={isRedViolation ? '2,1' : undefined}
                    />

                    {/* Small crisp label header */}
                    <rect
                      x={x}
                      y={Math.max(0, y - 3.8)}
                      width={Math.min(width + 3, 38)}
                      height={3.4}
                      fill={strokeColor}
                    />
                    <text
                      x={x + 0.8}
                      y={Math.max(2.4, y - 1.2)}
                      fill="#FFFFFF"
                      fontSize="2.1"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {box.label.slice(0, 18)}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Spatial Evidence Region Inspector Panel */}
      {selectedBox && (
        <div className="p-3 bg-[#FAF8F4] border-t border-[#E5E2D9] space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900">
              <Target className="w-3.5 h-3.5 text-orange-600" />
              <span>Evidence Region: {selectedBox.label}</span>
            </div>
            <span className="font-mono text-[10px] text-neutral-500 font-bold">
              Conf: {Math.round(selectedBox.confidence * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-white border border-[#DBD6CA]">
              <span className="text-neutral-500 block text-[10px] font-bold uppercase">Associated Field:</span>
              <span className="font-medium text-neutral-900 line-clamp-1">
                {selectedFieldData?.label || selectedBox.fieldKey}
              </span>
            </div>
            <div className="p-2 rounded bg-white border border-[#DBD6CA]">
              <span className="text-neutral-500 block text-[10px] font-bold uppercase">Spatial Coordinates:</span>
              <span className="font-mono text-neutral-600 text-[10px]">
                x:[{selectedBox.xmin.toFixed(2)}-{selectedBox.xmax.toFixed(2)}] y:[{selectedBox.ymin.toFixed(2)}-{selectedBox.ymax.toFixed(2)}]
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info & Honest Prototype Disclosure */}
      <div className="px-3.5 py-2.5 border-t border-[#E5E2D9] bg-white text-[11px] text-neutral-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>Potential Violation</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Manual Review</span>
          </div>
        </div>

        {isDemoMode && (
          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 font-mono">
            PROTOTYPE DEMO EVIDENCE MAPPING
          </span>
        )}
      </div>
    </div>
  );
}
