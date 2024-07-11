import {View, TouchableOpacity} from 'react-native';

import {fetch} from '@react-native-community/netinfo';
import SecondaryHeading from './SecondaryHeading';
import ButtonText from './ButtonText';
import PrimaryButton from './PrimaryButton';
import {Colors} from '../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {userAppData} from '../../store/UserDataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InternetConnection = ({setNetWorkState}) => {
  const user_data = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 24,
        marginHorizontal: 12,
        padding: 8,
      }}>
      <View
        style={{
          marginVertical: 8,
        }}>
        <SecondaryHeading text={'No Internet Connection!'} />
      </View>
      <View>
        <ButtonText
          text={
            'Your internet connection is down, please fix it and then you can continue using menteo'
          }
          color={Colors.modelText}
        />
      </View>
      <View
        style={{
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            fetch().then(state => {
              setNetWorkState(state.isConnected);
              if (state.isConnected) {
                AsyncStorage.getItem('screen-navigation')
                  .then(jsonValue => {
                    const value = JSON.parse(jsonValue);
                    if (
                      value != null &&
                      value.onBoardingScreen !== 'OnBoardingScreen23'
                    ) {
                      const headers = {
                        Authorization: `Bearer ${user_data?.data?.token}`,
                      };

                      dispatch(
                        userAppData({
                          endPoint: '/user',
                          method: 'post',
                          data: null,
                          headers: headers,
                        }),
                      );
                    }
                  })
                  .catch(err => {
                    console.warn(err);
                  });
              }
            });
          }}>
          <PrimaryButton text={'Try To Connect'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InternetConnection;
