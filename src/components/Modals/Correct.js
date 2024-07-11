import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateQuestion} from '../../../store/OnBoardingQuiz';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Correct({isModalVisible, setModalVisible, setSelect}) {
  const dispatch = useDispatch();
  const {questionNo, data} = useSelector(state => state.quiz);
  const navigation = useNavigation();
  const dataLenght = data.data.length;

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
      animationOut={'slideOutDown'}
      animationOutTiming={500}
      style={{
        flex: 0,
        height: '92.5%',
        margin: 0,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          backgroundColor: Colors.lightGreen,
          borderRadius: 24,
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
          activeOpacity={0.8}
          onPress={() => {
            toggleModal();
            setSelect('');
            if (questionNo + 1 >= dataLenght) {
              AsyncStorage.setItem(
                'screen-navigation',
                JSON.stringify({
                  onBoardinding: false,
                  onBoardingScreen: 'OnBoardingScreen23',
                }),
              ).then(() => {
                navigation.navigate('OnBoardingScreen23');
              });
            } else {
              dispatch(updateQuestion(questionNo));
              AsyncStorage.setItem(
                'quiz-questionNo',
                JSON.stringify(questionNo + 1),
              );
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

export default Correct;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.Green,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    bottom: 12,
    borderRadius: 30,
    marginTop: 12,
  },
});
