import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from './SecondaryHeading';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LeftArrow from '../assets/arrow-left.svg';

function Header({heading, backgroundColor}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          height: Platform.OS === 'ios' ? insets.top + 70 : 90,
        },
      ]}>
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? insets.top + 25 : 40,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View
              style={{
                marginRight: 12,
              }}>
              <LeftArrow />
            </View>
          </TouchableOpacity>
          <View>
            <SecondaryHeading
              text={heading}
              color={Colors.White}
              font={23}
              fontFamily={'Outfit-SemiBold'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
});
