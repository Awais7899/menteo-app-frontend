import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {makeApiRequest} from '../../Axios/ApiRequests';
import {updateQuestion} from '../../../store/OnBoardingQuiz';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Wrong({isModalVisible, setModalVisible, rightOption, setSelect}) {
  const dispatch = useDispatch();
  const {questionNo, data} = useSelector(state => state.quiz);
  const dataLenght = data.data.length;
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      coverScreen={false}
      backdropColor="none"
      animationIn={'slideInUp'}
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
          backgroundColor: Colors.lightRed,
          borderRadius: 24,
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
          activeOpacity={0.8}
          onPress={() => {
            toggleModal();
            setSelect();
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

export default Wrong;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.Red,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    bottom: 12,
    borderRadius: 30,
    marginTop: 8,
  },
});