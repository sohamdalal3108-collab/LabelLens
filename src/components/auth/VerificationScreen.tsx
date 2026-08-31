'use client';

import React from 'react';
import Link from 'next/link';
import { MailCheck, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

interface VerificationScreenProps {
  email?: string | null;
  onLoginClick?: () => void;
}

export function VerificationScreen({ email, onLoginClick }: VerificationScreenProps) {
  const displayEmail = email?.trim() || 'your email address';

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center items-center p-6 text-neutral-900 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-1">
            <div className="w-10 h-10 rounded-md bg-neutral-900 text-white flex items-center justify-center font-bold shadow-xs">
              <span className="font-mono text-sm tracking-tighter">
                LL<span className="text-orange-500 font-black">.</span>AI
              </span>
            </div>
          </Link>
          <div>
            <div className="text-[10px] font-bold text-orange-600 font-mono uppercase tracking-wider">
              FIELD INSPECTION UNIT • SECURITY VERIFICATION
            </div>
            <h1 className="text-xl font-black text-neutral-900 tracking-tight">
              Email Verification Required
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Legal Metrology Field Verification Platform
            </p>
          </div>
        </div>

        {/* Verification Card */}
        <div className="p-6 sm:p-7 rounded-xl bg-white border border-[#DBD6CA] shadow-sm space-y-5">
          {/* Status Icon */}
          <div className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-inner">
              <MailCheck className="w-7 h-7" />
            </div>
          </div>

          {/* Verification Notice Message */}
          <div className="text-center space-y-2">
            <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#E5E2D9] text-xs text-neutral-800 leading-relaxed font-medium">
              We have sent you a verification email to{' '}
              <span className="font-bold text-neutral-950 font-mono underline decoration-orange-400 underline-offset-2">
                {displayEmail}
              </span>
              . Please verify it and log in.
            </div>
          </div>

          {/* Verification Instructions */}
          <div className="space-y-2.5 pt-1 text-xs text-neutral-600">
            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <p className="leading-tight">
                Open the confirmation email sent from Firebase Authentication.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <p className="leading-tight">
                Click the verification link to confirm your inspector email address.
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <p className="leading-tight">
                Return here and click <strong>Login</strong> to access your dashboard.
              </p>
            </div>
          </div>

          {/* Action Button: Login */}
          <div className="pt-2">
            {onLoginClick ? (
              <button
                type="button"
                onClick={onLoginClick}
                className="w-full py-2.5 px-4 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-xs transition-all hover:translate-y-[-0.5px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-xs transition-all hover:translate-y-[-0.5px] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </div>
        </div>

        {/* Security / Statutory Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
          <span>Statutory compliance verification required for field officers</span>
        </div>
      </div>
    </div>
  );
}
