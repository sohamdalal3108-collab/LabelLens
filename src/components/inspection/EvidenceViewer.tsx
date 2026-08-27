'use client';

import React, { useState, useRef } from 'react';
import { BoundingBox } from '@/lib/types/inspection';
import { useDemoMode } from '@/lib/context/DemoModeContext';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Info } from 'lucide-react';

interface EvidenceViewerProps {
  imageUrl: string;
  boundingBoxes: BoundingBox[];
  selectedFieldKey: string | null;
  hoveredBoxId: string | null;
  onSelectBox?: (fieldKey: string) => void;
  onHoverBox?: (boxId: string | null) => void;
  violationsCount?: number;
}

export function EvidenceViewer({
  imageUrl,
  boundingBoxes,
  selectedFieldKey,
  hoveredBoxId,
  onSelectBox,
  onHoverBox,
  violationsCount = 0
}: EvidenceViewerProps) {
  const { isDemoMode } = useDemoMode();
  const [zoom, setZoom] = useState(1);
  const [showBoxes, setShowBoxes] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleZoomIn = () => setZoom((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(1, z - 0.25));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="rounded-lg bg-white border border-[#DBD6CA] shadow-xs flex flex-col h-full overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#E5E2D9] bg-[#FAF8F4]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-900">Package Image & Spatial Evidence</span>
          <span className="text-[11px] text-neutral-500 font-mono">
            ({boundingBoxes.length} Regions)
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
            <span className="hidden sm:inline text-[11px]">Boxes</span>
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

      {/* Main Image Viewport with high-contrast background for physical evidence */}
      <div
        ref={containerRef}
        className="relative flex-1 bg-neutral-900 overflow-auto flex items-center justify-center p-3 min-h-[360px] lg:min-h-[460px]"
      >
        <div
          className="relative max-w-full max-h-full transition-transform duration-150 origin-center rounded overflow-hidden border border-neutral-800 shadow-lg"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Package Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Inspected Package"
            className="w-auto max-h-[500px] object-contain block select-none"
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
                  ? '#EA580C' // Strong Orange for selected
                  : isRedViolation
                  ? '#DC2626' // Red for violation
                  : isAmberReview
                  ? '#D97706' // Amber for low confidence
                  : '#16A34A'; // Green for verified

                const fillColor = isSelected
                  ? 'rgba(234, 88, 12, 0.22)'
                  : isHovered
                  ? 'rgba(234, 88, 12, 0.15)'
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
                      strokeWidth={isSelected ? 1.3 : 0.8}
                      strokeDasharray={isRedViolation ? '2,1' : undefined}
                    />

                    {/* Small crisp label header */}
                    <rect
                      x={x}
                      y={Math.max(0, y - 3.5)}
                      width={Math.min(width + 2, 34)}
                      height={3.2}
                      fill={strokeColor}
                    />
                    <text
                      x={x + 0.8}
                      y={Math.max(2.4, y - 1.0)}
                      fill="#FFFFFF"
                      fontSize="2.2"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {box.label.slice(0, 16)}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Footer Info & Honest Prototype Disclosure */}
      <div className="px-3.5 py-2.5 border-t border-[#E5E2D9] bg-[#FAF8F4] text-[11px] text-neutral-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>Violation</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>Low Confidence</span>
          </div>
        </div>

        {isDemoMode && (
          <span className="text-[10px] text-neutral-500 font-mono">
            Evidence spatial bounding geometries simulated for prototype.
          </span>
        )}
      </div>
    </div>
  );
}

