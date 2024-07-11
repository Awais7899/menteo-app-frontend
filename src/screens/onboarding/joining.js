import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Colors} from '../../constants/Colors';
import ButtonText from '../../components/ButtonText';
import DesciptionText from '../../components/DescriptionText';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {FILE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cross from '../../assets/cross.svg';
export function ThanksForJoining({navigation}) {
  const settings = useSelector(state => state.settings);
  const insets = useSafeAreaInsets();

  // function getStringBeforeAndAfterLastSpace(inputString) {
  //   const lastSpaceIndex = inputString?.lastIndexOf(' ');
  //   if (lastSpaceIndex !== -1) {
  //     const beforeLastSpace = inputString?.substring(0, lastSpaceIndex);
  //     let afterLastSpace = inputString?.substring(lastSpaceIndex + 1);
  //     return {
  //       beforeLastSpace: beforeLastSpace,
  //       afterLastSpace: afterLastSpace,
  //     };
  //   } else {
  //     return {
  //       beforeLastSpace: inputString,
  //       afterLastSpace: '',
  //     };
  //   }
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.5,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            width: '80%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 34,
              color: Colors.White,
              fontFamily: 'Outfit-SemiBold',
            }}>
            Thanks for joining
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 4,
          }}>
          <Text
            style={{
              fontSize: 34,
              color: Colors.White,
              fontFamily: 'Outfit-SemiBold',
            }}>
            Menteo
          </Text>
          <View
            style={{
              backgroundColor: Colors.accent,
              paddingHorizontal: 8,
              borderRadius: 50,
              marginHorizontal: 4,
              marginBottom: -6,
            }}>
            <Text
              style={{
                color: Colors.primaryColor,
                fontSize: 18,
                fontFamily: 'Outfit-SemiBold',
              }}>
              PRO
            </Text>
          </View>
          <Text
            style={{
              fontSize: 34,
              color: Colors.White,
              fontFamily: 'Outfit-SemiBold',
            }}>
            !
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 18,
          }}>
          <View
            style={{
              width: '90%',
            }}>
            <DesciptionText
              textAlignment={'center'}
              text={
                "You've got all lessons, and there's more coming with updates. Stay excited!"
              }
              font={15}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.45,
          justifyContent: 'flex-end',
        }}>
        <LottieView
          source={{
            uri: `${FILE_URL}${settings.data?.data?.thank_you_screen_lottie_animation_file}`,
          }}
          autoPlay
          style={{
            height: 230,
            width: '100%',
          }}
        />
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            AsyncStorage.setItem(
              'screen-navigation',
              JSON.stringify({
                onBoardinding: true,
                onBoardingScreen: 'BottomTabBar',
              }),
            ).then(() => {
              navigation.navigate('BottomTabBar');
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 14,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 32,
              backgroundColor: Colors.accent,
            }}>
            <ButtonText text={'Continue'} color={Colors.primaryColor} />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          right: 25,
          top: Platform.OS === 'ios' ? insets.top + 8 : 30,
        }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem(
              'screen-navigation',
              JSON.stringify({
                onBoardinding: true,
                onBoardingScreen: 'BottomTabBar',
              }),
            ).then(() => {
              navigation.navigate('BottomTabBar');
            });
          }}>
          <Cross
            style={{
              color: Colors.White,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
    position: 'relative',
  },
});
