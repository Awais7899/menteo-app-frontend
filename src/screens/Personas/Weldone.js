import React, {useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryHeading from '../../components/PrimaryHeading';
import PrimaryButton from '../../components/PrimaryButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setTestInitialState} from '../../../store/Tests';
import {setLearningInitialState} from '../../../store/Learnings';
import {useDispatch} from 'react-redux';

function Weldone({navigation, route}) {
  const insets = useSafeAreaInsets();
  const buttonText = route.params?.buttonText;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userLessonOrPersonaCompleted = async () => {
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
    navigation.navigate('BottomTabBar');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PrimaryHeading text={'Well done!'} color={Colors.primaryColor} />
      </View>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../../assets/Weldone.png')} />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          alignSelf: 'center',
          flex: 0.1,
          marginBottom: Platform.OS === 'ios' ? insets.bottom + 16 : 32,
        }}>
        <View style={{}}>
          <TouchableOpacity
            onPress={() => {
              userLessonOrPersonaCompleted();
            }}>
            <PrimaryButton text={`Back to ${buttonText}`} loading={loading} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Weldone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.White,
  },
});
