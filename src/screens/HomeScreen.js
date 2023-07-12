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
const Home = () => {
  return (
    <View>
      <View style={styles.heroSection}>
        <Text style={styles.heroSectionTitle}>Title</Text>
        <Text style={styles.heroSectionTileBottom}>Titlesdown</Text>
        <View style={styles.heroSectionDescription}>
          <Text>Description</Text>
          <Image
            style={styles.heroSectionImage}
            source={require('../assets/Heroimage.png')}
            resizeMode="contain"
          />
        </View>
        <TextInput style={styles.heroSectionTextInput} />
      </View>
      <View>
        <Text style={styles.OrderDeleiveryTitle}>ORDER DELVIEER NOW.</Text>
        <View style={styles.OrderDeleiveryGroupButton}>
          <Pressable style={styles.OrderDeleiveryButton}>
            <Text style={styles.OrderDeleiveryTextButton}>Change</Text>
          </Pressable>
          <Pressable style={styles.OrderDeleiveryButton}>
            <Text style={styles.OrderDeleiveryTextButton}>Change</Text>
          </Pressable>
          <Pressable style={styles.OrderDeleiveryButton}>
            <Text style={styles.OrderDeleiveryTextButton}>Change</Text>
          </Pressable>
          <Pressable style={styles.OrderDeleiveryButton}>
            <Text style={styles.OrderDeleiveryTextButton}>Change</Text>
          </Pressable>
          <Pressable style={styles.OrderDeleiveryButton}>
            <Text style={styles.OrderDeleiveryTextButton}>Change</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerHeader: {
    display: 'flex',
   
  },
  heroSection:{
    display: 'flex',
    flexDirection: 'row',
     backgroundColor: 'green',
     color: 'white',
  },
  heroSectionTitle: {
    color:'yellow',
    fontSize: 30,
    fontWeight: 'bold',
  },
  heroSectionImage: {
     width:200,
     height:300,
     borderColor: 'grey',
     borderWidth:1,
     borderRadius:10
  },
  heroSectionTileBottom: {
     
    fontSize: 30,
    fontWeight: 'bold'
  },
  heroSectionDescription: {
    width: '50%',
    fontSize:18,
    
  },
  heroSectionTextInput:{
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  }
  OrderDeleiveryButton: {
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: 'grey',
    marginVertical: 30,
    width: 100,
    textAlign: 'center',
    padding: 15,
    marginRight: 20,
  },
  OrderDeleiveryTextButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
});
export default Home;
