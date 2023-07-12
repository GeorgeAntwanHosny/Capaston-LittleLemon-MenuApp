import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {getData} from '../utils/asyncStorage';
import {useNavigation} from '@react-navigation/native';

const HeaderProfile = () => {
  const [imageProfileUri, setImageProfileUri] = React.useState('');
  const navigation = useNavigation();
  const getSaveImageUri = async () => {
    const userDataStorage = await getData('userData');
    setImageProfileUri(
      userDataStorage.imageProfileUri === '' ||
        userDataStorage.imageProfileUri === null ||
        userDataStorage.imageProfileUri === undefined
        ? ''
        : userDataStorage.imageProfileUri,
    );
  };
  useEffect(() => {
    getSaveImageUri();
  }, []);
  return (
    <View style={styles.headerWrapper}>
      <Image
        resizeMode="contain"
        style={styles.imageLogo}
        source={require('../assets/Logo.png')}
      />
      <Pressable
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          resizeMode="contain"
          style={styles.imageProfile}
          source={
            imageProfileUri === '' ||
            imageProfileUri === null ||
            imageProfileUri === undefined
              ? require('../assets/Profile.png')
              : {
                  uri: imageProfileUri,
                }
          }
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    display: 'flex',
    margin: 10,
    gap: 50,
  },
  imageLogo: {
    width: 200,
    height: 60,
  },

  imageProfile: {
    width: 80,
    height: 80,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10,
  },
});
export default HeaderProfile;
