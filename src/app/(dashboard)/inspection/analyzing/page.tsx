'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInspection } from '@/lib/context/InspectionContext';
import { AnalysisProgress } from '@/components/inspection/AnalysisProgress';

export default function AnalyzingPage() {
  const router = useRouter();
  const { isAnalyzing, analysisStep, analysisLogs, activeInspection } = useInspection();

  useEffect(() => {
    // If analysis is complete and we have results, navigate to results workspace
    if (!isAnalyzing && activeInspection) {
      const timer = setTimeout(() => {
        router.push('/inspection/results');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, activeInspection, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <AnalysisProgress
        currentStep={analysisStep || 1}
        logs={
          analysisLogs.length > 0
            ? analysisLogs
            : [
                '[1/4] Preprocessing package image & correcting perspective distortion...',
                '[2/4] OCR Engine running: Detecting statutory text lines & bounding geometries...',
                '[3/4] Evaluating Legal Metrology (Packaged Commodities) Rules, 2011 engine...'
              ]
        }
      />
    </div>
  );
}
