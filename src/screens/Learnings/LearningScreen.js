import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../../constants/Colors';
import PrimaryButton from '../../components/PrimaryButton';
import SegmentedProgressBar from '../../components/SegmentedProgressBar';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import SecondaryHeading from '../../components/SecondaryHeading';
import Video from 'react-native-video';
import {
  updateLearning,
  updateLearningProgressBar,
} from '../../../store/Learnings';
import LeaveLesson from '../../components/Modals/LeaveLesson';
function Learning({navigation, route}) {
  const [progressViewWith, setProgressViewWidth] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {lessonNo, learningProgressBar} = useSelector(state => state.learnings);
  const insets = useSafeAreaInsets();

  const checkFileType = type => {
    const fileType = type.split('/')[0];
    return fileType;
  };

  const learnings = [
    {
      id: 1,
      title: 'Cognition and Emotion',
      description:
        'Understanding emotions is intricately tied to cognition. Both processes are interconnected, influencing one another in various ways.',
      file: null,
      file_type: null,
    },
    {
      id: 2,
      title: 'Emotions and Thoughts',
      description:
        "Our emotions don't just arise spontaneously; they are often influenced by our thoughts, beliefs, and perceptions.",
      file: null,
      file_type: null,
    },
    {
      id: 3,
      title: null,
      description:
        'Our beliefs about the world around us can shape our emotional responses.',
      file_type: 'image/png',
      file: require('../../assets/learning-image.png'),
    },
    {
      id: 4,
      title: "The Brain's Role",
      description:
        'The brain plays a pivotal role in the interaction between emotion and cognition, with specific regions being responsible for different emotional and cognitive processes.',
      file: null,
      file_type: null,
    },
    {
      id: 5,
      title: null,
      description:
        'These brain areas are hubs of emotional and cognitive processing.',
      file_type: 'video/mp4',
      file: require('../../assets/onboarding-2.mp4'),
    },
    {
      id: 6,
      title: null,
      description: null,
      file_type: 'image/png',
      file: require('../../assets/test_image.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView
        overScrollMode="never"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 0.1,
            marginTop: Platform.OS === 'ios' ? insets.top + 20 : 30,
            width: '95%',
          }}
          onLayout={e => {
            setProgressViewWidth(e.nativeEvent.layout.width);
          }}>
          <SegmentedProgressBar
            progressd={learningProgressBar}
            learnings={learnings}
            width={progressViewWith}
            setResult={setModalOpen}
          />
        </View>
        {learnings[lessonNo]?.title == null &&
          learnings[lessonNo]?.description == null &&
          learnings[lessonNo]?.file && (
            <View style={styles.bigImageContainer}>
              <Image
                source={learnings[lessonNo].file}
                style={{
                  flex: 1,
                  width: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
          )}
        {learnings[lessonNo]?.title &&
          learnings[lessonNo]?.description &&
          learnings[lessonNo]?.file == null && (
            <View
              style={{
                width: '92%',
                alignSelf: 'center',
                flex: 0.8,
              }}>
              <SecondaryHeading
                text={learnings[lessonNo]?.title}
                font={27}
                fontFamily={'Outfit-SemiBold'}
              />

              <View
                style={{
                  marginVertical: 18,
                }}>
                <Text
                  style={{
                    color: '#78749C',
                    fontSize: 16,
                    letterSpacing: 0.4,
                    lineHeight: 24,
                    fontFamily: 'Outfit-Regular',
                  }}>
                  {learnings[lessonNo]?.description}
                </Text>
              </View>
            </View>
          )}
        {learnings[lessonNo]?.title == null &&
          learnings[lessonNo]?.description &&
          learnings[lessonNo]?.file && (
            <View
              style={{
                width: '92%',
                alignSelf: 'center',
                flex: 0.9,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  overflow: 'hidden',
                  borderRadius: 24,
                }}>
                {checkFileType(learnings[lessonNo]?.file_type) === 'image' ? (
                  <>
                    <Image
                      source={learnings[lessonNo]?.file}
                      style={{
                        width: wp('90%'),
                        height: 220,
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                    />
                  </>
                ) : (
                  <>
                    <Video
                      source={learnings[lessonNo]?.file}
                      style={{
                        width: wp('90%'),
                        height: 220,
                        borderRadius: 16,
                      }}
                      resizeMode="cover"
                      repeat={true}
                      controls={false}
                      /*     onLoadStart={() => {
                        setFileState(true);
                      }}
                      onLoad={() => {
                        setFileState(false);
                      }} */
                    />
                  </>
                )}
              </View>
              <View
                style={{
                  marginVertical: 16,
                }}>
                <Text
                  style={{
                    color: '#78749C',
                    fontSize: 16,
                    fontFamily: 'Outfit-Regular',
                    letterSpacing: 0.4,
                    lineHeight: 24,
                  }}>
                  {learnings[lessonNo]?.description}
                </Text>
              </View>
            </View>
          )}
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            marginBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 24,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (lessonNo + 1 >= learnings.length) {
                dispatch(updateLearningProgressBar(1));
                navigation.navigate('TestScreen', {
                  lessonOrPeronaId: route.params.lessonOrPeronaId,
                  buttonText: route.params.buttonText,
                  navigateTo: route.params?.navigateTo,
                  Title: route.params?.Title,
                  Color: route.params?.Color,
                  sections: route.params?.sections,
                  unitId: route.params?.unitId,
                });
              } else {
                dispatch(updateLearning(lessonNo));
                dispatch(updateLearningProgressBar(1));
              }
            }}>
            <PrimaryButton text={'Next'} width={wp('92%')} loading={loading} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LeaveLesson
        isModalVisible={modalOpen}
        setModalVisible={setModalOpen}
        navigateTo={route.params?.navigateTo}
        Title={route.params?.Title}
        Color={route.params?.Color}
        sections={route.params?.sections}
        unitId={route.params?.unitId}
      />
    </View>
  );
}

export default Learning;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    height: hp('100%'),
    justifyContent: 'space-between',
  },
  bigImageContainer: {
    width: '92%',
    height: '80%',
    borderRadius: 24,
    alignSelf: 'center',
    flex: 0.8,
  },
});

// if (!netWorkState) {
//   return <InternetConnection setNetWorkState={setNetWorkState} />;
// }

// const saveUserLearning = async () => {
//   fetch()
//     .then(async state => {
//       setNetWorkState(state.isConnected);
//       if (state.isConnected) {
//         const lessonIdData = {
//           learning_id: data.data[lessonNo].id,
//         };
//         const headers = {
//           Authorization: `Bearer ${user_data.data.token}`,
//         };
//         setLoading(true);
//         try {
//           const response = await makeApiRequest(
//             'save-user-learning',
//             'post',
//             lessonIdData,
//             headers,
//           );
//           setLoading(false);
//           if (response.success) {
//             if (lessonNo + 1 >= data.data.length) {
//               dispatch(updateLearningProgressBar(1));
//               const headers = {
//                 Authorization: `Bearer ${user_data.data.token}`,
//               };
//               setTimeout(() => {
//                 navigation.navigate('TestScreen', {
//                   lessonOrPeronaId: route.params.lessonOrPeronaId,
//                   buttonText: route.params.buttonText,
//                 });
//               }, 500);
//             } else {
//               dispatch(updateLearning(lessonNo));
//               dispatch(updateLearningProgressBar(1));
//             }
//           }
//         } catch (error) {
//           setLoading(false);
//           Toast.show(error.message);
//         }
//       }
//     })
//     .catch(err => {
//       console.log('error', err);
//     });
// };

{
  /* <View
                style={{
                  marginHorizontal: 18,
                  width: '80%',
                  flex: 0.25,
                }}>
                <PrimaryHeading
                  text={data.data[lessonNo]?.title}
                  color={Colors.dark}
                />
              </View> */
}
{
  /* <View
                style={{
                  justifyContent: 'space-around',
                  flex: 0.5,
                }}>
                <View
                  style={{
                    margin: 18,
                    width: '65%',
                  }}>
                  <Text
                    style={{
                      color: Colors.dark,
                      fontSize: 18,
                      fontFamily: 'Outfit-Medium',
                      letterSpacing: 1,
                      lineHeight: 24,
                    }}>
                    {
                      getStringBeforeAndAfterLastSpace(
                        data?.data[lessonNo]?.description,
                      ).beforeLastSpace
                    }
                  </Text>
                  <View
                    style={{
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                      }}>
                      <Text
                        style={{
                          color: Colors.dark,
                          fontSize: 18,
                          fontFamily: 'Outfit-Bold',
                          letterSpacing: 1,
                          lineHeight: 28,

                          marginBottom: 1,
                        }}
                        onLayout={onTextLayout}>
                        {
                          getStringBeforeAndAfterLastSpace(
                            data?.data[lessonNo]?.description,
                          ).afterLastSpace
                        }
                      </Text>
                      <Svg height="20" width="100%">
                        <Path
                          d={`M0 ${textWidth / 10} Q${textWidth / 2 - 8} -${
                            textWidth / 28
                          }, ${textWidth - 2}  ${textWidth / 12}`}
                          fill="transparent"
                          stroke={Colors.primaryColor}
                          strokeWidth="2.5"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignSelf: 'flex-end',
                    margin: 18,
                    width: '70%',
                  }}>
                  <Text
                    style={{
                      color: Colors.dark,
                      fontSize: 18,
                      fontFamily: 'Outfit-Medium',
                      letterSpacing: 0.7,
                      lineHeight: 28,
                      textAlign: 'right',
                    }}>
                    {data.data[lessonNo].description2}
                  </Text>
                </View>
              </View> */
}

// const onTextLayout = event => {
//   const {width} = event.nativeEvent.layout;
//   setTextWidth(width);
// };
