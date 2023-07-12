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
const MenuItem = () => {
  return (
    <View style={styles.ItemContainer}>
      <Text style={styles.ItemTitle}>Greek Salad </Text>
      <View style={styles.ItemDescriptionGroup}>
        <Text style={styles.ItemDescription}>
          The famous greek salad of crispy lettuce, peppers, olives and our
          Chicag...
        </Text>
        <Image
          source={require('../assets/GreekSalad.png')}
          style={styles.ItemImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.ItemPrice}> $12.99 </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ItemTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  ItemDescriptionGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  ItemDescription: {
    width: '55%',
    fontSize: 18,
    color: '#646f64',
  },

  ItemImage: {
    width: 140,
    height: 180,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  ItemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#646f64',
  },
});
export default MenuItem;
