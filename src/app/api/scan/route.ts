import { NextRequest, NextResponse } from "next/server";
import { runOCRBatch } from "@/lib/services/ocrService";
import { extractFields } from "@/lib/services/fieldExtraction";
import { evaluate } from "@/lib/services/rulesEngine";

// Tesseract.js needs Node runtime (not Edge) — it uses filesystem/WASM internals.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const barcode = formData.get("barcode") as string | null;
  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "at least one label image is required" },
      { status: 400 }
    );
  }

  try {
    const imageBuffers = await Promise.all(
      files.map(async (file) => Buffer.from(await file.arrayBuffer()))
    );

    const { fullText, blocks } = await runOCRBatch(imageBuffers);
    const fields = extractFields(fullText);
    const report = evaluate(fields);

    return NextResponse.json({
      barcode: barcode || null,
      source: "ocr",
      fields,
      raw_ocr_text: fullText,
      ocr_block_count: blocks.length,
      ...report,
    });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json({ error: "scan_failed" }, { status: 500 });
  }
}
