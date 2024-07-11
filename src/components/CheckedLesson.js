import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from './SecondaryHeading';
import Icon from 'react-native-vector-icons/Ionicons';
import ArrowRight from '../assets/arrow-right.svg';
function CheckedLesson({lessonName, color, isLaoding, loadingId, id}) {
  return (
    <View style={[styles.container, {borderColor: color}]}>
      <View
        style={[
          styles.checkedContainer,
          {
            backgroundColor: color,
          },
        ]}>
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
            color={Colors.White}
          />
        </View>

        <View
          style={{
            width: '12%',
            paddingRight: 12,
          }}>
          {isLaoding && loadingId == id ? (
            <ActivityIndicator color={Colors.White} animating={isLaoding} />
          ) : (
            <ArrowRight style={{color: '#fff'}} />
          )}
        </View>
      </View>
    </View>
  );
}

export default CheckedLesson;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 18,
    height: 75,
    marginVertical: 8,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderWidth: 2,
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
