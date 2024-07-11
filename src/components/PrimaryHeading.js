import React from 'react';
import {Text, StyleSheet} from 'react-native';
const PrimaryHeading = ({text, color, font}) => {
  return (
    <Text
      style={[styles.buttonText, {color: color, fontSize: font ? font : 42}]}>
      {text}
    </Text>
  );
};

export default PrimaryHeading;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Outfit-SemiBold',
  },
});
