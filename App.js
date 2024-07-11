import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Navigation from './src/navigations/Navigation';
import {StatusBar} from 'react-native';

import {store} from './store/store';
import {useDispatch, useSelector} from 'react-redux';
import Loader from './src/components/Loader';
import {navigationScreen} from './store/NavigationScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  withIAPContext,
} from 'react-native-iap';
import SplashScreen from 'react-native-lottie-splash-screen';
import {getLocalStorageData} from './store/util/localStorageData';
function App() {
  const dispatch = useDispatch();
  const [isLaoding, setIsLoading] = useState(true);
  useEffect(() => {
    const duration = Platform.OS === 'ios' ? 2000 : 0;
    setTimeout(() => {
      SplashScreen.hide(); // here
    }, duration);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    AsyncStorage.getItem('screen-navigation')
      .then(jsonValue => {
        const value = JSON.parse(jsonValue);
        dispatch(navigationScreen(value));
        if (value != null) {
          getLocalStorageData(value, setIsLoading, dispatch);
        } else {
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await initConnection();
        if (Platform.OS === 'android') {
          flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error) {
        console.error('Error occurred during initilization', error.message);
      }
    };
    init();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      {isLaoding ? <Loader state={isLaoding} /> : <Navigation />}
    </>
  );
}

export default withIAPContext(App);
