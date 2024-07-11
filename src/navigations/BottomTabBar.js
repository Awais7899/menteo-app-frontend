import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../screens/Units/MainScreen';
import Personas from '../screens/Personas/Personas';
import Profile from '../screens/Profile/Profile';
import {Colors} from '../constants/Colors';
import {Text} from 'react-native';
import {Image} from 'react-native';
import Celebs from '../assets/BottomtabBar/celebs.svg';
import InactiveCelebs from '../assets/BottomtabBar/celebs-inactive.svg';
import ProfileSvg from '../assets/BottomtabBar/profile.svg';

import InactiveProfile from '../assets/BottomtabBar/profile-inactive.svg';
import Situations from '../assets/BottomtabBar/situations.svg';
import InactiveSituations from '../assets/BottomtabBar/situations-inactive.svg';

const Tab = createBottomTabNavigator();
function BottomTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: '#D6D1FF',
        tabBarPressOpacity: 0.2,
        tabBarLabelStyle: {
          textTransform: 'capitalize',
          fontSize: 12,
          fontFamily: 'Outfit-Medium',
        },
        tabBarStyle: [
          {
            height: 80,
            paddingTop: 10,
            paddingBottom: 16,
            backgroundColor: '#FFFFFF',
          },
        ],
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <Situations /> : <InactiveSituations />,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12.5,
                color: focused ? '#988DFF' : '#D6D1FF',
                fontFamily: 'Outfit-SemiBold',
                opacity: focused ? 1 : 0.9,
                letterSpacing: 0.3,
              }}>
              Situations
            </Text>
          ),
        }}
        name="Units"
        component={MainScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <Celebs /> : <InactiveCelebs />,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12.5,
                color: focused ? '#988DFF' : '#D6D1FF',
                fontFamily: 'Outfit-SemiBold',
                opacity: focused ? 1 : 0.9,
                letterSpacing: 0.3,
              }}>
              Celebs
            </Text>
          ),
        }}
        name="Personas"
        component={Personas}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? <ProfileSvg /> : <InactiveProfile />,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 12.5,
                color: focused ? '#988DFF' : '#D6D1FF',
                fontFamily: 'Outfit-SemiBold',
                opacity: focused ? 1 : 0.9,
                letterSpacing: 0.3,
              }}>
              Profile
            </Text>
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
export default BottomTabBar;
