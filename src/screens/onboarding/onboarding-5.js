import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import SecondaryHeading from '../../components/SecondaryHeading';
import ButtonText from '../../components/ButtonText';
import Advertisement from '../../components/Advertisment';
import OnBoardingBackgroundDesign from '../../components/OnBaordingBackgroundDesign';
import {useSelector, useDispatch} from 'react-redux';
import {introQuestion} from '../../../store/GetIntroQuestion';
import Loader from '../../components/Loader';
import {makeApiRequest} from '../../Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InternetConnection from '../../components/InternetConnection';
import {fetch} from '@react-native-community/netinfo';
import {listOfAdvertisement} from '../../app-data/onboarding-data/onboarding';
export function OnBoardingScreen5({navigation}) {
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(null);

  const handleSelection = selected => {
    setSelect(selected);
  };

  const AdvertisementAwnser = async () => {
    if (select) {
      AsyncStorage.setItem(
        'screen-navigation',
        JSON.stringify({
          onBoardinding: false,
          onBoardingScreen: 'Subscription',
        }),
      ).then(() => {
        navigation.navigate('Subscription');
      });
    } else {
      Toast.show('Tap to select atleast one!');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <View style={styles.displayContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              overScrollMode="never"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: 24,
                }}>
                <SecondaryHeading text={'How did you know about Menteo?'} />
              </View>
              <View
                style={{
                  marginVertical: 44,
                }}>
                {listOfAdvertisement.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => {
                        handleSelection(item.id);
                      }}>
                      <Advertisement
                        selected={select}
                        buttonText={item.title}
                        image={item.icon}
                        itemId={item.id}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                AdvertisementAwnser();
              }}>
              <View style={styles.buttonContainer}>
                {loading ? (
                  <ActivityIndicator color={Colors.White} animating={loading} />
                ) : (
                  <ButtonText text={'Continue'} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <OnBoardingBackgroundDesign onBoardingNumber={5} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayContainer: {
    width: '95%',
    height: Platform.OS === 'ios' ? '84%' : '85%',
    backgroundColor: Colors.White,
    borderRadius: 30,
    elevation: 5,
    shadowRadius: 2,
  },
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    bottom: 12,
    borderRadius: 30,
  },
});
