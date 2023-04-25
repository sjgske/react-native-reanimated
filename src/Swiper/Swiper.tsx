import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const SwiperScreen = () => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false}>
      <View style={styles.slide}>
        <View style={{ width: 300, height: 500, backgroundColor: 'grey' }}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>Beautiful</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.text}>And simple</Text>
      </View>
    </Swiper>
  );
};

export default SwiperScreen;

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
