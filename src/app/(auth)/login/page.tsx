'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signin') {
        await loginWithEmail(email.trim(), password);
        router.push('/dashboard');
      } else {
        await signUpWithEmail(email.trim(), password);
        router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      }
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string; email?: string };
      if (e.code === 'auth/unverified-email' || e.message === 'EMAIL_NOT_VERIFIED') {
        const unverifiedEmail = e.email || email.trim();
        router.push(`/verify-email?email=${encodeURIComponent(unverifiedEmail)}`);
        return;
      }
      setError(e.message || (mode === 'signin' ? 'Email or password is incorrect' : 'Failed to create account.'));
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
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string; email?: string };
      if (e.code === 'auth/unverified-email' || e.message === 'EMAIL_NOT_VERIFIED') {
        router.push(`/verify-email?email=${encodeURIComponent('inspector@example.com')}`);
        return;
      }
      // If demo account doesn't exist yet, try creating it
      try {
        await signUpWithEmail('inspector@example.com', 'password123');
        router.push(`/verify-email?email=${encodeURIComponent('inspector@example.com')}`);
      } catch (signupErr: unknown) {
        const signupE = signupErr as Error;
        setError(signupE.message || 'Failed to sign in with demo account.');
      }
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
            <h1 className="text-xl font-black text-neutral-900 tracking-tight">
              {mode === 'signin' ? 'Officer Portal Sign-In' : 'Officer Portal Registration'}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Legal Metrology Field Verification Platform
            </p>
          </div>
        </div>

        {/* Login / Signup Form Card */}
        <div className="p-6 rounded-xl bg-white border border-[#DBD6CA] shadow-sm space-y-5">
          {/* Mode Switch Tabs */}
          <div className="flex border-b border-[#E5E2D9]">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 pb-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'signin'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 pb-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'signup'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>

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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
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
              <span>
                {isSubmitting
                  ? mode === 'signin'
                    ? 'Signing In...'
                    : 'Creating Account...'
                  : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch mode footer */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="text-xs text-neutral-600 hover:text-orange-600 transition-colors font-medium cursor-pointer"
            >
              {mode === 'signin' ? (
                <>
                  Need an officer account? <span className="font-bold underline">Sign Up</span>
                </>
              ) : (
                <>
                  Already registered? <span className="font-bold underline">Sign In</span>
                </>
              )}
            </button>
          </div>

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
