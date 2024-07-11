import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryHeading from '../../components/PrimaryHeading';
import {Colors} from '../../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import OnBoardingImage from '../../assets/onbaording/image1.svg';
import OnBoardingSvg from '../../assets/onbaording/svgs/OnBoardingSvg';
import PrimaryButton from '../../components/PrimaryButton';
import ButtonText from '../../components/ButtonText';

export function OnBoardingScreen1({navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'center',
            paddingHorizontal: 12,
          }}>
          <View>
            <PrimaryHeading text={'Situations'} color={Colors.White} />
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              borderRadius: 6,
              paddingHorizontal: 8,
              backgroundColor: `${Colors.White}4D`,
              fontSize: 18,
              fontFamily: 'Outfit-Regular',
              color: Colors.White,
              marginVertical: 6,
            }}>
            Unlock the secrets of body language
          </Text>

          <Text
            style={{
              alignSelf: 'flex-start',
              borderRadius: 6,
              paddingHorizontal: 8,
              backgroundColor: `${Colors.White}4D`,
              fontSize: 18,
              fontFamily: 'Outfit-Regular',
              color: Colors.White,
            }}>
            in everyday moments
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../assets/onbaording/image1.jpg')}
            style={{
              height: '93%',
              width: '93%',
              alignSelf: 'center',
              borderRadius: 16,
            }}
          />
        </View>
        <View
          style={{
            flex: 0.12,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OnBoardingScreen2');
            }}>
            <PrimaryButton
              text={'Next'}
              backgroundColor={Colors.accent}
              textColor={Colors.primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.04,
            marginBottom:
              Platform.OS === 'ios' && insets.bottom > 0
                ? insets.bottom
                : Platform.OS === 'ios' && insets.bottom == 0
                ? 16
                : 18,
          }}>
          <ButtonText text={'1/5'} fontFamily={'Outfit-Medium'} font={12} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
});
