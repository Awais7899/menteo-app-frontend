import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Unit from '../../components/Unit';
import {Colors} from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {unitDataAction} from '../../../store/UnitData';
import {fetch} from '@react-native-community/netinfo';
import InternetConnection from '../../components/InternetConnection';
import {checkCompletedType} from '../../../store/util/GlobalFunctions/CompletedLessonType';

function MainScreen({navigation}) {
  const user_data = useSelector(state => state.user);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {data, isLaoding} = useSelector(state => state.unitData);
  const [netWorkState, setNetWorkState] = useState(true);

  // useEffect(() => {
  //   const headers = {
  //     Authorization: `Bearer ${user_data?.data?.token}`,
  //   };
  //   fetch()
  //     .then(state => {
  //       setNetWorkState(state.isConnected);
  //       if (state.isConnected) {
  //         dispatch(
  //           unitDataAction({
  //             endPoint: '/get-units',
  //             method: 'get',
  //             data: null,
  //             headers: headers,
  //           }),
  //         );
  //       }
  //     })
  //     .catch(err => {
  //       console.log('error=========', err);
  //     });
  // }, [netWorkState]);

  // if (!netWorkState) {
  //   return <InternetConnection setNetWorkState={setNetWorkState} />;
  // }

  const unitData = [
    {
      id: 1,
      title: 'Emotion',
      background: Colors.emotionColor,
      sections: [1, 2, 3, 4, 5],
      tests: [1, 2, 3, 4, 5, 5, 6, 7, 7],
      lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      completedLessons: [2, 4, 5, 6, 7, 5],
    },
    {
      id: 2,
      title: 'Mimic activity',
      background: Colors.mimicColor,
      sections: [1, 2, 3],
      tests: [1, 2, 3, 4],
      lessons: [1, 2, 3, 4, 5, 6, 7, 8],
      completedLessons: [2, 4],
    },
    {
      id: 3,
      title: 'Facial expressions',
      background: Colors.facialColor,
      sections: [1, 2, 3, 4, 5],
      tests: [1, 2, 3, 4, 5, 5, 6, 7, 7, 9, 8, 7],
      lessons: [1, 2, 3, 4, 5],
      completedLessons: [2],
    },
    {
      id: 4,
      title: 'Body language',
      background: Colors.bodyColor,
      sections: [1, 2, 3, 4, 5, 6, 7],
      tests: [1, 2, 3, 4, 5],
      lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      completedLessons: [2, 4, 5],
    },
    {
      id: 5,
      title: 'Manipulation',
      background: Colors.manipulationColor,
      sections: [1, 2, 3, 4, 5],
      tests: [1, 2, 3, 4, 5, 5, 6, 7],
      lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      completedLessons: [2, 4, 5, 6],
    },
    {
      id: 6,
      title: 'Cold reading',
      background: Colors.coldReadingColor,
      sections: [1, 2, 3],
      tests: [1, 2, 3, 4, 5, 6],
      lessons: [1, 2, 3, 4, 5],
      completedLessons: [2, 5],
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <ScrollView overScrollMode="never">
          <View
            style={{
              width: '92%',
              alignSelf: 'center',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: Platform.OS === 'ios' ? insets.top + 12 : 18,
                marginBottom: 12,
              }}>
              <Text
                style={{
                  color: Colors.dark,
                  fontSize: 24,
                  fontFamily: 'Outfit-Bold',
                }}>
                Situations
              </Text>
            </View>
          </View>
          {unitData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('Unit', {
                    Title: item.title,
                    Color: item.background,
                    sections: item.sections,
                    unitId: index,
                  });
                }}>
                <Unit
                  heading={item.title}
                  backgroundColor={item.background}
                  sections={item.sections?.length}
                  tests={item.tests?.length}
                  totalLesson={item.lessons?.length}
                  completedLessons={item.completedLessons.length}
                  index={index}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.White,
  },
});
