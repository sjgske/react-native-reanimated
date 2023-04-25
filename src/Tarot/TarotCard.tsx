import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

const { width, height } = Dimensions.get('window');

const aspectRatio = 722 / 368;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (width + CARD_WIDTH + 50) / 2;
const SNAP_POINTS = [-side, 0, side];

interface CardProps {
  card: ReturnType<typeof require>;
  index: number;
  shuffleBack: Animated.SharedValue<boolean>;
}

const Card = ({ card, index, shuffleBack }: CardProps) => {
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const scale = useSharedValue(1);
  const context = useSharedValue({ x: 0, y: 0 });

  // shuffleBack.value가 true일때 애니메이션 실행
  useAnimatedReaction(
    () => shuffleBack.value,
    () => {
      if (shuffleBack.value) {
        const delay = 150 * index;
        x.value = withDelay(delay, withSpring(0));
        rotateZ.value = withDelay(delay, withSpring(theta));
      }
    },
  );

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    y.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
    rotateZ.value = withDelay(
      delay,
      withTiming(theta, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, [index, rotateZ, theta, y]);

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onBegin(() => {
          context.value = { x: x.value, y: y.value }; // 이전 값을 저장
          scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
          rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
        })
        .onUpdate(e => {
          x.value = e.translationX + context.value.x;
          y.value = e.translationY + context.value.y;
        })
        .onEnd(e => {
          const destination = snapPoint(x.value, e.velocityX, SNAP_POINTS);
          x.value = withSpring(destination, { velocity: e.velocityX });
          y.value = withSpring(0, { velocity: e.velocityY });
          scale.value = withTiming(
            1,
            { easing: Easing.inOut(Easing.ease) },
            () => {
              if (index === 0 && destination !== 0) {
                shuffleBack.value = true;
              }
            },
          );
        }),
    [],
  );

  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: '30deg' },
      { rotateZ: `${rotateZ.value}deg` },
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={card}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
