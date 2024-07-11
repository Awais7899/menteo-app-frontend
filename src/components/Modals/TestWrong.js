import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {updateTest, updateTestProgressBar} from '../../../store/Tests';
function TestWrong({
  isModalVisible,
  setModalVisible,
  rightOption,
  lessonOrPeronaId,
  buttonText,
  setSelect,
}) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {testNo} = useSelector(state => state.tests);
  const dataLenght = 4;
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      // onBackdropPress={() => setModalVisible(false)}
      coverScreen={false}
      backdropColor="none"
      animationIn={'slideInUp'}
      style={{
        margin: 0,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: Colors.lightRed,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderWidth: 1,
          borderColor: Colors.lightRed,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '90%',
            marginTop: 16,
          }}>
          <View
            style={{
              borderRadius: 6,
              width: 22,
              height: 22,
              backgroundColor: Colors.redAccent,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 8,
            }}>
            <Icon name="cross" size={16} color={Colors.Red} />
          </View>
          <View>
            <Text
              style={{
                color: Colors.Red,
                fontSize: 16,
                fontFamily: 'Outfit-Regular',
              }}>
              Wrong!
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '88%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: Colors.Red,
              fontSize: 13,
              fontFamily: 'Outfit-Regular',
              marginVertical: 4,
            }}>
            Correct answer:
          </Text>
          <Text
            style={{
              color: Colors.Red,
              fontSize: 13,
              marginBottom: 8,
              fontFamily: 'Outfit-Regular',
            }}>
            {rightOption[0].title}
          </Text>
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

export default TestWrong;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.Red,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    borderRadius: 30,
  },
});
