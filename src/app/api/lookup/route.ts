import { NextRequest, NextResponse } from "next/server";
import { lookupByBarcode } from "@/lib/services/openFoodFacts";

export async function POST(req: NextRequest) {
  const { barcode } = await req.json();

  if (!barcode) {
    return NextResponse.json({ error: "barcode is required" }, { status: 400 });
  }

  try {
    const product = await lookupByBarcode(barcode);
    if (product) {
      return NextResponse.json({ found: true, source: "openfoodfacts", product });
    }
    return NextResponse.json({ found: false, reason: "not_in_database" });
  } catch (err) {
    console.error("Lookup error:", err);
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }
}
