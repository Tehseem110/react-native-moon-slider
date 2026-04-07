import { useMemo } from 'react';

interface GeometryConfig {
  diameter: number;
  sliderWidth: number;
  startAngle: number;
  endAngle: number;
  thumbRadius: number;
}

export const useCircularGeometry = ({
  diameter,
  sliderWidth,
  startAngle,
  endAngle,
  thumbRadius,
}: GeometryConfig) => {
  return useMemo(() => {
    const cx = diameter / 2 + thumbRadius;
    const cy = diameter / 2 + thumbRadius;
    const radius = diameter / 2 - sliderWidth / 2;
    const totalArcDeg = (endAngle - startAngle + 360) % 360 || 360;

    return { cx, cy, radius, totalArcDeg };
  }, [diameter, sliderWidth, startAngle, endAngle, thumbRadius]);
};
