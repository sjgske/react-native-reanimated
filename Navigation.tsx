import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheetScreen from './src/BottomSheet/BottomSheetScreen';
import TarotScreen from './src/Tarot/TarotScreen';
import ArcSliderScreen from './src/ArcSlider/ArcSliderScreen';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="ArcSlider" component={ArcSliderScreen} />
        <Tab.Screen name="Tarot" component={TarotScreen} />
        <Tab.Screen name="BottomSheet" component={BottomSheetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
