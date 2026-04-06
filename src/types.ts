export interface CircularSliderProps {
  // Value
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: number) => void;

  // Layout
  diameter?: number;
  sliderWidth?: number;
  thumbRadius?: number;

  // Arc angles (degrees)
  startAngle?: number;
  endAngle?: number;

  // Colors
  trackColor?: string;
  fillColor?: string;
  thumbColor?: string;
  thumbStrokeColor?: string;
  thumbTextColor?: string;

  // Haptics
  haptics?: boolean;

  // Center content
  renderCenter?: () => React.ReactNode;
}

export interface CircularSliderRef {
  setValue: (value: number) => void;
}
