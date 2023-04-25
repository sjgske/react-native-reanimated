import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomSheetScreen from './src/BottomSheet/BottomSheetScreen';
import TarotScreen from './src/Tarot/TarotScreen';
import ArcSlider from './src/ArcSlider/ArcSlider';
import Swiper from './src/Swiper/Swiper';
import Home from './src/Home/Home';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Swiper" component={Swiper} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="ArcSlider" component={ArcSlider} />
        <Tab.Screen name="Tarot" component={TarotScreen} />
        <Tab.Screen name="BottomSheet" component={BottomSheetScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
