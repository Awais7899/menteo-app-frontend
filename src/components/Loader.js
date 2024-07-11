import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '../constants/Colors';

const Loader = ({state}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primaryColor} animating={state} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
});

export default Loader;
