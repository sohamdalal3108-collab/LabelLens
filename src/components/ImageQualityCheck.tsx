import { validateLabelCapture, type QualityVerdict } from "@/lib/imageValidation";

/**
 * Draws a video frame to canvas and scores it for blur/brightness
 * BEFORE upload — fast client-side gate that saves a bad round trip.
 */
export function checkFrameQuality(
  videoEl: HTMLVideoElement
): QualityVerdict & { canvasFullRes: HTMLCanvasElement } {
  const smallCanvas = document.createElement("canvas");
  smallCanvas.width = 300;
  smallCanvas.height = (videoEl.videoHeight / videoEl.videoWidth) * 300;
  smallCanvas
    .getContext("2d")!
    .drawImage(videoEl, 0, 0, smallCanvas.width, smallCanvas.height);

  const verdict = validateLabelCapture(smallCanvas);

  const fullCanvas = document.createElement("canvas");
  fullCanvas.width = videoEl.videoWidth;
  fullCanvas.height = videoEl.videoHeight;
  fullCanvas.getContext("2d")!.drawImage(videoEl, 0, 0);

  return { ...verdict, canvasFullRes: fullCanvas };
}

const MESSAGES: Record<string, string> = {
  blurry: "Image is too blurry — hold steady and try again.",
  too_dark: "Too dark — move to better lighting.",
  overexposed_glare: "Glare detected — tilt the package to avoid reflections.",
};

interface Props {
  issues: string[];
  onRetry: () => void;
}

export default function ImageQualityCheck({ issues, onRetry }: Props) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className="bg-red-950 rounded-lg p-3 mt-2">
      <ul className="list-disc list-inside text-sm">
        {issues.map((issue) => (
          <li key={issue}>{MESSAGES[issue] || issue}</li>
        ))}
      </ul>
      <button onClick={onRetry} className="mt-2 text-sm underline">
        Retake photo
      </button>
    </div>
  );
}
