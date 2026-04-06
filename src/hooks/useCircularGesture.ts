import { Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import type {
  PanGestureHandlerEventPayload,
  GestureUpdateEvent,
  GestureStateChangeEvent,
} from 'react-native-gesture-handler';
import {
  touchToAngle,
  angleToProgress,
  progressToValue,
} from '../utils/rotaryMath';

interface GestureConfig {
  cx: number;
  cy: number;
  startAngle: number;
  totalArcDeg: number;
  min: number;
  max: number;
  haptics?: boolean;
  setProgress: (p: number) => void;
  onValueChange?: (value: number) => void;
}

export const useCircularGesture = ({
  cx,
  cy,
  startAngle,
  totalArcDeg,
  min,
  max,
  haptics = true,
  setProgress,
  onValueChange,
}: GestureConfig) => {
  let lastEmittedValue = -1;

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    })
    .onUpdate((e: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      const angle = touchToAngle(e.x, e.y, cx, cy);
      const progress = angleToProgress(angle, startAngle, totalArcDeg);
      setProgress(progress);

      const value = progressToValue(progress, min, max);
      if (value !== lastEmittedValue) {
        lastEmittedValue = value;
        onValueChange?.(value);
        if (haptics) Haptics.selectionAsync();
      }
    })
    .onEnd((e: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
      const angle = touchToAngle(e.x, e.y, cx, cy);
      const progress = angleToProgress(angle, startAngle, totalArcDeg);
      setProgress(progress);
      const value = progressToValue(progress, min, max);
      onValueChange?.(value);
      if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    });

  return { panGesture };
};
