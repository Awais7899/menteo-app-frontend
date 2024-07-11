import {View} from 'react-native';
import ButtonText from './ButtonText';
import {Colors} from '../constants/Colors';

const QuizQuestion = ({buttonText, selected, itemId}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor:
          selected === itemId ? Colors.primaryColor : Colors.borderColor,
        borderRadius: 32,
        marginVertical: 6,
        backgroundColor:
          selected === itemId ? Colors.primaryTransparent : Colors.White,
      }}>
      <ButtonText
        text={buttonText}
        color={Colors.dark}
        fontFamily={'Outfit-Regular'}
      />
    </View>
  );
};

export default QuizQuestion;
