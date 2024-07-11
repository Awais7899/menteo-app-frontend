import React from 'react';
import {View} from 'react-native';
import {Colors} from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DisabledCheckbox = ({id, unitId}) => {
  const checked = [1, 2].includes(id);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: checked ? Colors.Green : Colors.White,
        borderWidth: 2,
        borderColor: checked ? Colors.Green : Colors.disabled,
        borderRadius: 12.5,
        width: 22,
        height: 22,
      }}>
      <Icon name="check" size={12} color={Colors.White} />
    </View>
  );
};
export default DisabledCheckbox;
