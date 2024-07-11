import React from 'react';
import {Text, View, Image} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import ButtonText from './ButtonText';

const OnBoardingBackgroundDesign = ({onBoardingNumber}) => {
  const insets = useSafeAreaInsets();
  const quiz = useSelector(state => state.quiz);
  return (
    <>
      <View
        style={{
          position: 'absolute',
          left: hp('2%'),
          top: Platform.OS === 'ios' ? hp('4%') : hp('3%'),
        }}>
        <Image source={require('../assets/Star2.png')} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
          left: 0,
        }}>
        <Image source={require('../assets/coloredStar.png')} />
      </View>

      <View style={{position: 'absolute', left: 0, top: hp('45%')}}>
        <Image source={require('../assets/sparkle.png')} />
      </View>

      <View style={{position: 'absolute', right: 0, top: hp('35%')}}>
        <Image source={require('../assets/halfStar.png')} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? hp('2%') : hp('1%'),
          right: hp('3%'),
        }}>
        <Image source={require('../assets/onBoarding5Spring.png')} />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 0,
          top: Platform.OS === 'ios' ? hp('4%') : hp('3%'),
        }}>
        <Image source={require('../assets/lightRays.png')} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom:
            Platform.OS === 'ios' && insets.bottom > 0
              ? insets.bottom
              : Platform.OS === 'ios' && insets.bottom == 0
              ? 15
              : 15,
        }}>
        <ButtonText
          fontFamily={'Outfit-Medium'}
          font={12}
          text={`${onBoardingNumber}/5`}
        />
      </View>
    </>
  );
};

export default OnBoardingBackgroundDesign;
