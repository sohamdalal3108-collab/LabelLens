import type { OFFProduct } from "../types";

const OFF_BASE = "https://world.openfoodfacts.org/api/v2/product";

/**
 * Look up a barcode against Open Food Facts.
 * Returns null on miss so the caller can trigger the OCR fallback path.
 */
export async function lookupByBarcode(barcode: string): Promise<OFFProduct | null> {
  const res = await fetch(`${OFF_BASE}/${barcode}.json`);
  if (!res.ok) return null;

  const data = await res.json();
  if (data.status !== 1) return null; // OFF's own "not found" flag

  const p = data.product;
  return {
    barcode,
    name: p.product_name ?? null,
    brand: p.brands ?? null,
    quantity: p.quantity ?? null,
    ingredients_text: p.ingredients_text ?? null,
    additives_tags: p.additives_tags || [],
    nutriments: p.nutriments || {},
    image_url: p.image_url ?? null,
  };
}
