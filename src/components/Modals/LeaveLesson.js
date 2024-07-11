import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';
import {useNavigation} from '@react-navigation/native';
import {setLearningInitialState} from '../../../store/Learnings';
import {setTestInitialState} from '../../../store/Tests';
import {useDispatch} from 'react-redux';

function LeaveLesson({
  isModalVisible,
  setModalVisible,
  navigateTo,
  Title,
  Color,
  sections,
  unitId,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      coverScreen={false}
      backdropColor="none"
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={500}
      style={{
        margin: 0,
        width: '100%',
        backgroundColor: '#17152C33',
      }}>
      <View
        style={{
          height: 150,
          backgroundColor: Colors.White,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: Colors.White,
          shadowColor: '#bbb',
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
          alignSelf: 'center',
          width: '85%',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 0.46,
            marginVertical: 8,
          }}>
          <Text
            style={{
              color: Colors.dark,
              fontSize: 18,
              fontFamily: 'Outfit-Bold',
              textAlign: 'center',
            }}>
            Are you sure you want to leave?
          </Text>
          <Text
            style={{
              color: Colors.modelText,
              fontSize: 16,
              fontFamily: 'Outfit-Medium',
            }}>
            You will lose current progress
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.5,
            marginHorizontal: 16,
          }}>
          <View style={styles.cancelContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                toggleModal();
              }}>
              <ButtonText text={'Cancel'} />
            </TouchableOpacity>
          </View>

          <View style={styles.leaveContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                toggleModal();
                dispatch(
                  setLearningInitialState({
                    lessonNo: 0,
                    progressBar: [],
                  }),
                );
                navigation.navigate(navigateTo, {
                  Title: Title,
                  Color: Color,
                  sections: sections,
                  unitId: unitId,
                });
              }}>
              <ButtonText text={'Leave'} color={Colors.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default LeaveLesson;

const styles = StyleSheet.create({
  cancelContainer: {
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: '48%',
    padding: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  leaveContainer: {
    backgroundColor: Colors.White,
    alignSelf: 'center',
    width: '48%',
    padding: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
});
