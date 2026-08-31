'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { VerificationScreen } from '@/components/auth/VerificationScreen';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return <VerificationScreen email={email} />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
          <div className="text-xs font-mono text-neutral-500 animate-pulse">
            Loading verification status...
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
