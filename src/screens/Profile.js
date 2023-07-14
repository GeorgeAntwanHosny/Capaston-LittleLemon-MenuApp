import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData, Logout, storeData} from '../utils/asyncStorage';
import {validateEmail} from '../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {launchImageLibrary} from 'react-native-image-picker';
import MaskTextInput from 'react-native-mask-text';

const Profile = ({navigation}) => {
  const [load, setLoad] = useState(true);
  const [email, setEmail] = React.useState('');
  const [validFristName, setValidFristName] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);
  const [fristName, setFristName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [validPhoneNumber, setValidPhoneNumber] = React.useState(false);
  const [validLastName, setValidLastName] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [imageProfileUri, setImageProfileUri] = useState('');
  const [emailNotifactions, setEmailNotifications] = useState({
    orderStatus: true,
    passwordChanges: true,
    spectialOffers: true,
    newsLetter: true,
  });
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
  const onChangeLastName = e => {
    setLastName(e);
    if (validateEmail(e)) {
      setValidLastName(true);
    } else {
      setValidLastName(false);
    }
  };
  const onChangePhoneNumber = e => {
    setPhoneNumber(e);
    if (e !== '') {
      setValidPhoneNumber(true);
    } else {
      setValidPhoneNumber(false);
    }
  };
  const handleImagePicked = response => {
    if (response.didCancel) {
      // The user canceled the image picker.
    } else if (response.error) {
      setImageProfileUri('');
    } else {
      // The user picked an image.
      setImageProfileUri(response.assets[0].uri);
    }
  };
  const LogoutButton = () => {
    Alert.alert('', 'are you sure, you want to logout?', [
      {
        text: 'OK',
        onPress: () => {
          Logout();
          //navigation.push('Onboarding');
          navigation.reset({
            index: 0,
            routes: [{name: 'Onboarding'}],
          });
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };
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
  const SaveChanges = async () => {
    Alert.alert('', 'are you sure, to update your profile?', [
      {
        text: 'OK',
        onPress: async () => {
          await storeData('userData', {
            fristName,
            email,
            lastName,
            phoneNumber,
            emailNotifactions,
            imageProfileUri,
          });
          navigation.navigate('Home');
        },
      },
      {
        text: 'Cancel',
      },
    ]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const userDataStorage = await getData('userData');
      setFristName(userDataStorage.fristName);
      setEmail(userDataStorage.email);
      setLastName(
        userDataStorage.lastName === null ? '' : userDataStorage.lastName,
      );
      setPhoneNumber(
        userDataStorage.phoneNumber === null ? '' : userDataStorage.phoneNumber,
      );
      setImageProfileUri(
        userDataStorage.imageProfileUri === '' ||
          userDataStorage.imageProfileUri === null
          ? ''
          : userDataStorage.imageProfileUri,
      );
      userDataStorage.emailNotifactions === undefined
        ? ''
        : setEmailNotifications(userDataStorage.emailNotifactions);

      setLoad(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ScrollView style={styles.mainWraper}>
      {load ? (
        <Text>Loading....</Text>
      ) : (
        <View>
          {/* <Text>Frist Name: {userData.fristName}</Text>
          <Text>EMail: {userData.email}</Text> */}
          <Text style={styles.textHeader}>Personal Information</Text>
          <View style={styles.actionWraper}>
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

            <Pressable
              style={styles.buttonNotValid}
              onPress={() =>
                launchImageLibrary(
                  {
                    mediaType: 'photo',
                    quality: 0.8,
                    allowsEditing: true,
                    allowsMultipleSelection: false,
                  },
                  handleImagePicked,
                )
              }>
              <Text style={styles.textButton}>Change</Text>
            </Pressable>
            <Pressable style={styles.buttonInline} onPress={getSaveImageUri}>
              <Text style={styles.textButtonInline}>Remove</Text>
            </Pressable>
          </View>

          <View style={styles.formContainer}>
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
              <Text style={styles.textForm}>Last Name</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType="default"
                value={lastName}
                onChangeText={onChangeLastName}
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
            <View style={styles.formGroup}>
              <Text style={styles.textForm}>Phone Number</Text>
              <TextInput
                style={styles.inputStyle}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={onChangePhoneNumber}
              />
            </View>
            <View>
              <Text style={styles.titleText}>Email Notifications</Text>
              <View>
                <BouncyCheckbox
                  isChecked={emailNotifactions.orderStatus}
                  style={styles.groupCheckBoxes}
                  textStyle={styles.checkBoxText}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="Order Statuses"
                  iconStyle={styles.checkBoxIconStyle}
                  innerIconStyle={styles.checkInnerIconStyle}
                  onPress={() => {
                    setEmailNotifications(prevState => ({
                      ...prevState,
                      orderStatus: !prevState.orderStatus,
                    }));
                  }}
                />
                <BouncyCheckbox
                  isChecked={emailNotifactions.passwordChanges}
                  style={styles.groupCheckBoxes}
                  textStyle={styles.checkBoxText}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="Password Changes"
                  iconStyle={styles.checkBoxIconStyle}
                  innerIconStyle={styles.checkInnerIconStyle}
                  onPress={() => {
                    setEmailNotifications(prevState => ({
                      ...prevState,
                      passwordChanges: !prevState.passwordChanges,
                    }));
                  }}
                />
                <BouncyCheckbox
                  isChecked={emailNotifactions.spectialOffers}
                  style={styles.groupCheckBoxes}
                  textStyle={styles.checkBoxText}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="Spacial Offers"
                  iconStyle={styles.checkBoxIconStyle}
                  innerIconStyle={styles.checkInnerIconStyle}
                  onPress={() => {
                    setEmailNotifications(prevState => ({
                      ...prevState,
                      spectialOffers: !prevState.spectialOffers,
                    }));
                  }}
                />
                <BouncyCheckbox
                  isChecked={emailNotifactions.newsLetter}
                  style={styles.groupCheckBoxes}
                  textStyle={styles.checkBoxText}
                  size={30}
                  fillColor="green"
                  unfillColor="#FFFFFF"
                  text="NewsLetter"
                  iconStyle={styles.checkBoxIconStyle}
                  innerIconStyle={styles.checkInnerIconStyle}
                  onPress={() => {
                    setEmailNotifications(prevState => ({
                      ...prevState,
                      newsLetter: !prevState.newsLetter,
                    }));
                  }}
                />
              </View>
            </View>
            <View>
              <Pressable style={styles.logoutButton} onPress={LogoutButton}>
                <Text style={styles.textButtonLogout}>Logout</Text>
              </Pressable>
              <View style={[styles.actionWraper, {paddingRight: 20}]}>
                <Pressable
                  style={[styles.buttonInlineForChanges]}
                  onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.textButtonInline}>Discard Changes</Text>
                </Pressable>
                <Pressable
                  style={styles.buttonNotValidForChanges}
                  onPress={SaveChanges}>
                  <Text style={styles.textButton}>Save Changes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  groupCheckBoxes: {
    padding: 10,
  },
  checkBoxText: {
    textDecorationLine: 'none',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  checkBoxIconStyle: {borderColor: 'grey'},
  checkInnerIconStyle: {borderWidth: 2, borderRadius: 10},
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
    padding: 10,
  },
  mainWraper: {
    backgroundColor: 'white',
  },
  actionWraper: {
    flexDirection: 'row',

    //margin: 10,
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  textHeader: {
    fontSize: 25,
    padding: 15,
  },
  buttonNotValid: {
    paddingTop: 10,

    borderRadius: 10,
    backgroundColor: 'grey',
    marginVertical: 30,
    width: 100,
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  buttonInline: {
    paddingTop: 10,
    borderColor: 'grey',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 30,
    width: 100,
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  buttonNotValidForChanges: {
    borderRadius: 10,
    backgroundColor: 'grey',
    marginVertical: 8,
    width: '50%',
    textAlign: 'center',
    padding: 15,
  },
  buttonInlineForChanges: {
    //paddingTop: 10,
    borderColor: 'grey',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 8,
    width: '50%',
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  logoutButton: {
    paddingTop: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.8,
    color: 'black',
    backgroundColor: 'gold',
    marginVertical: 30,
    width: '100%',
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  textButtonLogout: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  textButtonInline: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 15,
  },
  formContainer: {
    padding: 10,
  },
  textForm: {
    fontSize: 15,
    paddingVertical: 10,
  },
  formGroup: {
    padding: 10,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
});
export default Profile;
