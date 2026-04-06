export const toRad = (deg: number): number => {
  'worklet';
  return (deg * Math.PI) / 180;
};

export const toDeg = (rad: number): number => {
  'worklet';
  return (rad * 180) / Math.PI;
};

export const getX = (angleDeg: number, radius: number, cx: number): number => {
  'worklet';
  return Math.cos(toRad(angleDeg)) * radius + cx;
};

export const getY = (angleDeg: number, radius: number, cy: number): number => {
  'worklet';
  return Math.sin(toRad(angleDeg)) * radius + cy;
};

export const touchToAngle = (
  touchX: number,
  touchY: number,
  cx: number,
  cy: number
): number => {
  'worklet';
  const dx = touchX - cx;
  const dy = touchY - cy;
  const angle = toDeg(Math.atan2(dy, dx));
  return (angle + 360) % 360;
};

export const angleToProgress = (
  angle: number,
  startAngle: number,
  totalArcDeg: number
): number => {
  'worklet';
  let shifted = (angle - startAngle + 360) % 360;
  if (shifted > totalArcDeg) {
    shifted = shifted > totalArcDeg / 2 + 180 ? 0 : totalArcDeg;
  }
  return shifted / totalArcDeg;
};

export const progressToValue = (
  progress: number,
  min: number,
  max: number
): number => {
  'worklet';
  return Math.round(min + progress * (max - min));
};

export const valueToAngle = (
  value: number,
  min: number,
  max: number,
  startAngle: number,
  totalArcDeg: number
): number => {
  'worklet';
  const progress = (value - min) / (max - min);
  return startAngle + progress * totalArcDeg;
};

export const buildArcPath = (
  startAngleDeg: number,
  endAngleDeg: number,
  radius: number,
  cx: number,
  cy: number
): string => {
  'worklet';
  const start = {
    x: getX(startAngleDeg, radius, cx),
    y: getY(startAngleDeg, radius, cy),
  };
  const end = {
    x: getX(endAngleDeg, radius, cx),
    y: getY(endAngleDeg, radius, cy),
  };
  const arcSpan = (endAngleDeg - startAngleDeg + 360) % 360;
  const largeArc = arcSpan > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};
