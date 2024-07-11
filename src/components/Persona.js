import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from './SecondaryHeading';
import ButtonText from './ButtonText';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {lessonsData, setLearningInitialState} from '../../store/Learnings';
import {setTestInitialState, testsData} from '../../store/Tests';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {fetch} from '@react-native-community/netinfo';
import DesciptionText from './DescriptionText';
import RightArrow from '../assets/arrow-right.svg';
import Lock from '../assets/lock.svg';
import FastImage from 'react-native-fast-image';
import {FILE_URL} from '@env';
function Persona({name, profession, image, locked, id, loadingId}) {
  const learnings = useSelector(state => state.learnings);
  const {isLaoding} = useSelector(state => state.tests);
  const user_data = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const completed = [1].includes(id);
  const getPersonaLearnngsAndTests = () => {
    dispatch(
      setTestInitialState({
        testNo: 0,
        progressBar: [],
      }),
    );
    dispatch(
      setLearningInitialState({
        lessonNo: 0,
        progressBar: [],
      }),
    );
    navigation.navigate('Learning', {
      lessonOrPeronaId: id,
      buttonText: 'Persona List',
      navigateTo: 'BottomTabBar',
    });
  };

  return (
    <View style={[styles.container]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'scace-between',
          alignSelf: 'center',
          paddingHorizontal: 12,
          flex: 1,
        }}>
        <View
          style={{
            flex: 0.4,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: locked ? 0.4 : 1,
          }}>
          <Image
            source={image}
            style={{
              width: 100,
              height: 100,
              borderRadius: 6,
            }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flex: 0.55,
            marginVertical: 8,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginHorizontal: 14,
            opacity: locked ? 0.4 : 1,
          }}>
          <View
            style={{
              alignItems: 'flex-start',
              paddingLeft: 4,
            }}>
            <SecondaryHeading
              text={name}
              font={17}
              color={Colors.primaryColor}
              lineHeight={24}
              fontFamily={'Outfit-SemiBold'}
            />
            <DesciptionText
              textAlignment={'center'}
              text={profession}
              color={'#78749C'}
              lineHeight={18}
            />
          </View>

          {completed && (
            <View
              style={{
                backgroundColor: Colors.Green,
                paddingHorizontal: 6,
                paddingVertical: 1,
                borderRadius: 24,
                alignItems: 'flex-start',
                marginLeft: 2,
              }}>
              <ButtonText
                text={'Completed'}
                fontFamily={'Outfit-Regular'}
                font={12}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          disabled={locked ? true : false}
          onPress={() => {
            getPersonaLearnngsAndTests();
          }}
          style={{
            flex: 0.2,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {locked ? (
            <Lock style={{color: Colors.primaryColor}} />
          ) : (
            <>
              {isLaoding && learnings?.isLaoding && loadingId == id ? (
                <ActivityIndicator
                  color={Colors.primaryColor}
                  animating={isLaoding && learnings?.isLaoding}
                />
              ) : (
                <RightArrow
                  style={{
                    color: Colors.primaryColor,
                  }}
                />
              )}
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Persona;

const styles = StyleSheet.create({
  container: {
    width: '92%',
    borderRadius: 10,
    height: 120,
    marginVertical: 5,
    alignSelf: 'center',
    backgroundColor: Colors.buttonColor,
  },
});
