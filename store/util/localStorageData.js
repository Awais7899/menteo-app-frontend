import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAppSettings} from '../AppSettings';
import {updateIntroQuestion} from '../GetIntroQuestion';
import {getQuestionNo, updateQuestionData} from '../OnBoardingQuiz';
import {updateUserData} from '../userSlice';
import {userAppData} from '../UserDataSlice';
import {fetch} from '@react-native-community/netinfo';

export const getLocalStorageData = async (data, setIsLoading, dispatch) => {
  try {
    const settingResponse = await AsyncStorage.getItem('app-settings');
    const appSettings = JSON.parse(settingResponse);
    const quizResponse = await AsyncStorage.getItem('quiz-questions');
    const quizQuestions = JSON.parse(quizResponse);
    dispatch(updateQuestionData(quizQuestions));
    dispatch(updateAppSettings(appSettings));
    const userResponse = await AsyncStorage.getItem('user-data');
    const userData = JSON.parse(userResponse);
    dispatch(updateUserData(userData));
    if (
      data.onBoardingScreen === 'OnBoardingScreen2' ||
      data.onBoardingScreen === 'OnBoardingScreen3' ||
      data.onBoardingScreen === 'OnBoardingScreen4' ||
      data.onBoardingScreen === 'OnBoardingScreen5' ||
      data.onBoardingScreen === 'OnBoardingScreen6' ||
      data.onBoardingScreen === 'OnBoardingScreen7' ||
      data.onBoardingScreen === 'Subscription' ||
      data.onBoardingScreen === 'ThanksForJoining' ||
      data.onBoardingScreen === 'BottomTabBar'
    ) {
      if (userData.token) {
        const headers = {
          Authorization: `Bearer ${userData.token}`,
        };
        fetch()
          .then(state => {
            if (state.isConnected) {
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
            console.log('error', err);
          });
      }
      const introResponse = await AsyncStorage.getItem('intro-questions');
      const introQuestions = JSON.parse(introResponse);
      dispatch(updateIntroQuestion(introQuestions));
      if (data.onBoardingScreen === 'OnBoardingScreen7') {
        const questionNoResponse = await AsyncStorage.getItem(
          'quiz-questionNo',
        );
        if (questionNoResponse != null) {
          const questionNo = JSON.parse(questionNoResponse);
          dispatch(getQuestionNo(questionNo));
        }
      }
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
