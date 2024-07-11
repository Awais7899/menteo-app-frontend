import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../../constants/Colors';
import ButtonText from '../ButtonText';

function RestoreProgress({isModalVisible, setModalVisible}) {
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
        flex: 1,
        width: '85%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: 180,
          backgroundColor: Colors.White,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: Colors.White,
          shadowColor: '#000000',
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 3,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            marginVertical: 12,
          }}>
          <Text
            style={{
              color: Colors.dark,
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
              letterSpacing: 0.7,
            }}>
            Welcome back!
          </Text>
          <Text
            style={{
              color: Colors.modelText,
              fontSize: 16,
              fontWeight: '600',
              letterSpacing: 0.7,
            }}>
            Your progress has been
          </Text>
          <Text
            style={{
              color: Colors.modelText,
              fontSize: 16,
              fontWeight: '600',
              letterSpacing: 0.7,
            }}>
            successfully restored
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            toggleModal();
          }}>
          <View style={styles.buttonContainer}>
            <ButtonText text={'Great!'} />
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default RestoreProgress;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    bottom: 6,
    borderRadius: 30,
    marginVertical: 8,
  },
});
