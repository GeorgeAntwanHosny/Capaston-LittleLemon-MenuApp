import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Onboarding from './Onboarding';
import Profile from './Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getData} from '../utils/asyncStorage';
import HeaderProfile from '../components/HeaderProfile';
import Home from './HomeScreen';
const Stack = createNativeStackNavigator();

const Splash = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userDataStorage = await getData('userData');
      if (userDataStorage !== null) {
        setAuth(true);
      } else {
        setAuth(false);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <View style={{paddingVertical: 30}}>
        <Image
          style={styles.logoImage}
          source={require('../assets/little-lemon-logo.png')}
          resizeMode="contain"
        />
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={auth ? 'Home' : 'Onboarding'}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: '',
              header: () => <HeaderProfile />,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: '',
              header: () => <HeaderProfile />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
const styles = StyleSheet.create({
  logoImage: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
export default Splash;
