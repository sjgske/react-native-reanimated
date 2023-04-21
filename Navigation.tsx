import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheetScreen from './src/BottomSheet/BottomSheetScreen';
import TarotScreen from './src/Tarot/TarotScreen';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="BottomSheet" component={BottomSheetScreen} />
        <Tab.Screen name="Tarot" component={TarotScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
