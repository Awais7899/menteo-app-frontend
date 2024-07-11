import React, {useState} from 'react';
import CheckboxField from 'react-native-checkbox-field';
import {Colors} from '../constants/Colors';
import Icon from 'react-native-vector-icons/Feather';
const CheckBox = ({backgroundColor, item, itemToSlected, selectedItem}) => {
  const handleItemSelection = () => {
    if (!selectedItem?.includes(item)) {
      itemToSlected(prev => {
        return [...prev, item];
      });
    } else {
      const updateSelectedItem = selectedItem?.filter(i => i !== item);
      itemToSlected(updateSelectedItem);
    }
  };
  return (
    <CheckboxField
      onSelect={() => {
        handleItemSelection();
      }}
      selected={selectedItem.includes(item)}
      defaultColor={backgroundColor ? backgroundColor : Colors.White}
      selectedColor={Colors.primaryColor}
      checkboxStyle={{
        borderWidth: 1,
        borderColor: !selectedItem?.includes(item)
          ? Colors.borderColor
          : Colors.primaryColor,
        borderRadius: 50,
        width: 23,
        height: 23,
      }}
      containerStyle={{
        flexDirection: 'row',
        padding: 2,
        alignItems: 'center',
        marginHorizontal: 6,
      }}>
      <Icon
        name="check"
        size={16}
        color={backgroundColor ? backgroundColor : Colors.White}
      />
    </CheckboxField>
  );
};

export default CheckBox;
