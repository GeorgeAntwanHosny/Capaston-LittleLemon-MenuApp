import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import {filterDataSQLite} from '../utils/SQLiteDB';
import {debounce} from 'lodash';
import SearchIcon from './SearchIcon';

const HomeHeader = ({setData}) => {
  const handelFilter = async filter => {
    setData(await filterDataSQLite(filter));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handler = React.useCallback(
    debounce(text => {
      handelFilter(text);
    }, 500),
    [],
  );

  const onChange = text => {
    // perform any event related action here
    // console.log(text);
    handler(text);
  };

  return (
    <View>
      <View style={styles.heroSection}>
        <Text style={styles.heroSectionTitle}>Little Lemon</Text>
        <Text style={styles.heroSectionTileBottom}>Chicago</Text>
        <View style={styles.groupDescription}>
          <Text style={styles.heroSectionDescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          <Image
            style={styles.heroSectionImage}
            source={require('../assets/Heroimage.png')}
            resizeMode="contain"
          />
        </View>
        {/* <SvgXml width="200" height="200" xml={svg_search_icon} /> */}
        <View style={[styles.inputSearchGroup, styles.heroSectionTextInput]}>
          <SearchIcon />
          <TextInput
            placeholder="Search by category"
            onChangeText={onChange}
            keyboardAppearance="default"
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.OrderDeleiveryGroup}>
        <Text style={styles.OrderDeleiveryTitle}>ORDER DELVIEER NOW</Text>
        <View style={styles.OrderDeleiveryGroupButton}>
          <Pressable
            style={styles.OrderDeleiveryButton}
            onPress={() => handelFilter('starters')}>
            <Text style={styles.OrderDeleiveryTextButton}>Starters</Text>
          </Pressable>
          <Pressable
            style={styles.OrderDeleiveryButton}
            onPress={() => handelFilter('mains')}>
            <Text style={styles.OrderDeleiveryTextButton}>Mains</Text>
          </Pressable>
          <Pressable
            style={styles.OrderDeleiveryButton}
            onPress={() => handelFilter('desserts')}>
            <Text style={styles.OrderDeleiveryTextButton}>Desserts</Text>
          </Pressable>
          <Pressable
            style={styles.OrderDeleiveryButton}
            onPress={() => handelFilter('drinks')}>
            <Text style={styles.OrderDeleiveryTextButton}>Drinks</Text>
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
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#646f64',
    color: 'white',
    padding: 15,
    gap: 5,
  },
  heroSectionTitle: {
    color: 'yellow',
    fontSize: 30,
    fontWeight: 'bold',
  },
  heroSectionImage: {
    width: 170,
    height: 300,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
  },
  heroSectionTileBottom: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  groupDescription: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 15,
    gap: 6,
  },
  heroSectionDescription: {
    width: '50%',
    fontSize: 17,
    color: 'white',
    paddingTop: 15,
  },
  inputSearchGroup: {
    display: 'flex',
    flexDirection: 'row',
    height: 60,
  },
  heroSectionTextInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 5,
    width: '100%',

    backgroundColor: 'white',
  },
  OrderDeleiveryGroup: {
    padding: 10,
    backgroundColor: 'white',
  },
  OrderDeleiveryTitle: {
    fontSize: 25,
    color: '#646f64',
  },
  OrderDeleiveryGroupButton: {
    display: 'flex',
    flexDirection: 'row',
  },
  OrderDeleiveryButton: {
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: '#f3f3f3',
    color: '#646f64',
    borderColor: '#e9e9e9',
    borderWidth: 1,

    marginVertical: 15,
    width: '24%',
    textAlign: 'center',
    padding: 10,
    marginRight: 5,
  },
  OrderDeleiveryTextButton: {
    textAlign: 'center',
    color: '#646f64',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export default HomeHeader;
