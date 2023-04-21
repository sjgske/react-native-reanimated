import {
  Canvas,
  Circle,
  Path,
  Rect,
  Skia,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { polar2Canvas } from 'react-native-redash';

const { width, height } = Dimensions.get('window');

const ArcSliderScreen = () => {
  const strokeWidth = 20;
  const center = width / 2;
  const r = (width - strokeWidth) / 2 - 40;
  const startAngle = Math.PI;
  const endAngle = Math.PI * 2;

  const x1 = center - r * Math.cos(startAngle);
  const y1 = -r * Math.sin(startAngle) + center;
  const x2 = center - r * Math.cos(endAngle);
  const y2 = -r * Math.sin(endAngle) + center;

  const rawPath = `M ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2}`;
  const rawForegroundPath = `M ${x2} ${y2} A ${r} ${r} 1 0 1 ${x1} ${y1}`;
  const skiaBackgroundPath = Skia.Path.MakeFromSVGString(rawPath);
  const skiaForegroundPath = Skia.Path.MakeFromSVGString(rawForegroundPath);

  const movableCx = useSharedValue(x2);
  const movableCy = useSharedValue(y2);
  const previousCx = useSharedValue(x2);
  const previousCy = useSharedValue(y2);
  const percentComplete = useSharedValue(0);

  const skiaCx = useValue(x2);
  const skiaCy = useValue(y2);
  const skiaPercentComplete = useValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(({ absoluteX, translationX, translationY }) => {
      const oldCanvasX = translationX + previousCx.value;
      const oldCanvasY = translationY + previousCy.value;
      const xPrime = oldCanvasX - center;
      const yPrime = -(oldCanvasY - center);

      const rawTheta = Math.atan2(yPrime, xPrime);

      let newTheta = 0;

      if (absoluteX < width && rawTheta < 0) {
        newTheta = Math.PI;
      } else if (absoluteX > width / 2 && rawTheta <= 0) {
        newTheta = 0;
      } else {
        newTheta = rawTheta;
      }

      const percent = 1 - newTheta / Math.PI;
      percentComplete.value = percent;

      const newCoords = polar2Canvas(
        {
          theta: newTheta,
          radius: r,
        },
        {
          x: center,
          y: center,
        },
      );

      movableCx.value = newCoords.x;
      movableCy.value = newCoords.y;
    })
    .onEnd(() => {
      previousCx.value = movableCx.value;
      previousCy.value = movableCy.value;
    });

  useSharedValueEffect(
    () => {
      skiaCx.current = movableCx.value;
      skiaCy.current = movableCy.value;
      skiaPercentComplete.current = percentComplete.value;
    },
    movableCx,
    movableCy,
  );

  if (!skiaBackgroundPath || !skiaForegroundPath) {
    return <View />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <View style={styles.ghost} />
          <Canvas style={styles.canvas}>
            {/* <Rect x={0} y={0} width={width} height={height} color="black" /> */}
            <Path
              path={skiaBackgroundPath}
              strokeWidth={strokeWidth}
              strokeCap="round"
              color="grey"
              style="stroke"
            />
            <Path
              path={skiaForegroundPath}
              strokeWidth={strokeWidth}
              strokeCap="round"
              color="orange"
              style="stroke"
              start={0}
              end={skiaPercentComplete}
            />
            <Circle r={20} cx={skiaCx} cy={skiaCy} color="orange" />
            <Circle r={15} cx={skiaCx} cy={skiaCy} color="white" />
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  cursor: {
    backgroundColor: 'green',
  },
  ghost: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArcSliderScreen;
