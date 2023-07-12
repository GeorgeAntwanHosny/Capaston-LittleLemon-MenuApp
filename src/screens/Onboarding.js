import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {validateEmail} from '../utils';
import {storeData} from '../utils/asyncStorage';
const Onboarding = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [validFristName, setValidFristName] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);

  const [fristName, setFristName] = React.useState('');
  const onChangeEmail = e => {
    setEmail(e);
    if (validateEmail(e)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const onChangeFristName = e => {
    setFristName(e);
    if (e !== '') {
      setValidFristName(true);
    } else {
      setValidFristName(false);
    }
  };
  const onPressSubmit = () => {
    if (validEmail && validFristName) {
      Alert.alert('sucess', 'Thanks for Subscribing stay tuned!', [
        {
          text: 'OK',
          onPress: async () => {
            await storeData('userData', {
              fristName,
              email,
            });
            navigation.navigate('Profile');
          },
        },
      ]);
    } else if (!validEmail) {
      Alert.alert('error', "Plase, check your Email isn't correct", [
        {text: 'OK'},
      ]);
    } else {
      Alert.alert('error', "Plase, check your Frist Name isn't correct", [
        {text: 'OK'},
      ]);
    }
  };
  return (
    <View>
      <ScrollView>
        <View>
          <Image
            style={styles.logoImage}
            resizeMode="contain"
            source={require('../assets/Logo.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Let Us get to Know you</Text>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Frist Name</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType="default"
              value={fristName}
              onChangeText={onChangeFristName}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.textForm}>Email</Text>
            <TextInput
              style={styles.inputStyle}
              keyboardType="email-address"
              value={email}
              onChangeText={onChangeEmail}
            />
          </View>
        </View>
        <View>
          <Pressable style={styles.buttonNotValid} onPress={onPressSubmit}>
            <Text style={styles.textButton}>Next</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEFEE',
  },
  headerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  headerText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 25,
  },

  logoImage: {
    height: 100,
    width: 250,
    alignSelf: 'center',
  },
  formContainer: {
    padding: 20,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e3e3',
  },
  textForm: {
    fontSize: 20,
    paddingVertical: 20,
  },
  formGroup: {
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
  },

  buttonNotValid: {
    paddingTop: 10,
    alignSelf: 'flex-end',
    borderRadius: 10,
    backgroundColor: 'grey',
    marginVertical: 30,
    width: 150,
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    width: 280,
  },
});

export default Onboarding;
