import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CircularSlider } from 'react-native-rotary';

export default function App() {
  const [volume, setVolume] = useState(40);

  return (
    <GestureHandlerRootView style={styles.container}>
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
        // haptics={false}
        trackColor="#E0E0E0"
        fillColor="#4A90E2"
        thumbColor="#FFFFFF"
        thumbStrokeColor="#4A90E2"
        thumbTextColor="#000000"
        renderCenter={() => (
          <View style={styles.center}>
            <Text style={styles.value}>{volume}</Text>
            <Text style={styles.label}>Volume</Text>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    color: 'gray',
    fontSize: 14,
  },
});
