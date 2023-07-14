import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'littleLemon.db',
  location: 'default',
});

export const createTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS menu_item (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price FLOAT, description TEXT, image TEXT, category TEXT)',
        [],
        (tx, results) => {
          // console.log('Table created successfully');
          resolve();
        },
        error => {
          console.log('Error creating table:', error);
          reject(error);
        },
      );
    });
  });
};
export const DeleteAllData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE from menu_item',
        [],
        (tx, results) => {
          //console.log('Table data deleted successfully');
          resolve();
        },
        error => {
          console.log('Error delete table data:', error);
          reject(error);
        },
      );
    });
  });
};
export const InsertDataSQLite = async data => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO menu_item (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
        data,
        (tx, results) => {
          // console.log('Data inserted successfully');
          resolve();
        },
        error => {
          console.log('Error inserting data:', error);
          reject(error);
        },
      );
    });
  });
};
export const getDataSQLite = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM menu_item',
        [],
        (tx, results) => {
          const rows = results.rows.raw();
          //console.log('Data retrieved successfully:', rows);
          resolve(rows);
        },
        error => {
          console.log('Error retrieving data:', error);
          reject(error);
        },
      );
    });
  });
};
