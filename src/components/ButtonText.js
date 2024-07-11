import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

const ButtonText = ({text, color, fontFamily, font}) => {
  return (
    <Text
      style={[
        styles.buttonText,
        {
          color: color ? color : Colors.White,
          fontFamily: fontFamily ? fontFamily : 'Outfit-SemiBold',
          fontSize: font ? font : 14,
        },
      ]}>
      {text}
    </Text>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    color: Colors.White,

    lineHeight: 20,
    letterSpacing: 0.4,
  },
});
