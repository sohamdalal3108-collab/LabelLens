import { BoundingBox } from '@/lib/types/inspection';

export interface PixelBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function normalizedToPixelBox(
  box: BoundingBox,
  containerWidth: number,
  containerHeight: number
): PixelBox {
  const left = box.xmin * containerWidth;
  const top = box.ymin * containerHeight;
  const width = (box.xmax - box.xmin) * containerWidth;
  const height = (box.ymax - box.ymin) * containerHeight;

  return {
    left: Math.max(0, left),
    top: Math.max(0, top),
    width: Math.max(10, width),
    height: Math.max(10, height)
  };
}

export function getBoxColorByField(box: BoundingBox, isViolation = false, isSelected = false): string {
  if (isSelected) return '#3B82F6'; // Blue-500 for active selection
  if (isViolation) return '#EF4444'; // Red-500 for violation
  if (box.confidence < 0.6) return '#F59E0B'; // Amber-500 for manual review
  return '#10B981'; // Green-500 for verified compliant
}
