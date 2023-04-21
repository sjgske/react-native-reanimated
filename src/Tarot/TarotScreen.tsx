import { View, StyleSheet } from 'react-native';
import Card from './TarotCard';
import { useSharedValue } from 'react-native-reanimated';

const CARDS = [
  require('./assets/death.png'),
  require('./assets/chariot.png'),
  require('./assets/high-priestess.png'),
  require('./assets/justice.png'),
  require('./assets/lover.png'),
  require('./assets/pendu.png'),
  require('./assets/tower.png'),
  require('./assets/strength.png'),
];

const Tarot = () => {
  const shuffleBack = useSharedValue(false);
  return (
    <View style={styles.container}>
      {CARDS.map((card, index) => (
        <Card key={index} card={card} index={index} shuffleBack={shuffleBack} />
      ))}
    </View>
  );
};

export default Tarot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
});
