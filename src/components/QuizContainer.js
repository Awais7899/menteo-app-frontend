import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Colors} from '../constants/Colors';
import SecondaryHeading from '../components/SecondaryHeading';
import ButtonText from '../components/ButtonText';
import QuizQuestion from '../components/QuizQuestion';
import {useSelector} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FILE_URL} from '@env';
import Video from 'react-native-video';
import Toast from 'react-native-simple-toast';
import {makeApiRequest} from '../Axios/ApiRequests';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {fetch} from '@react-native-community/netinfo';
import InternetConnection from './InternetConnection';

const DisplayContainer = ({handleSelection, select, setResult}) => {
  const quiz = useSelector(state => state.quiz);
  const [loading, setLoading] = useState(false);
  const user_data = useSelector(state => state.user);
  const [fileState, setFileState] = useState(true);
  const [netWorkState, setNetWorkState] = useState(true);

  const checkFileType = type => {
    const fileType = type.split('/')[0];
    return fileType;
  };

  const SubmitAwnser = async () => {
    fetch()
      .then(async state => {
        setNetWorkState(state.isConnected);
        if (state.isConnected) {
          if (select) {
            const data = {
              question_option_id: select,
            };
            const headers = {
              Authorization: `Bearer ${user_data.data.token}`,
            };
            setLoading(true);
            try {
              const response = await makeApiRequest(
                'save-question-answer',
                'post',
                data,
                headers,
              );
              setLoading(false);
              if (response.success) {
                setResult(true);
              }
            } catch (error) {
              setLoading(false);
              Toast.show(error.message);
            }
          } else {
            Toast.show('Tap to select one of them!');
          }
        }
      })
      .catch(err => {
        console.warn('ERRPR', err);
      });
  };

  if (!netWorkState) {
    return <InternetConnection setNetWorkState={setNetWorkState} />;
  }
  return (
    <View style={styles.displayContainer}>
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 24,
            marginBottom: 12,
          }}>
          <SecondaryHeading
            text={quiz.data?.data[quiz.questionNo]?.title}
            fontFamily={'Outfit-SemiBold'}
            font={22}
          />
        </View>
        {quiz.data.data[quiz.questionNo].file != null && (
          <View style={{alignSelf: 'center'}}>
            {checkFileType(quiz.data.data[quiz.questionNo].file_type) ===
            'image' ? (
              <>
                {fileState && Platform.OS === 'android' && (
                  <SkeletonPlaceholder borderRadius={16}>
                    <SkeletonPlaceholder.Item width={wp('80%')} height={190} />
                  </SkeletonPlaceholder>
                )}
                <Image
                  source={{
                    uri: `${FILE_URL}${quiz.data.data[quiz.questionNo].file}`,
                  }}
                  style={{
                    height: 190,
                    width: wp('80%'),
                    borderRadius: 16,
                    display:
                      fileState && Platform.OS === 'android' ? 'none' : 'flex',
                  }}
                  resizeMode="cover"
                  onLoadStart={() => {
                    setFileState(true);
                    console.log('START');
                  }}
                  onLoadEnd={() => {
                    setFileState(false);
                    console.log('end');
                  }}
                  onError={() => {
                    setFileState(false);
                    console.log('ERROR');
                  }}
                />
              </>
            ) : (
              <>
                {fileState && (
                  <SkeletonPlaceholder borderRadius={16}>
                    <SkeletonPlaceholder.Item width={wp('80%')} height={190} />
                  </SkeletonPlaceholder>
                )}
                <Video
                  source={{
                    uri: `${FILE_URL}${quiz.data.data[quiz.questionNo].file}`,
                  }}
                  style={{
                    height: 190,
                    width: wp('80%'),
                    borderRadius: 16,
                    display: fileState ? 'none' : 'flex',
                  }}
                  resizeMode="cover"
                  repeat={true}
                  controls={false}
                  onLoadStart={() => {
                    setFileState(true);
                  }}
                  onLoad={() => {
                    setFileState(false);
                  }}
                />
              </>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 20,
              marginBottom: 40,
            }}>
            {quiz.data.data &&
              quiz.data.data[quiz.questionNo].options.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => {
                      handleSelection(item.id);
                    }}>
                    <QuizQuestion
                      buttonText={item.title}
                      selected={select}
                      itemId={item.id}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          SubmitAwnser();
        }}>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator color={Colors.White} animating={loading} />
          ) : (
            <ButtonText text={'Continue'} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    width: '95%',
    height: Platform.OS === 'ios' ? '84%' : '85%',
    backgroundColor: Colors.White,
    borderRadius: 30,
    elevation: 5,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  buttonContainer: {
    backgroundColor: Colors.primaryColor,
    alignSelf: 'center',
    width: '90%',
    padding: 13,
    bottom: 12,
    borderRadius: 30,
  },
});

export default DisplayContainer;
