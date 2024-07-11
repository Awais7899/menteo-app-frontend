import React, {useState} from 'react';
import {View, Image, Platform} from 'react-native';
import ButtonText from './ButtonText';
import {Colors} from '../constants/Colors';
import CheckBox from './CheckBox';
import {FILE_URL} from '@env';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const CauseofLearning = ({buttonText, item, image, setSelected, selected}) => {
  const [fileState, setFileState] = useState(true);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: selected.includes(item)
          ? Colors.primaryColor
          : Colors.borderColor,
        borderRadius: 32,
        marginVertical: 6,
        backgroundColor: selected.includes(item)
          ? Colors.primaryTransparent
          : Colors.White,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginHorizontal: 8}}>
          {image && (
            <>
              <Image
                source={image}
                style={{
                  height: 20,
                  width: 20,
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

      <CheckBox
        item={item}
        itemToSlected={setSelected}
        selectedItem={selected}
      />
    </View>
  );
};

export default CauseofLearning;
