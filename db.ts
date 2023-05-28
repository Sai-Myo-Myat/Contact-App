import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Contact.db');
console.log('opened database');
//
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)',
  );
});

export const getContactPromise = (idParam: number) => {
  return new Promise((resolve, _reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contact WHERE id=?',
        [idParam],
        (txObj, {rows: {_array}}) => resolve(_array),
        (_txObj, error: any) => error,
      );
    });
  });
};

export {db};
