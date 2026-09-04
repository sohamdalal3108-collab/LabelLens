const UPCITEMDB_URL = "https://api.upcitemdb.com/prod/trial/lookup";

export async function lookupUPCItemDB(barcode: string) {
  const res = await fetch(`${UPCITEMDB_URL}?upc=${barcode}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.items || data.items.length === 0) return null;

  const item = data.items[0];
  return {
    name: item.title ?? null,
    brand: item.brand ?? null,
    category: item.category ?? null,
    image_url: item.images?.[0] ?? null,
  };
}
