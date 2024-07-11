import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
const SecondaryHeading = ({
  text,
  font,
  textAlign,
  color,
  lineHeight,
  fontFamily,
  onLayout,
}) => {
  return (
    <Text
      style={[
        styles.buttonText,
        {
          color: color ? color : Colors.dark,
          fontSize: font ? font : 20,
          textAlign: textAlign ? textAlign : 'left',
          lineHeight: lineHeight ? lineHeight : 30,
          fontFamily: fontFamily ? fontFamily : 'Outfit-Bold',
        },
      ]}
      onLayout={onLayout}>
      {text}
    </Text>
  );
};

export default SecondaryHeading;

const styles = StyleSheet.create({
  buttonText: {
    letterSpacing: 0,
  },
});
