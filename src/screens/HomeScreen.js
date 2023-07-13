import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import MenuItem from '../components/MenuItem';
import HomeHeader from '../components/HomeHeader';
const Home = () => {
  const [menuData, setMenuData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
        );
        const jsonData = await data.json();
        setMenuData(jsonData.menu);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

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
        ListHeaderComponent={HomeHeader}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Home;
