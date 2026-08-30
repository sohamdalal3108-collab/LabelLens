import type { LookupResult, ScanResult } from "@/lib/types";

type Props = { result: LookupResult | ScanResult | null };

/**
 * Renders either the Open Food Facts product data (informational, no
 * India-specific rules applied) or the full OCR-derived compliance report.
 */
export default function ResultsDisplay({ result }: Props) {
  if (!result) return null;

  if ("source" in result && result.source === "openfoodfacts") {
    const p = result.product;
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{p.name || "Unknown product"}</h2>
        <p>{p.brand}</p>
        <p>Quantity: {p.quantity}</p>
        <p>Ingredients: {p.ingredients_text}</p>
        {p.additives_tags?.length > 0 && (
          <p>Additives: {p.additives_tags.join(", ")}</p>
        )}
        <p className="text-sm text-gray-400 italic">
          Sourced from Open Food Facts — a global database entry, not an
          India-specific Legal Metrology compliance check.
        </p>
      </div>
    );
  }

  if ("violations" in result) {
    const { violations, unverified_fields, flagged_substances, summary } = result;

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Compliance Report</h2>
        <p>
          {summary.violation_count} violation(s) found · {summary.flagged_substance_count}{" "}
          flagged substance(s)
        </p>

        {violations.length > 0 && (
          <section>
            <h3 className="font-semibold">Violations</h3>
            <ul className="space-y-3">
              {violations.map((v) => (
                <li key={v.ruleId} className="border-l-2 border-red-400 pl-3">
                  <p className="font-medium">{v.requirement}</p>
                  <p className="text-sm text-gray-400">{v.section}</p>
                  <p className="text-sm">{v.recommendedAction}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {flagged_substances.length > 0 && (
          <section>
            <h3 className="font-semibold">Flagged Substances</h3>
            <ul className="space-y-3">
              {flagged_substances.map((f, i) => (
                <li key={i} className="border-l-2 border-red-400 pl-3">
                  <p className="font-medium">
                    {f.substance} ({f.status}) — found in ingredient: {f.ingredient}
                  </p>
                  <p className="text-sm text-gray-400">{f.regulation}</p>
                  {f.note && <p className="text-sm italic text-gray-400">{f.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {unverified_fields.length > 0 && (
          <section>
            <h3 className="font-semibold">Could Not Verify</h3>
            <p className="text-sm text-gray-400 italic">
              OCR confidence was too low on these fields — not counted as violations,
              but worth checking manually.
            </p>
            <ul className="list-disc list-inside">
              {unverified_fields.map((u) => (
                <li key={u.ruleId}>{u.field}</li>
              ))}
            </ul>
          </section>
        )}

        {violations.length === 0 && flagged_substances.length === 0 && (
          <p>No violations detected on the fields we could read.</p>
        )}
      </div>
    );
  }

  return null;
}
