'use client';

import React from 'react';
import { LucideIcon, Search } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Search,
  actionText,
  actionHref,
  onAction
}: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-2xl p-10 text-center flex flex-col items-center justify-center max-w-lg mx-auto border border-slate-800 my-8">
      <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-blue-400 mb-4 ring-8 ring-blue-500/10">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mb-6">{description}</p>

      {actionText && (
        <>
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/30 transition-all"
            >
              {actionText}
            </Link>
          ) : onAction ? (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/30 transition-all"
            >
              {actionText}
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
