# react-native-moon-slider

A circular rotary knob/slider component for React Native with smooth Skia animations and gesture support for selecting or displaying values.

## Features

- 🎨 Built with `@shopify/react-native-skia` for smooth 60 FPS rendering
- 👆 Gesture support via `react-native-gesture-handler`
- 📳 Optional haptic feedback
- 🎯 Customizable colors, size, angles, and thumb
- 💡 Custom center content via `renderCenter`
- 🔧 Controlled component with `ref.setValue()` support
- 📦 TypeScript support

## Installation
```sh
npm install react-native-moon-slider
```

### Peer Dependencies

Make sure you have these installed in your project:
```sh
npm install @shopify/react-native-skia react-native-gesture-handler react-native-reanimated expo-haptics
```

## Usage
```tsx
import { useState } from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CircularSlider } from 'react-native-moon-slider';

export default function App() {
  const [volume, setVolume] = useState(40);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CircularSlider
        min={0}
        max={100}
        value={volume}
        onValueChange={setVolume}
        diameter={300}
        sliderWidth={20}
        thumbRadius={24}
        startAngle={135}
        endAngle={45}
        trackColor="#E0E0E0"
        fillColor="#4A90E2"
        thumbColor="#FFFFFF"
        thumbStrokeColor="#4A90E2"
        haptics={true}
        renderCenter={() => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{volume}</Text>
            <Text style={{ color: 'gray' }}>Volume</Text>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `value` | `number` | `0` | Current value |
| `onValueChange` | `(value: number) => void` | - | Callback when value changes |
| `diameter` | `number` | `300` | Diameter of the slider |
| `sliderWidth` | `number` | `20` | Thickness of the arc |
| `thumbRadius` | `number` | `24` | Size of the draggable thumb |
| `startAngle` | `number` | `135` | Start angle in degrees |
| `endAngle` | `number` | `45` | End angle in degrees |
| `trackColor` | `string` | `#E0E0E0` | Unfilled arc color |
| `fillColor` | `string` | `#4A90E2` | Filled arc color |
| `thumbColor` | `string` | `#FFFFFF` | Thumb fill color |
| `thumbStrokeColor` | `string` | `#4A90E2` | Thumb border color |
| `haptics` | `boolean` | `true` | Enable/disable haptic feedback |
| `renderCenter` | `() => ReactNode` | - | Custom center content |

## Ref Methods
```tsx
const sliderRef = useRef<CircularSliderRef>(null);

// Programmatically set value
sliderRef.current?.setValue(50);

<CircularSlider ref={sliderRef} ... />
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)