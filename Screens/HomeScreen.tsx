import { View, Text, Button, TextInput } from "react-native"
import { useEffect } from "react";

import { FlashList } from "@shopify/flash-list"


import ContactItem from "../Components/ContactItem"

import tw from 'twrnc';

import { db } from "../db";


const HomeScreen = ({ navigation }) => {
    const fetchData = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM contact', [],
            (_txObj, { rows: { _array } }) => {console.log({data: _array}, "this is from db")},
            (_txObj, error) => {console.log("Error", error)}
        )})
      }
    useEffect(
        () => {
            db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)'
                )
            })
            fetchData()
        }
    ,[])
    return (
        <View style={[tw`bg-[#212A3E] w-full h-full`]}>
            <FlashList  data={
                [
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                    {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
                ]   
                }
                renderItem={({item}) => {
                    return (
                        <ContactItem name={item.name} phoneNumber={item.phoneNumber}/>
                    )
                }} 
                estimatedItemSize={20}
        />
        </View>
    )   
}

export default HomeScreen;  