'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  ScanLine,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Camera,
  Layers,
  ChevronRight,
  Eye,
  Crosshair,
  Lock,
  Cpu,
  ArrowUpRight,
  Check,
  X,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { SAMPLE_PACKAGE_SCENARIOS } from '@/lib/mock/mockInspections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-neutral-900 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* 1. TOP NAVIGATION */}
      <header className="sticky top-0 z-40 w-full bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-neutral-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
              <span className="text-orange-500 text-lg font-black tracking-tighter">L</span>
              <span className="text-white text-base font-extrabold">L</span>
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight text-neutral-900 flex items-center gap-1.5">
                <span>LabelLens</span>
                <span className="text-orange-600 font-black text-xs uppercase px-1 py-0.2 rounded bg-orange-50 border border-orange-200">
                  AI
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 font-medium tracking-tight">
                AI-Assisted Legal Metrology Inspection
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-600">
            <a href="#product" className="hover:text-neutral-900 transition-colors">
              Product
            </a>
            <a href="#workflow" className="hover:text-neutral-900 transition-colors">
              How It Works
            </a>
            <a href="#preview" className="hover:text-neutral-900 transition-colors">
              Inspection
            </a>
            <a href="#demo" className="hover:text-neutral-900 transition-colors">
              Demo Cases
            </a>
            <a href="#pipeline" className="hover:text-neutral-900 transition-colors">
              Architecture
            </a>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Officer Portal</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION — ASYMMETRIC 2-COLUMN */}
        <section id="product" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Typography & Intentional CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#EDE9E0] border border-[#DBD6CA] text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                <span>Legal Metrology • Field Inspection</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.08]">
                Inspect the Label.{' '}
                <span className="text-orange-600 underline decoration-orange-300 decoration-4 underline-offset-4">
                  Verify the Evidence.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-xl">
                LabelLens AI assists Legal Metrology officers in examining packaged commodity labels,
                extracting statutory declarations with OCR, identifying potential compliance issues,
                and organizing visual evidence for final officer verification.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/inspection/new"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs shadow-sm transition-all hover:translate-y-[-1px]"
                >
                  <ScanLine className="w-4 h-4" />
                  <span>Start New Inspection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-white hover:bg-neutral-50 text-neutral-800 border border-[#DBD6CA] font-semibold text-xs transition-colors shadow-xs"
                >
                  <span>Explore Workflow</span>
                </a>
              </div>

              {/* Small Statutory Reference Tag */}
              <div className="pt-3 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                <Scale className="w-3.5 h-3.5 text-neutral-600" />
                <span>Statutory Reference: Legal Metrology (Packaged Commodities) Rules, 2011</span>
              </div>
            </div>

            {/* Right Column: High-Fidelity Inspection Workspace Visual */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-lg border border-[#DBD6CA] shadow-md p-4 sm:p-5 space-y-4">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#EDE9E0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600"></span>
                    <span className="font-mono text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      INSP-2024-001 // LIVE VIEW
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    OCR CONFIDENCE 96.2%
                  </span>
                </div>

                {/* Inspection Viewport Simulation */}
                <div className="relative rounded bg-[#18181B] border border-neutral-800 p-3 overflow-hidden aspect-[16/10] flex items-center justify-center group">
                  {/* Background Mock Product Grid */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  {/* Simulated Package Image Container */}
                  <div className="relative w-full h-full rounded bg-neutral-900 flex items-center justify-center border border-neutral-700 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/samples/spices_sample.jpg"
                      alt="Spices Package"
                      className="w-full h-full object-contain opacity-85"
                      onError={(e) => {
                        // Fallback visual if sample not loaded
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Spatial Evidence Geometries */}
                    <div className="absolute top-[18%] left-[14%] w-[72%] h-[18%] border-2 border-emerald-400 bg-emerald-500/10 rounded-xs flex items-start justify-between p-1">
                      <span className="text-[9px] font-mono font-bold text-white bg-emerald-600 px-1 py-0.2 rounded-xs">
                        MRP ₹65.00 [97%]
                      </span>
                    </div>

                    <div className="absolute top-[42%] left-[14%] w-[58%] h-[20%] border-2 border-emerald-400 bg-emerald-500/10 rounded-xs flex items-start justify-between p-1">
                      <span className="text-[9px] font-mono font-bold text-white bg-emerald-600 px-1 py-0.2 rounded-xs">
                        NET WT 100g [95%]
                      </span>
                    </div>

                    <div className="absolute bottom-[16%] left-[14%] w-[68%] h-[18%] border-2 border-orange-400 bg-orange-500/10 rounded-xs flex items-start justify-between p-1">
                      <span className="text-[9px] font-mono font-bold text-white bg-orange-600 px-1 py-0.2 rounded-xs">
                        MFG: 03/2024 [91%]
                      </span>
                    </div>

                    {/* Scanning Line overlay */}
                    <div className="absolute inset-x-0 h-0.5 bg-orange-500/80 animate-scan-sweep pointer-events-none"></div>
                  </div>
                </div>

                {/* Pipeline Flow Indicator Strip */}
                <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-mono text-[10px]">
                  <div className="p-1.5 rounded bg-[#F7F5F0] border border-[#E5E2D9]">
                    <div className="text-neutral-400 text-[9px]">01</div>
                    <div className="font-bold text-neutral-800">IMAGE</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#F7F5F0] border border-[#E5E2D9]">
                    <div className="text-neutral-400 text-[9px]">02</div>
                    <div className="font-bold text-neutral-800">OCR</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#F7F5F0] border border-[#E5E2D9]">
                    <div className="text-neutral-400 text-[9px]">03</div>
                    <div className="font-bold text-neutral-800">RULE CHECK</div>
                  </div>
                  <div className="p-1.5 rounded bg-orange-50 border border-orange-200">
                    <div className="text-orange-500 text-[9px]">04</div>
                    <div className="font-bold text-orange-800">EVIDENCE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TRUST / PURPOSE STRIP */}
        <section className="border-y border-[#E5E2D9] bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="font-mono text-xs font-black uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded bg-orange-600"></span>
                <span>BUILT FOR FIELD INSPECTION</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-neutral-700">
                <div className="flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-orange-600" />
                  <span>OCR Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Package Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-orange-600" />
                  <span>Spatial Evidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-orange-600" />
                  <span>Rule 6, 7 & 12 Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Officer Determination</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE CORE WORKFLOW — NUMBERED PROCESS */}
        <section id="workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-12">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DBD6CA]">
              <div>
                <div className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  SYSTEMATIC 5-STEP PROTOCOL
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight mt-1">
                  From Package to Verified Finding
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                Structured end-to-end processing designed specifically for legal standard evidentiary integrity.
              </p>
            </div>

            {/* 5 Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="p-5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs space-y-3 relative group hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black font-mono text-neutral-300 group-hover:text-orange-600 transition-colors">
                  01
                </div>
                <div className="h-0.5 w-8 bg-orange-600"></div>
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-tight">
                  CAPTURE
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Capture front PDP, back declarations, date stamps, or scan commodity barcodes in the field.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs space-y-3 relative group hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black font-mono text-neutral-300 group-hover:text-orange-600 transition-colors">
                  02
                </div>
                <div className="h-0.5 w-8 bg-orange-600"></div>
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-tight">
                  EXTRACT
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Computer vision and OCR identify mandatory statutory declaration text lines and coordinates.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs space-y-3 relative group hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black font-mono text-neutral-300 group-hover:text-orange-600 transition-colors">
                  03
                </div>
                <div className="h-0.5 w-8 bg-orange-600"></div>
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-tight">
                  CHECK
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Compare extracted values against Legal Metrology Rules, 2011 clauses (unit formatting, font height).
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs space-y-3 relative group hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black font-mono text-neutral-300 group-hover:text-orange-600 transition-colors">
                  04
                </div>
                <div className="h-0.5 w-8 bg-orange-600"></div>
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-tight">
                  EVIDENCE
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Assemble spatial crops, OCR confidence scores, and legal citation references side-by-side.
                </p>
              </div>

              {/* Step 5 */}
              <div className="p-5 rounded-lg bg-white border border-[#DBD6CA] shadow-xs space-y-3 relative group hover:border-orange-500 transition-colors">
                <div className="text-3xl font-black font-mono text-neutral-300 group-hover:text-orange-600 transition-colors">
                  05
                </div>
                <div className="h-0.5 w-8 bg-orange-600"></div>
                <h3 className="font-extrabold text-sm text-neutral-900 uppercase tracking-tight">
                  VERIFY
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  The inspecting officer reviews findings, overrides when necessary, and issues digital inspection records.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHY LABEL LENS — AI ASSISTS. THE OFFICER DECIDES. */}
        <section className="bg-white border-y border-[#E5E2D9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Section Header */}
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                CORE OPERATIONAL PHILOSOPHY
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                AI Assists. The Officer Decides.
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Legal Metrology enforcement requires legal accountability. LabelLens AI does not make autonomous legal determinations—it automates tedious verification and leaves the final decision in human hands.
              </p>
            </div>

            {/* Side-by-Side Architectural Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: AI Assistance Role */}
              <div className="p-6 sm:p-8 rounded-lg bg-[#F7F5F0] border border-[#DBD6CA] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#DBD6CA]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wide">
                        AI ASSISTANCE
                      </h3>
                      <div className="text-[10px] text-neutral-500 font-mono">Automated extraction & detection</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 text-neutral-700 font-bold">
                    ASSISTIVE
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-neutral-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-neutral-900 block">OCR & Vision Parsing:</strong>
                      Extracts tiny print, MRP stamps, and complex manufacturer addresses.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-neutral-900 block">Confidence Scoring:</strong>
                      Evaluates surface glare, skew, and flags uncertain text for inspection.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-neutral-900 block">Rule Matching:</strong>
                      Maps detected text against Legal Metrology Rules, 2011 statutory provisions.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-neutral-900 block">Evidence Tagging:</strong>
                      Creates spatial bounding geometries directly linked to detected violations.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right Column: Officer Decision Role */}
              <div className="p-6 sm:p-8 rounded-lg bg-neutral-900 text-white border border-neutral-800 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded bg-orange-600 text-white flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white uppercase tracking-wide">
                        OFFICER DECISION
                      </h3>
                      <div className="text-[10px] text-neutral-400 font-mono">Statutory authority & verification</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950 text-orange-400 border border-orange-800 font-bold">
                    MANDATORY
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-neutral-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-white block">Verify Spatial Evidence:</strong>
                      Examines physical commodity sample against highlighted label regions.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-white block">Confirm or Override:</strong>
                      Officer possesses sole statutory power to endorse, dismiss, or modify findings.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-white block">Enforcement Directives:</strong>
                      Authorizes show-cause notices under Section 36 of Legal Metrology Act, 2009.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-white block">Cryptographic Sign-off:</strong>
                      Signs the inspection record with officer credentials and digital timestamp.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INSPECTION PREVIEW — SEE THE EVIDENCE BEHIND EVERY FINDING */}
        <section id="preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DBD6CA]">
              <div>
                <div className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                  HIGH-FIDELITY WORKSPACE
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-1">
                  See the Evidence Behind Every Finding
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                Every extracted declaration connects directly to visual proof and statutory clause references.
              </p>
            </div>

            {/* Realistic Inspection UI Preview Card */}
            <div className="bg-white rounded-lg border border-[#DBD6CA] shadow-md overflow-hidden">
              {/* Workspace Top Bar */}
              <div className="bg-[#FAF8F4] px-4 py-3 border-b border-[#E5E2D9] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-neutral-900">
                    INSPECTION RECORD: #LM-2024-904
                  </span>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200 text-[10px] font-bold">
                    POTENTIAL VIOLATION
                  </span>
                </div>
                <div className="text-xs font-medium text-neutral-500 font-mono">
                  Target Rule: Legal Metrology Rules, 2011 • Rule 6(1)(e)
                </div>
              </div>

              {/* Dual-Pane Preview Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E2D9]">
                {/* Left: Package Image & Evidence Crop */}
                <div className="lg:col-span-5 p-5 bg-[#FAF8F4] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
                      Package Evidence Viewport
                    </div>
                    <div className="relative rounded border border-[#DBD6CA] bg-neutral-900 aspect-[4/3] overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/samples/pulses_sample.jpg"
                        alt="Sample Product"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Evidence Bounding Box Overlay */}
                      <div className="absolute top-[32%] left-[16%] w-[68%] h-[24%] border-2 border-red-500 bg-red-500/15 rounded-xs p-1">
                        <span className="text-[9px] font-mono font-bold text-white bg-red-600 px-1 py-0.2 rounded-xs">
                          FLAG: Missing Unit (g / kg)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-white border border-[#DBD6CA] text-[11px] text-neutral-600 space-y-1">
                    <div className="font-semibold text-neutral-900">Spatial Geometry Coordinates:</div>
                    <div className="font-mono text-[10px] text-neutral-500">
                      xmin: 0.16 | ymin: 0.32 | xmax: 0.84 | ymax: 0.56 (Area: 12.8 cm²)
                    </div>
                  </div>
                </div>

                {/* Right: Declarations & Violation Review */}
                <div className="lg:col-span-7 p-5 sm:p-6 space-y-6">
                  {/* Extracted Declarations Table */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Extracted Declarations
                    </div>
                    <div className="border border-[#E5E2D9] rounded-md overflow-hidden">
                      <table className="w-full text-left text-xs data-table">
                        <thead>
                          <tr>
                            <th>Declaration</th>
                            <th>Extracted Value</th>
                            <th className="text-right">Confidence</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-semibold text-neutral-900">MRP (Inclusive of Taxes)</td>
                            <td className="font-mono text-neutral-800">₹50.00</td>
                            <td className="text-right font-mono text-emerald-700 font-bold">97%</td>
                          </tr>
                          <tr className="bg-red-50/60">
                            <td className="font-semibold text-red-900">Net Quantity</td>
                            <td className="font-mono text-red-700 font-bold">100 [NO UNIT]</td>
                            <td className="text-right font-mono text-red-700 font-bold">95%</td>
                          </tr>
                          <tr>
                            <td className="font-semibold text-neutral-900">Manufacturer Name</td>
                            <td className="text-neutral-800">ABC Foods Pvt. Ltd.</td>
                            <td className="text-right font-mono text-emerald-700 font-bold">91%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Violation Card */}
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-bold text-xs text-red-900">
                          Rule 6(1)(e) Non-Compliance
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-200 text-red-900 uppercase">
                        CRITICAL
                      </span>
                    </div>

                    <p className="text-xs text-red-800 leading-normal">
                      Net quantity declaration &quot;100&quot; is missing standard metric unit symbol (g/kg). Mandated by Legal Metrology (Packaged Commodities) Rules, 2011.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="p-2 rounded bg-white border border-red-200">
                        <span className="text-neutral-500 block text-[10px]">Observed Value:</span>
                        <span className="font-mono font-bold text-red-700">100 (Unspecified)</span>
                      </div>
                      <div className="p-2 rounded bg-white border border-red-200">
                        <span className="text-neutral-500 block text-[10px]">Statutory Requirement:</span>
                        <span className="font-mono font-bold text-emerald-700">100 g or 100 kg</span>
                      </div>
                    </div>

                    {/* Officer Action Buttons */}
                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-red-200/80">
                      <button className="px-3 py-1.5 rounded bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 text-xs font-semibold">
                        Request Recheck
                      </button>
                      <button className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold">
                        Confirm Finding
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DEMO SECTION — TEST THE INSPECTION WORKFLOW */}
        <section id="demo" className="bg-white border-y border-[#E5E2D9] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#DBD6CA]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                    EVALUATION BENCHMARK
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold font-mono">
                    PROTOTYPE DEMO DATA
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight mt-1">
                  Test the Inspection Workflow
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md">
                Try the live prototype with pre-configured legal scenarios representing typical field inspection challenges.
              </p>
            </div>

            {/* Structured Editorial Table Layout for Scenarios */}
            <div className="border border-[#DBD6CA] rounded-lg overflow-hidden bg-white shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs data-table">
                  <thead>
                    <tr>
                      <th className="w-16">Scenario</th>
                      <th>Commodity Description</th>
                      <th>Target Statutory Rule</th>
                      <th>Status Classification</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE9E0]">
                    {SAMPLE_PACKAGE_SCENARIOS.map((scenario, index) => {
                      const numberStr = `0${index + 1}`;
                      const statusColor =
                        scenario.badgeStatus === 'COMPLIANT'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : scenario.badgeStatus === 'POTENTIAL_VIOLATION'
                          ? 'bg-red-50 text-red-800 border-red-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300';

                      return (
                        <tr key={scenario.id} className="hover:bg-[#FBF9F5] transition-colors">
                          <td className="font-mono font-bold text-neutral-400 text-sm">
                            {numberStr}
                          </td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-neutral-100 border border-[#DBD6CA] overflow-hidden shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={scenario.thumbnailUrl}
                                  alt={scenario.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-neutral-900 text-xs">{scenario.title}</div>
                                <div className="text-[11px] text-neutral-500 line-clamp-1">{scenario.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="font-mono text-neutral-700 font-medium">
                            {scenario.sampleData.violations?.[0]?.ruleTitle || 'Rule 6 & 7 (General Declarations)'}
                          </td>
                          <td>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold border ${statusColor}`}>
                              {scenario.badgeStatus.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="text-right">
                            <Link
                              href="/inspection/new"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors"
                            >
                              <span>View Case</span>
                              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-neutral-500 font-mono">
                * Note: Prototype cases are illustrative models and do not represent actual proprietary merchant data.
              </span>
            </div>
          </div>
        </section>

        {/* 8. TECHNICAL CREDIBILITY — EVIDENCE-FIRST INSPECTION PIPELINE */}
        <section id="pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="text-xs font-mono font-bold text-orange-600 uppercase tracking-wider">
                TECHNICAL ARCHITECTURE
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                Built as an Evidence-First Inspection Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600">
                End-to-end multi-stage computer vision & rule compliance engine designed for verifiable auditability.
              </p>
            </div>

            {/* Clean Technical Flow Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  01
                </div>
                <div className="font-bold text-xs text-neutral-900">PACKAGE IMAGE</div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  High-res camera viewfinder or gallery intake
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  02
                </div>
                <div className="font-bold text-xs text-neutral-900">OCR & VISION</div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  Perspective deskew & line detection
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  03
                </div>
                <div className="font-bold text-xs text-neutral-900">FIELD PARSER</div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  MRP, Net Qty, Mfg & Consumer Care
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  04
                </div>
                <div className="font-bold text-xs text-neutral-900">RULE CHECK</div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  Rules 6, 7 & 12 statutory validation
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-[#DBD6CA] text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  05
                </div>
                <div className="font-bold text-xs text-neutral-900">EVIDENCE MAP</div>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  Bounding boxes & confidence tags
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-900 text-white border border-neutral-800 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center mx-auto">
                  06
                </div>
                <div className="font-bold text-xs text-white">OFFICER SIGN-OFF</div>
                <p className="text-[11px] text-neutral-400 leading-tight">
                  Human verification & digital signature
                </p>
              </div>
            </div>

            {/* 9. IMPORTANT STATUTORY LIMITATION */}
            <div className="p-4 rounded-lg bg-[#FAF8F4] border border-[#DBD6CA] flex items-start gap-3 max-w-4xl mx-auto">
              <Scale className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs text-neutral-900 uppercase tracking-wide">
                  Statutory Scope & Technical Limitation
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  LabelLens AI assists with package and label inspection. It does not determine the hidden physical, chemical or biological condition of sealed food products. Uncertain findings are escalated for human verification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 10. PROFESSIONAL FOOTER */}
      <footer className="border-t border-[#DBD6CA] bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#EDE9E0]">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-base text-neutral-900">
                <span>LabelLens AI</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700 border border-neutral-300">
                  SIH 2026 Prototype
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                AI-Assisted Legal Metrology Inspection System • Packaged Commodities Rules, 2011
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-neutral-600">
              <Link href="/inspection/new" className="hover:text-neutral-900 transition-colors">
                Inspection
              </Link>
              <Link href="/settings" className="hover:text-neutral-900 transition-colors">
                Rules Documentation
              </Link>
              <Link href="/dashboard" className="hover:text-neutral-900 transition-colors">
                Officer Dashboard
              </Link>
              <Link href="/reports" className="hover:text-neutral-900 transition-colors">
                Reports & Notices
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-mono">
            <div>
              © 2026 LabelLens AI. Developed for Smart India Hackathon (SIH 2026).
            </div>
            <div>
              Legal Metrology Division Research Prototype
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

