import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateTest, updateTestProgressBar} from '../../../store/Tests';
function TestCorrect({
  isModalVisible,
  setModalVisible,
  lessonOrPeronaId,
  buttonText,
  setSelect,
}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {testNo} = useSelector(state => state.tests);
  const navigation = useNavigation();
  const dataLenght = 4;
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={false}
      backdropColor="none"
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={500}
      style={{
        margin: 0,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: Colors.lightGreen,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          borderColor: Colors.lightGreen,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '90%',
            marginVertical: 16,
          }}>
          <View
            style={{
              borderRadius: 6,
              width: 22,
              height: 22,
              backgroundColor: '#a2f4e5',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <Icon name="check" size={16} color={Colors.Green} />
          </View>
          <View>
            <Text
              style={{
                color: Colors.Green,
                fontSize: 16,
                fontFamily: 'Outfit-Regular',
              }}>
              Correct!
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 24,
          }}
          activeOpacity={0.8}
          onPress={() => {
            toggleModal();
            setSelect('');
            if (testNo + 1 >= dataLenght) {
              setTimeout(() => {
                navigation.navigate('Weldone', {
                  buttonText: buttonText,
                  id: lessonOrPeronaId,
                });
              }, 500);
            } else {
              dispatch(updateTest(testNo));
              dispatch(updateTestProgressBar(1));
            }
          }}>
          <View style={styles.buttonContainer}>
            <ButtonText text={'Continue'} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default TestCorrect;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.Green,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    borderRadius: 30,
  },
});
