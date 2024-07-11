import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from './SecondaryHeading';
import Lock from '../assets/lock.svg';
import ArrowRight from '../assets/arrow-right.svg';

function UncheckedLesson({
  lessonName,
  locked,
  color,
  disabledColor,
  isLaoding,
  loadingId,
  id,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.checkedContainer}>
        <View
          style={{
            width: '85%',
            paddingHorizontal: 16,
          }}>
          <SecondaryHeading
            text={lessonName}
            lineHeight={20}
            font={16}
            fontFamily={'Outfit-Medium'}
            color={locked ? disabledColor : color}
          />
        </View>
        <View
          style={{
            width: '12%',
            paddingRight: 12,
          }}>
          {locked ? (
            <Lock style={{color: color}} />
          ) : (
            <>
              {isLaoding && loadingId == id ? (
                <ActivityIndicator color={color} animating={isLaoding} />
              ) : (
                <ArrowRight style={{color: color}} />
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default UncheckedLesson;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 18,
    height: 75,
    marginVertical: 8,
    backgroundColor: Colors.buttonColor,
  },
  checkedContainer: {
    borderRadius: 14,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
