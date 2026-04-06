import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { getX, getY } from '../utils/rotaryMath';

interface AnimationConfig {
  initialValue: number;
  min: number;
  max: number;
  startAngle: number;
  totalArcDeg: number;
  radius: number;
  cx: number;
  cy: number;
}

export const useCircularAnimation = ({
  initialValue,
  min,
  max,
  startAngle,
  totalArcDeg,
  radius,
  cx,
  cy,
}: AnimationConfig) => {
  const progress = useSharedValue((initialValue - min) / (max - min));

  const thumbAngle = useDerivedValue(
    () => startAngle + progress.value * totalArcDeg
  );

  const thumbX = useDerivedValue(() => getX(thumbAngle.value, radius, cx));
  const thumbY = useDerivedValue(() => getY(thumbAngle.value, radius, cy));

  const fillEndAngle = useDerivedValue(() => thumbAngle.value);

  const animateToValue = (value: number) => {
    'worklet';
    const newProgress = (value - min) / (max - min);
    progress.value = withTiming(newProgress, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  };

  const setProgress = (p: number) => {
    'worklet';
    progress.value = Math.max(0, Math.min(1, p));
  };

  return {
    progress,
    thumbAngle,
    thumbX,
    thumbY,
    fillEndAngle,
    animateToValue,
    setProgress,
  };
};
