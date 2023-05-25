import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Contact.db');
console.log('opened database');
//
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)',
  );
});

export {db};
