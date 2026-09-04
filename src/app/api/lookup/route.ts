import { NextRequest, NextResponse } from "next/server";
import { lookupByBarcode } from "@/lib/services/openFoodFacts";
import { lookupUPCItemDB } from "@/lib/services/upcItemDb";

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

    const upcProduct = await lookupUPCItemDB(barcode);
    if (upcProduct) {
      return NextResponse.json({ found: true, source: "upcitemdb", product: upcProduct });
    }

    return NextResponse.json({ found: false, reason: "not_in_database" });
  } catch (err) {
    console.error("Lookup error:", err);
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }
}
