import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PrimaryButton from '../../components/PrimaryButton';
import {Colors} from '../../constants/Colors';
import SecondaryHeading from '../../components/SecondaryHeading';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Rating} from '@kolking/react-native-rating';
import Toast from 'react-native-simple-toast';
import {makeApiRequest} from '../../Axios/ApiRequests';
import Loader from '../../components/Loader';
import Carousel from 'react-native-reanimated-carousel';
import Tick from '../../assets/tick.svg';
import Cross from '../../assets/cross.svg';
import CheckboxField from 'react-native-checkbox-field';
import {
  purchaseUpdatedListener,
  getSubscriptions,
  requestSubscription,
  purchaseErrorListener,
  flushFailedPurchasesCachedAsPendingAndroid,
  finishTransaction,
  getAvailablePurchases,
  initConnection,
} from 'react-native-iap';
import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch, useSelector} from 'react-redux';
// import {userAppData} from '../../../store/UserDataSlice';
// import PusherInitialization from '../../../store/util/Pusher/PusherServices';
import {fetch} from '@react-native-community/netinfo';
import {reviewsData} from '../../app-data/onboarding-data/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Subscription({navigation}) {
  const insets = useSafeAreaInsets();
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState(null);
  // const [reviewsData, setReviewsData] = useState();
  const [premiumUser, setPremiumUser] = useState('');
  const [netWorkState, setNetWorkState] = useState(true);
  const currentSubscriptionId = useRef(1);

  // const user_data = useSelector(state => state.user);
  // const dispatch = useDispatch();

  const width = Dimensions.get('window').width;

  let purchaseSubscriptionError;
  let purchaseSubscriptionUpdate;
  let lastTransactionRecipe = null;

  const productSkus = Platform.select({
    android: ['menteo_9.99_1m', 'menteo_49.99_1y'],
    ios: ['menteo_49.99_1y', 'menteo_9.99_1m'],
  });

  // const validate = async purchase => {
  //   const headers = {
  //     Authorization: `Bearer ${user_data?.data?.token}`,
  //   };
  //   const data = {
  //     subscription_id: currentSubscriptionId.current,
  //     detail: purchase?.transactionReceipt,
  //   };
  //   setLoading(true);
  //   console.warn(purchase?.transactionReceipt);
  //   try {
  //     const response = await makeApiRequest(
  //       'save-user-subscription',
  //       'post',
  //       data,
  //       headers,
  //     );
  //     setLoading(false);
  //     if (response.success) {
  //       await finishTransaction({purchase});
  //       const headers = {
  //         Authorization: `Bearer ${user_data?.data?.token}`,
  //       };
  //       dispatch(
  //         userAppData({
  //           endPoint: '/user',
  //           method: 'post',
  //           data: null,
  //           headers: headers,
  //         }),
  //       ).then(() => {
  //         AsyncStorage.setItem(
  //           'screen-navigation',
  //           JSON.stringify({
  //             onBoardinding: true,
  //             onBoardingScreen: 'BottomTabBar',
  //           }),
  //         ).then(() => {
  //           navigation.navigate('ThanksForJoining');
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.warn('error', error);
  //   }
  // };

  useEffect(() => {
    if (Platform.OS === 'android') {
      flushFailedPurchasesCachedAsPendingAndroid();
    }
  }, [netWorkState]);

  // useEffect(() => {
  //   purchaseSubscriptionUpdate = purchaseUpdatedListener(purchase => {
  //     if (purchase.transactionReceipt) {
  //       if (lastTransactionRecipe === purchase.transactionReceipt) return;
  //       lastTransactionRecipe = purchase.transactionReceipt;
  //       console.warn(purchase);
  //       validate(purchase);
  //     }
  //   });

  //   purchaseSubscriptionError = purchaseErrorListener(error => {
  //     if (error['responseCode'] != 2) {
  //       console.warn('err', `${error['code']}`);
  //     }
  //   });
  //   return () => {
  //     purchaseSubscriptionUpdate.remove();
  //     purchaseSubscriptionError.remove();
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const getPurchase = async () => {
        try {
          const result = await getSubscriptions({skus: productSkus});
          setPremiumUser(result);
        } catch (error) {
          console.error('Error occurred while fetching purchases', error);
        }
      };
      getPurchase();
    }, []),
  );

  const getSubscriptionId = () => {
    if (checked === 0 && premiumUser[checked].productId.includes('1y')) {
      return premiumUser[checked].productId;
    } else if (
      checked === 0 &&
      !premiumUser[checked].productId.includes('1y')
    ) {
      return premiumUser[1].productId;
    } else if (checked === 1 && premiumUser[checked].productId.includes('1m')) {
      return premiumUser[checked].productId;
    } else if (
      checked === 1 &&
      !premiumUser[checked].productId.includes('1m')
    ) {
      return premiumUser[0].productId;
    }
  };

  const handleSubscription = async () => {
    // fetch()
    //   .then(async state => {
    //     setNetWorkState(state.isConnected);
    //     if (state.isConnected) {
    //       let sku;
    //       try {
    //         if (Platform.OS === 'android') {
    //           const offerToken =
    //             premiumUser[checked].subscriptionOfferDetails[0].offerToken;
    //           sku = premiumUser[checked].productId;
    //           await requestSubscription({
    //             sku,
    //             ...(offerToken && {subscriptionOffers: [{sku, offerToken}]}),
    //           });
    //         } else {
    //           sku = getSubscriptionId();
    //           await requestSubscription({
    //             sku,
    //           });
    //         }
    //       } catch (err) {
    //         console.log('err.code, err.message', err);
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.warn('error', err);
    //   });
    navigation.navigate('ThanksForJoining');
  };

  // const cancelSubscription = async () => {
  //   fetch()
  //     .then(async state => {
  //       setNetWorkState(state.isConnected);
  //       if (state.isConnected) {
  //         if (Platform.OS === 'android') {
  //           initConnection()
  //             .catch(e => {
  //               console.warn(` error: ${e}`);
  //             })
  //             .then(() => {
  //               getAvailablePurchases()
  //                 .catch(() => {
  //                   console.warn('getting error');
  //                 })
  //                 .then(res => {
  //                   if (res.length > 0) {
  //                     console.warn(res);
  //                     const receipt = JSON.parse(res[1].transactionReceipt);
  //                     Linking.openURL(
  //                       `https://play.google.com/store/account/subscriptions?package=${receipt.packageName}&sku=${receipt.productId}`,
  //                     );
  //                   } else {
  //                     Alert.alert(
  //                       'Cancel Subscription',
  //                       'There is no availbale Subscription!',
  //                       [
  //                         {
  //                           text: 'OK',
  //                           onPress: () => console.log('OK Pressed'),
  //                         },
  //                       ],
  //                     );
  //                   }
  //                 });
  //             });
  //         } else {
  //           Linking.openURL(
  //             'https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions',
  //           );
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //     });
  // };

  // useEffect(() => {
  //   PusherInitialization(dispatch, user_data?.data);
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Platform.OS === 'ios' ? insets.top : 0,
          }}>
          <SecondaryHeading
            font={28}
            text={'Maximize your learning'}
            fontFamily={'Outfit-SemiBold'}
          />
        </View>
        <View
          style={{
            flex: 0.42,
          }}>
          <Carousel
            loop
            width={width}
            autoPlay={true}
            data={reviewsData}
            scrollAnimationDuration={4000}
            renderItem={({item, index}) => (
              <View key={index}>
                <View style={{alignItems: 'center'}}>
                  <Rating
                    size={22}
                    rating={item.rating}
                    disabled={true}
                    fillColor={Colors.reviewFilledColor}
                    baseColor={Colors.buttonColor}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: 12,
                  }}>
                  <View
                    style={{
                      width: '80%',
                    }}>
                    <SecondaryHeading
                      font={18}
                      textAlign={'center'}
                      fontFamily={'Outfit-Regular'}
                      lineHeight={26}
                      text={item.comment}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: 12,
                    }}>
                    <Text
                      style={{color: '#C3C0DE', fontFamily: 'Outfit-Regular'}}>
                      {item.username}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{flex: 0.38}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setChecked(0);
              currentSubscriptionId.current = subscriptionData
                ? subscriptionData[0].id
                : null;
            }}
            style={
              checked == 0
                ? styles.SubscriptionButton
                : styles.withOutSubscriptionButton
            }>
            <View
              style={{
                position: 'absolute',
                right: 20,
                top: -10,
                paddingHorizontal: 8,
                backgroundColor: Colors.primaryColor,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.accent,
                  fontFamily: 'Outfit-SemiBold',
                  fontSize: 12,
                }}>
                {`Save 58%`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <SecondaryHeading
                  text={'7 days free trial'}
                  font={20}
                  lineHeight={22}
                  fontFamily={'Outfit-SemiBold'}
                />

                <View style={{marginTop: 4}}>
                  <Text
                    style={{
                      color: '#C3C0DE',
                      fontSize: 12,
                      fontFamily: 'Outfit-Medium',
                    }}>
                    Then $49.99 per year (only $4.17 per month)
                  </Text>
                </View>
              </View>
              <View>
                <CheckboxField
                  onSelect={() => {
                    setChecked(0);
                    currentSubscriptionId.current = subscriptionData
                      ? subscriptionData[0].id
                      : null;
                  }}
                  selected={checked == 0 ? true : false}
                  defaultColor={Colors.buttonColor}
                  selectedColor={Colors.primaryColor}
                  checkboxStyle={{
                    borderWidth: 1,
                    borderColor:
                      checked == 1 ? Colors.borderColor : Colors.primaryColor,
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                  }}
                  containerStyle={{
                    flexDirection: 'row',
                    padding: 0,
                    alignItems: 'center',
                    marginHorizontal: 6,
                  }}>
                  <Tick
                    style={{
                      color: checked == 0 ? Colors.White : Colors.buttonColor,
                    }}
                  />
                </CheckboxField>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              currentSubscriptionId.current = subscriptionData
                ? subscriptionData[1]?.id
                : null;
              setChecked(1);
            }}
            style={
              checked == 1
                ? styles.SubscriptionButton
                : styles.withOutSubscriptionButton
            }>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <SecondaryHeading
                  text={'1 month'}
                  font={20}
                  lineHeight={22}
                  fontFamily={'Outfit-SemiBold'}
                />

                <View style={{marginVertical: 2}}>
                  <Text
                    style={{
                      color: '#C3C0DE',
                      fontSize: 12,
                      fontFamily: 'Outfit-Medium',
                    }}>
                    $9.99
                  </Text>
                </View>
              </View>
              <View>
                <CheckboxField
                  onSelect={() => {
                    currentSubscriptionId.current = subscriptionData
                      ? subscriptionData[1]?.id
                      : null;
                    setChecked(1);
                  }}
                  selected={checked == 1 ? true : false}
                  defaultColor={Colors.buttonColor}
                  selectedColor={Colors.primaryColor}
                  checkboxStyle={{
                    borderWidth: 1,
                    borderColor:
                      checked == 0 ? Colors.borderColor : Colors.primaryColor,
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                  }}
                  containerStyle={{
                    flexDirection: 'row',
                    padding: 0,
                    alignItems: 'center',
                    marginHorizontal: 6,
                  }}>
                  <Tick
                    style={{
                      color: checked == 1 ? Colors.White : Colors.buttonColor,
                    }}
                  />
                </CheckboxField>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSubscription();
            }}>
            <PrimaryButton
              text={checked == 0 ? 'Try free and subscribe' : 'Subscribe'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // cancelSubscription();
            }}
            style={{
              marginTop: 16,
              marginBottom:
                Platform.OS === 'ios' && insets.bottom > 0
                  ? insets.bottom
                  : Platform.OS === 'ios' && insets.bottom == 0
                  ? 16
                  : 16,
            }}>
            <Text style={{color: '#C3C0DE', fontFamily: 'Outfit-Regular'}}>
              Cancel any time in the App Store
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 25,
            top: Platform.OS === 'ios' ? insets.top + 8 : 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.setItem(
                'screen-navigation',
                JSON.stringify({
                  onBoardinding: true,
                  onBoardingScreen: 'ThanksForJoining',
                }),
              ).then(() => {
                navigation.navigate('ThanksForJoining');
              });
            }}>
            <Cross
              style={{
                color: Colors.dark,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    position: 'relative',
  },
  SubscriptionButton: {
    borderColor: Colors.primaryColor,
    borderWidth: 4,
    borderRadius: 20,
    alignSelf: 'center',
    width: wp('92%'),
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 8,
  },
  withOutSubscriptionButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: Colors.buttonColor,
    alignSelf: 'center',
    width: wp('92%'),
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 8,
  },
});
