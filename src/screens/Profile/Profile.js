import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SecondaryHeading from '../../components/SecondaryHeading';
import {Colors} from '../../constants/Colors';
import ButtonText from '../../components/ButtonText';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkCompletedType} from '../../../store/util/GlobalFunctions/CompletedLessonType';
import {
  finishTransaction,
  getAvailablePurchases,
  initConnection,
} from 'react-native-iap';
import {makeApiRequest} from '../../Axios/ApiRequests';
import {userAppData} from '../../../store/UserDataSlice';
import Loader from '../../components/Loader';
import CustomProgressBar from '../../components/CustomProgressBar';
function Profile({navigation}) {
  const insets = useSafeAreaInsets();
  const {data} = useSelector(state => state.userAppData);
  const unitDataResult = useSelector(state => state.unitData);
  const personaData = useSelector(state => state.personaData);
  const user_data = useSelector(state => state.user);
  const [totalPersonas, setTotalPersonas] = useState(0);
  const [isLaoding, setIsLoading] = useState(false);
  useEffect(() => {
    const getStoredData = async () => {
      const storedpersona = await AsyncStorage.getItem('no-of-personas');
      if (storedpersona == null) {
        setTotalPersonas(0);
      } else {
        const personLength = JSON.parse(storedpersona);
        setTotalPersonas(personLength);
      }
    };
    getStoredData();
  }, []);

  const calculateTotalLesson = () => {
    let totalLessons = 0;
    unitDataResult.data?.data &&
      unitDataResult?.data?.data.map(
        item => (totalLessons = totalLessons + item.lesson_ids.length),
      );
    return totalLessons;
  };

  const calculateProgressBar = () => {
    if (calculateTotalLesson() > 0) {
      const totalCompletedLessons =
        (checkCompletedType(data?.completed_lesson_ids)?.length /
          calculateTotalLesson()) *
        100;
      if (totalCompletedLessons) {
        return totalCompletedLessons;
      } else {
        return 0;
      }
    }
  };

  const getSubscriptionId = receipt => {
    if (JSON.parse(receipt).productId.includes('1y')) {
      return 1;
    } else if (JSON.parse(receipt).productId.includes('1m')) {
      return 2;
    }
  };

  const validateReceipt = async res => {
    try {
      const headers = {
        Authorization: `Bearer ${user_data.data?.token}`,
      };
      const subscriptionId = getSubscriptionId(res);
      const data = {
        subscription_id: subscriptionId,
        detail: res,
      };
      try {
        const response = await makeApiRequest(
          'save-user-subscription',
          'post',
          data,
          headers,
        );
        if (response.success) {
          await finishTransaction({purchase});
          dispatch(
            userAppData({
              endPoint: '/user',
              method: 'post',
              data: null,
              headers: headers,
            }),
          ).then(() => {
            setIsLoading(false);
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.warn('error', error);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('err', error);
    }
  };
  const userInfo = {
    is_pro_user: 0,
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <Image
              source={require('../../assets/ProfilAvatar.png')}
              resizeMode="cover"
              style={{
                width: wp('100%'),
                height: hp('30%'),
              }}
            />
            <View
              style={{
                position: 'absolute',
                left: 20,
                top: Platform.OS === 'ios' ? insets.top + 10 : 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SecondaryHeading
                  text={'Profile'}
                  fontFamily={'Outfit-SemiBold'}
                  color={Colors.White}
                />
                {userInfo?.is_pro_user == 1 && (
                  <View
                    style={{
                      backgroundColor: Colors.accent,
                      paddingHorizontal: 6,
                      paddingVertical: 1,
                      borderRadius: 16,
                      marginHorizontal: 6,
                    }}>
                    <Text
                      style={{
                        color: Colors.primaryColor,
                        fontSize: 13,
                        fontFamily: 'Outfit-SemiBold',
                      }}>
                      PRO
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.ProgressBox}>
              <View
                style={[
                  styles.innerBox,
                  {
                    backgroundColor: Colors.lightGreen,
                  },
                ]}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    marginHorizontal: 18,
                  }}>
                  <SecondaryHeading
                    text={'Progress'}
                    font={18.5}
                    lineHeight={20}
                    fontFamily={'Outfit-SemiBold'}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 4,
                    }}>
                    <CustomProgressBar
                      height={11}
                      containerWidth={130}
                      containerRadius={8}
                      value={45}
                      progressContainerColor={`${Colors.Green}40`}
                      progressColor={Colors.Green}
                    />
                    <View
                      style={{
                        marginHorizontal: 12,
                      }}>
                      <ButtonText text={`45%`} color={Colors.Green} />
                    </View>
                  </View>
                </View>
                <View>
                  <Image
                    source={require('../../assets/design.png')}
                    style={{
                      height: 85,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 12,
                alignSelf: 'center',
              }}>
              <View style={styles.box}>
                <SecondaryHeading
                  text={'Celebs'}
                  font={18.5}
                  fontFamily={'Outfit-SemiBold'}
                />
                <ButtonText
                  text={`1/4`}
                  color={Colors.dark}
                  fontFamily={'Outfit-Regular'}
                  font={15}
                />
              </View>
              <View style={styles.box}>
                <SecondaryHeading
                  text={'Situations'}
                  font={18.5}
                  fontFamily={'Outfit-SemiBold'}
                />
                <ButtonText
                  text={`25/60`}
                  color={Colors.dark}
                  fontFamily={'Outfit-Regular'}
                  font={15}
                />
              </View>
            </View>
            {userInfo?.is_pro_user == 0 && (
              <>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Subscription');
                  }}>
                  <ButtonText text={'GO PRO'} />
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 8,
                        marginHorizontal: 12,
                        backgroundColor: Colors.accent,
                        borderRadius: 12,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: Colors.primaryColor,
                          fontFamily: 'Outfit-Medium',
                          fontSize: 12,
                        }}>
                        Save 58%
                      </Text>
                    </View>
                    <Icon
                      name="chevron-forward"
                      size={20}
                      color={Colors.White}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => {
                  //   initConnection()
                  //     .catch(e => {
                  //       setIsLoading(false);
                  //     })
                  //     .then(() => {
                  //       getAvailablePurchases()
                  //         .catch(() => {
                  //           setIsLoading(false);
                  //         })
                  //         .then(res => {
                  //           if (res.length > 0) {
                  //             setIsLoading(true);
                  //             validateReceipt(res[0].transactionReceipt);
                  //           } else {
                  //             setIsLoading(false);
                  //             Alert.alert(
                  //               'Restore Subscription',
                  //               'There is no prevoius Subscription!',
                  //               [
                  //                 {
                  //                   text: 'OK',
                  //                 },
                  //               ],
                  //             );
                  //           }
                  //         });
                  //     });
                  // }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: '#C3C0DE',
                      fontFamily: 'Outfit-Medium',
                      letterSpacing: 0.6,
                    }}>
                    Restore Progress
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              height: hp('15%'),
              marginVertical: 12,
            }}>
            <ButtonText
              text={'Got questions?'}
              color={'#C3C0DE'}
              fontFamily={'Outfit-Regular'}
            />
            <View
              style={{
                flexDirection: 'row',
              }}>
              <ButtonText
                text={'Just email us at'}
                color={'#C3C0DE'}
                fontFamily={'Outfit-Regular'}
              />
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#C3C0DE',
                  fontFamily: 'Outfit-Medium',
                  letterSpacing: 0.6,
                  fontSize: 16,
                }}>
                {' '}
                support@menteo.app
              </Text>
            </View>
            <ButtonText
              text={"and we'll be right there to help!"}
              color={'#C3C0DE'}
              fontFamily={'Outfit-Regular'}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    height: hp('100%'),
  },
  ProgressBox: {
    marginTop: -16,
    width: '95%',
    borderRadius: 24,
    alignSelf: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderWidth: 2,
    borderColor: Colors.lightGreen,
  },
  innerBox: {
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  box: {
    backgroundColor: Colors.buttonColor,
    height: 88,
    width: '45%',
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: wp('90%'),
    padding: 14,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginVertical: 14,
  },
});
