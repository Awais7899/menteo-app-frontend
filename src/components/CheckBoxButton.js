import React, {useState} from 'react';
import {View, Image} from 'react-native';
import ButtonText from './ButtonText';
import {Colors} from '../constants/Colors';
import CheckBox from './CheckBox';

const CheckBoxButton = ({buttonText, item, setSelected, selected}) => {
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
      <View style={{marginRight: 12}}>
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

export default CheckBoxButton;
