import { useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Canvas, Path, Circle, Group } from '@shopify/react-native-skia';
import { GestureDetector } from 'react-native-gesture-handler';
import { useDerivedValue } from 'react-native-reanimated';

import type { CircularSliderProps, CircularSliderRef } from './types';
import { useCircularGeometry } from './hooks/useCircularGeometry';
import { useCircularAnimation } from './hooks/useCircularAnimation';
import { useCircularGesture } from './hooks/useCircularGesture';
import { buildArcPath } from './utils/rotaryMath';

const CircularSlider = forwardRef<CircularSliderRef, CircularSliderProps>(
  (
    {
      min = 0,
      max = 100,
      value = 0,
      onValueChange,
      diameter = 300,
      sliderWidth = 20,
      thumbRadius = 24,
      startAngle = 135,
      endAngle = 45,
      trackColor = '#E0E0E0',
      fillColor = '#4A90E2',
      thumbColor = '#FFFFFF',
      thumbStrokeColor = '#4A90E2',
      renderCenter,
      haptics = true,
    },
    ref
  ) => {
    const { cx, cy, radius, totalArcDeg } = useCircularGeometry({
      diameter,
      sliderWidth,
      startAngle,
      endAngle,
    });

    const {
      progress,
      thumbX,
      thumbY,
      fillEndAngle,
      animateToValue,
      setProgress,
    } = useCircularAnimation({
      initialValue: value,
      min,
      max,
      startAngle,
      totalArcDeg,
      radius,
      cx,
      cy,
    });

    const { panGesture } = useCircularGesture({
      cx,
      cy,
      startAngle,
      totalArcDeg,
      min,
      max,
      haptics,
      setProgress,
      onValueChange,
    });

    useEffect(() => {
      animateToValue(value);
    }, [value, animateToValue]);

    useImperativeHandle(ref, () => ({
      setValue: (v: number) => animateToValue(v),
    }));

    const trackPath = useDerivedValue(() => {
      return buildArcPath(startAngle, startAngle + totalArcDeg, radius, cx, cy);
    });

    const fillPath = useDerivedValue(() => {
      if (progress.value <= 0) return '';
      return buildArcPath(startAngle, fillEndAngle.value, radius, cx, cy);
    });

    return (
      <View style={{ width: diameter, height: diameter }}>
        <GestureDetector gesture={panGesture}>
          <Canvas style={{ width: diameter, height: diameter }}>
            <Path
              path={trackPath}
              color={trackColor}
              style="stroke"
              strokeWidth={sliderWidth}
              strokeCap="round"
            />
            <Path
              path={fillPath}
              color={fillColor}
              style="stroke"
              strokeWidth={sliderWidth}
              strokeCap="round"
            />
            <Group>
              <Circle
                cx={thumbX}
                cy={thumbY}
                r={thumbRadius}
                color={thumbColor}
              />
              <Circle
                cx={thumbX}
                cy={thumbY}
                r={thumbRadius}
                color={thumbStrokeColor}
                style="stroke"
                strokeWidth={3}
              />
            </Group>
          </Canvas>
        </GestureDetector>

        {renderCenter && (
          <View
            pointerEvents="none"
            style={[
              styles.centerOverlay,
              { width: diameter, height: diameter },
            ]}
          >
            {renderCenter()}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  centerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CircularSlider;
