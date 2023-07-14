import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuItem from '../components/MenuItem';
import HomeHeader from '../components/HomeHeader';
import {
  createTable,
  DeleteAllData,
  getDataSQLite,
  InsertDataSQLite,
} from '../utils/SQLiteDB';
import {Text} from 'react-native-svg';
const Home = () => {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
        );
        const jsonData = await data.json();
        console.log('from fetch data');
        setMenuData(jsonData.menu);
        for (let i = 0; i < jsonData.menu.length; i++) {
          InsertDataSQLite([
            jsonData.menu[i].name,
            jsonData.menu[i].price,
            jsonData.menu[i].description,
            jsonData.menu[i].image,
            jsonData.menu[i].category,
          ]);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const getFromSQLiteDB = async () => {
      try {
        // await DeleteAllData();
        await createTable();
        const data = await getDataSQLite();
        console.log('Retrieved data test:', data.length);
        data.length > 0 ? setMenuData(data) : fetchData();
      } catch (error) {
        console.log('Error:', error);
      }
    };

    getFromSQLiteDB();
  }, []);
  const Separator = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={menuData}
        renderItem={({item}) => {
          console.log(item);
          return (
            <MenuItem
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              category={item.category}
            />
          );
        }}
        keyExtractor={item => item.name}
        ListHeaderComponent={<HomeHeader setData={setMenuData} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
  },
});
export default Home;
