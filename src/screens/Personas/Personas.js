import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {Colors} from '../../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Persona from '../../components/Persona';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
function Personas() {
  const insets = useSafeAreaInsets();
  const [loadingId, setLoadingId] = useState();

  const personas = [
    {
      id: 1,
      name: 'Andrew Tate',
      avatar: require('../../assets/persona-1.png'),
      profession: 'Influencer',
      is_premium: 0,
      status: 'completed',
    },
    {
      id: 2,
      name: 'Margot Robbie',
      avatar: require('../../assets/persona-3.png'),
      profession: 'Actress',
      is_premium: 0,
      status: 'pending',
    },

    {
      id: 3,
      name: 'Donald Trump',
      avatar: require('../../assets/persona-2.png'),
      profession: 'Politician',
      is_premium: 0,
      status: 'pending',
    },
    {
      id: 4,
      name: 'Helena Bonham Carter',
      avatar: require('../../assets/persona-3.png'),
      profession: 'Actress',
      is_premium: 1,
      status: 'pending',
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: '92%',
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: Platform.OS === 'ios' ? insets.top + 12 : 18,
              marginBottom: 12,
            }}>
            <Text
              style={{
                color: Colors.dark,
                fontSize: 24,
                fontFamily: 'Outfit-Bold',
              }}>
              Celebs
            </Text>
          </View>
        </View>
        <FlatList
          overScrollMode="never"
          data={personas}
          renderItem={({item, index}) => {
            return (
              <View index={index}>
                <Persona
                  name={item.name}
                  image={item.avatar}
                  profession={item.profession}
                  locked={item.is_premium == 1 ? true : false}
                  id={item.id}
                  loadingId={loadingId}
                  setLoadingId={setLoadingId}
                />
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

export default Personas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.White,
  },
});

{
  /* <Persona
name={'Margot Robbie'}
image={require('../../assets/girl.png')}
profession={'Actress'}
/>
<Persona
name={'Donald Trump'}
image={require('../../assets/trump.png')}
profession={'Politician'}
/>
<Persona
name={'Helena Bonham Carter'}
image={require('../../assets/girl.png')}
profession={'Actress'}
/>
<View
style={{
  opacity: 0.5,
}}>
<Persona
  name={'Helena Bonham Carter'}
  image={require('../../assets/girl.png')}
  profession={'Actress'}
  locked={true}
/>
</View> */
}
