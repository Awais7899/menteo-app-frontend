import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';

const SecondaryButton = ({text}) => {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.buttonText}>Get Started</Text>
    </View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: wp('90%'),
    padding: 16,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.White,
  },
});
