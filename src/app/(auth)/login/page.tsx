'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState('inspector@example.com');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid authorized inspector email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await loginWithEmail(email.trim(), password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithEmail('inspector@example.com', 'password123');
      router.push('/dashboard');
    } catch {
      setError('Failed to sign in with demo account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center items-center p-6 text-neutral-900">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
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
              FIELD INSPECTION UNIT
            </div>
            <h1 className="text-xl font-black text-neutral-900 tracking-tight">Officer Portal Sign-In</h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Legal Metrology Field Verification Platform
            </p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="p-6 rounded-xl bg-white border border-[#DBD6CA] shadow-sm space-y-5">
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide block mb-1.5">
                Authorized Inspector Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="email"
                  placeholder="inspector@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded-md text-neutral-900 font-sans focus:outline-none focus:border-orange-500 shadow-2xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F4] border border-[#DBD6CA] rounded-md text-neutral-900 focus:outline-none focus:border-orange-500 shadow-2xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all hover:translate-y-[-0.5px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Sign-In */}
          <div className="pt-3 border-t border-[#E5E2D9]">
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={isSubmitting}
              className="w-full py-2.5 px-3 rounded-md bg-[#FAF8F4] hover:bg-neutral-100 border border-[#DBD6CA] text-neutral-800 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <span>Quick Sign-In as Inspector (Demo)</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-center text-neutral-500">
          Authorized Legal Metrology field inspection personnel only.
        </p>
      </div>
    </div>
  );
}
