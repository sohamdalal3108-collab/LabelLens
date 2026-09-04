/**
 * Lightweight client-side checks to reject bad label photos
 * BEFORE uploading — saves a round trip and gives instant user feedback.
 */

export interface QualityVerdict {
  ok: boolean;
  issues: string[];
  scores: { blurScore: number; brightness: number };
}

/**
 * Estimate blur using variance of Laplacian approximation on a downscaled canvas.
 * Lower variance = blurrier image.
 */
export function estimateBlurScore(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const gray = new Float32Array(width * height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    gray[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
  }

  let sum = 0;
  let sumSq = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      const lap =
        4 * gray[idx] - gray[idx - 1] - gray[idx + 1] - gray[idx - width] - gray[idx + width];
      sum += lap;
      sumSq += lap * lap;
      count++;
    }
  }

  const mean = sum / count;
  return sumSq / count - mean * mean; // threshold empirically ~50-100 on a downscaled 300px image
}

/**
 * Estimate average brightness (0-255) to catch too-dark / glare-blown shots.
 */
export function estimateBrightness(canvas: HTMLCanvasElement): number {
  const ctx = canvas.getContext("2d")!;
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  let total = 0;
  const pixelCount = imageData.data.length / 4;

  for (let i = 0; i < imageData.data.length; i += 4) {
    total += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
  }

  return total / pixelCount;
}

/**
 * Runs both checks against a captured frame and returns a verdict.
 * @param canvas - downscaled capture (e.g. 300px wide) for speed
 */
export function validateLabelCapture(canvas: HTMLCanvasElement): QualityVerdict {
  const blurScore = estimateBlurScore(canvas);
  const brightness = estimateBrightness(canvas);

  const issues: string[] = [];
  if (blurScore < 60) issues.push("blurry");
  if (brightness < 40) issues.push("too_dark");
  if (brightness > 230) issues.push("overexposed_glare");

  return { ok: issues.length === 0, issues, scores: { blurScore, brightness } };
}
