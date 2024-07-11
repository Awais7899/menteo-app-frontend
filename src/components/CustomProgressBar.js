import {View} from 'react-native';

const CustomProgressBar = ({
  height,
  value,
  containerWidth,
  progressContainerColor,
  progressColor,
  containerRadius,
}) => {
  return (
    <View
      style={{
        backgroundColor: progressContainerColor,
        width: containerWidth,
        height: height,
        borderRadius: containerRadius,
        overflow: 'hidden',
      }}>
      <View
        style={{
          backgroundColor: progressColor,
          width: `${value?.toFixed(0)}%`,
          height: '100%',
          borderRadius: value > 20 ? 4 : 4,
        }}></View>
    </View>
  );
};

export default CustomProgressBar;
