import * as SQLite from 'expo-sqlite'


export const db = SQLite.openDatabase("Contact.db")

export let  dbObj = {
    dataArray:[]
}