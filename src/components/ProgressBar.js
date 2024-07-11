import ProgressBar from 'react-native-progress/Bar';
import {Colors} from '../constants/Colors';

const Progressbar = ({color, unfilledColor, progressBarValue}) => {
  return (
    <ProgressBar
      progress={progressBarValue}
      width={170}
      height={12}
      color={color ? color : Colors.White}
      innerRadius={100}
      borderWidth={0}
      unfilledColor={unfilledColor ? unfilledColor : 'rgba(255, 255, 255, 0.2)'}
    />
  );
};

export default Progressbar;
// 00}
