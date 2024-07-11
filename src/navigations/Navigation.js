import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  OnBoardingScreen1,
  OnBoardingScreen2,
  OnBoardingScreen3,
  OnBoardingScreen4,
  OnBoardingScreen5,
  Subscription,
  ThanksForJoining,
} from '../screens/onboarding';
import BottomTabBar from './BottomTabBar';
import EmotionUnit from '../screens/Units/EmotionUnit';
import Weldone from '../screens/Personas/Weldone';
import PlainTest from '../screens/Tests/TestScreen';
import Learning from '../screens/Learnings/LearningScreen';

import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
function NavigationStack() {
  const {data} = useSelector(state => state.navigation);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
      initialRouteName={data?.onBoardingScreen}>
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="OnBoardingScreen1"
        component={OnBoardingScreen1}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="OnBoardingScreen2"
        component={OnBoardingScreen2}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="OnBoardingScreen3"
        component={OnBoardingScreen3}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="OnBoardingScreen4"
        component={OnBoardingScreen4}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="OnBoardingScreen5"
        component={OnBoardingScreen5}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="Subscription"
        component={Subscription}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="ThanksForJoining"
        component={ThanksForJoining}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="BottomTabBar"
        component={BottomTabBar}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="Unit"
        component={EmotionUnit}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="Weldone"
        component={Weldone}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="Learning"
        component={Learning}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
        name="TestScreen"
        component={PlainTest}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
}
export default Navigation;
