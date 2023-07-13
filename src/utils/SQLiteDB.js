import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'littleLemon.db',
  location: 'default',
});
{
    "name": "Greek Salad",
    "price": 12.99,
    "description": "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.",
    "image": "greekSalad.jpg",
    "category": "starters"
  },
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menu_item (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price FLOAT, description TEXT, image TEXT, category TEXT)',
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table:', error);
      },
    );
  });
};

export const InsertData = (data) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO mytable (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
      data,
      (tx, results) => {
        console.log('Data inserted successfully');
      },
      error => {
        console.log('Error inserting data:', error);
      },
    );
  });
};

export const getData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM menu_item',
      [],
      (tx, results) => {
        const rows = results.rows.raw();
        console.log('Data retrieved successfully:', rows);
      },
      error => {
        console.log('Error retrieving data:', error);
      },
    );
  });
};
