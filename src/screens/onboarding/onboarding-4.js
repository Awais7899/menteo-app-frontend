import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import SecondaryHeading from '../../components/SecondaryHeading';
import ButtonText from '../../components/ButtonText';
import CauseofLearning from '../../components/CasueofLearning';
import OnBoardingBackgroundDesign from '../../components/OnBaordingBackgroundDesign';
import {useSelector} from 'react-redux';
import {makeApiRequest} from '../../Axios/ApiRequests';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetch} from '@react-native-community/netinfo';
import InternetConnection from '../../components/InternetConnection';
import {listOfLearningReason} from '../../app-data/onboarding-data/onboarding';
export function OnBoardingScreen4({navigation}) {
  const [laoding, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const ReasonOfLearning = async () => {
    if (selected?.length > 0) {
      AsyncStorage.setItem(
        'screen-navigation',
        JSON.stringify({
          onBoardinding: false,
          onBoardingScreen: 'OnBoardingScreen5',
        }),
      ).then(() => {
        navigation.navigate('OnBoardingScreen5');
      });
    } else {
      Toast.show('Tap to select atleast one!');
    }
  };

  return (
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
              <SecondaryHeading text={'Why are you learning?'} />
            </View>

            <View
              style={{
                marginVertical: 40,
              }}>
              {listOfLearningReason.map((item, index) => {
                return (
                  <View key={index}>
                    <CauseofLearning
                      buttonText={item?.title}
                      image={item?.icon}
                      item={item?.id}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              ReasonOfLearning();
            }}>
            <View style={styles.buttonContainer}>
              {laoding ? (
                <ActivityIndicator color={Colors.White} animating={laoding} />
              ) : (
                <ButtonText text={'Continue'} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <OnBoardingBackgroundDesign onBoardingNumber={4} />
    </View>
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
    alignSelf: 'center',
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
