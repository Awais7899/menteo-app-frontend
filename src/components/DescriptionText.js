import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

const DesciptionText = ({text, textAlignment, font, color, lineHeight}) => {
  return (
    <Text
      style={[
        styles.buttonText,
        {
          textAlign: textAlignment ? textAlignment : 'auto',
          fontSize: font ? font : 14,
          color: color ? color : Colors.White,
          lineHeight: lineHeight ? lineHeight : 24,
        },
      ]}>
      {text}
    </Text>
  );
};

export default DesciptionText;

const styles = StyleSheet.create({
  buttonText: {
    letterSpacing: 0.4,
    fontFamily: 'Outfit-Regular',
  },
});
