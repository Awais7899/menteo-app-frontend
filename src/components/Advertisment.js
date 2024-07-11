import {View, Image, Platform} from 'react-native';
import ButtonText from './ButtonText';
import {Colors} from '../constants/Colors';
import {FILE_URL} from '@env';
import {useState} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const Advertisment = ({selected, buttonText, image, itemId}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 11,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor:
          selected === itemId ? Colors.primaryColor : Colors.borderColor,
        borderRadius: 32,
        marginVertical: 6,
        backgroundColor:
          selected === itemId ? Colors.primaryTransparent : Colors.White,
      }}>
      <View style={{marginRight: 12}}>
        {image && (
          <>
            <Image
              source={image}
              style={{
                height: 22,
                width: 22,
              }}
            />
          </>
        )}
      </View>
      <ButtonText
        text={buttonText}
        color={Colors.dark}
        fontFamily={'Outfit-Regular'}
      />
    </View>
  );
};

export default Advertisment;
