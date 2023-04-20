import { StatusBar } from 'expo-status-bar';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetRefProps } from '../components/BottomSheet';
import { useCallback, useRef } from 'react';

const Home = () => {
  const ref = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Pressable style={styles.button} onPress={onPress} />
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: 'orange' }} />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    opacity: 0.6,
  },
});
