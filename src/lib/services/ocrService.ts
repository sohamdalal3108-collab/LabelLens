import { createWorker, type Worker } from "tesseract.js";

/**
 * FREE OCR using Tesseract.js — no API key, no billing account, no usage cap.
 * Runs on the Next.js server (API route), downloads language data once,
 * then works without external calls per-request.
 *
 * Requires: npm install tesseract.js
 *
 * Tradeoff vs. paid options (Google Cloud Vision, etc.): lower accuracy on
 * glare, curved surfaces, and tiny print (e.g. the FSSAI license number).
 * Good enough to build/demo against; swap this file's internals for Vision
 * later if needed — runOCR/runOCRBatch's signatures are the contract the
 * rest of the app depends on, so nothing else needs to change.
 */

export interface OCRBlock {
  text: string;
  boundingBox: { x0: number; y0: number; x1: number; y1: number };
  confidence: number;
}

export interface OCRResult {
  fullText: string;
  blocks: OCRBlock[];
}

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker("eng"); // add more langs if needed, e.g. createWorker(["eng", "hin"])
  }
  return workerPromise;
}

/**
 * Runs OCR on a single image buffer.
 */
export async function runOCR(imageBuffer: Buffer): Promise<OCRResult> {
  const worker = await getWorker();
  const {
    data: { text, words },
  } = await worker.recognize(imageBuffer);

  const blocks: OCRBlock[] = (words || []).map((w) => ({
    text: w.text,
    boundingBox: w.bbox,
    confidence: w.confidence,
  }));

  return { fullText: text, blocks };
}

/**
 * Runs OCR across multiple label images (e.g. front + ingredients panel + MRP panel)
 * and merges the text. No cross-image field reconciliation yet — v1 keeps it simple.
 */
export async function runOCRBatch(imageBuffers: Buffer[]): Promise<OCRResult> {
  const results = await Promise.all(imageBuffers.map(runOCR));
  return {
    fullText: results.map((r) => r.fullText).join("\n---\n"),
    blocks: results.flatMap((r) => r.blocks),
  };
}

/** Optional cleanup — call on server shutdown if you're managing a long-lived process. */
export async function terminateOCR(): Promise<void> {
  if (workerPromise) {
    const worker = await workerPromise;
    await worker.terminate();
    workerPromise = null;
  }
}
