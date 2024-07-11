import ProgressBar from 'react-native-progress/Bar';
import {Colors} from '../constants/Colors';
import {TouchableOpacity, View} from 'react-native';
import Cross from '../assets/cross.svg';

const SegmentedProgressBar = ({progressd, learnings, width, setResult}) => {
  const progressBarWith = (width - 40) / learnings?.length;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
        width: width,
      }}>
      <TouchableOpacity
        onPress={() => {
          setResult(true);
        }}
        style={{
          width: '10%',
        }}>
        <Cross style={{color: Colors.dark}} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {learnings &&
          learnings?.map((item, index) => {
            return (
              <View key={index} style={{paddingHorizontal: 2}}>
                <ProgressBar
                  progress={progressd[index]}
                  height={6}
                  width={progressBarWith - 4}
                  color={Colors.primaryColor}
                  borderWidth={0}
                  unfilledColor={Colors.buttonColor}
                />
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default SegmentedProgressBar;
