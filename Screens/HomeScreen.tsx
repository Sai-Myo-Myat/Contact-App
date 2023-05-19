import { View, Text, Button, TextInput, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list"
import tw from 'twrnc';
import { useQuery } from "react-query";

import ContactItem from "../Components/ContactItem"

import { db } from "../db";

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark?: string
}

const HomeScreen = ({ navigation }) => {

    const [dataState,setDataState] = useState<InputType[]>([])
  
    const fetchAllContact = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM contact', [],
            (_txObj, { rows: { _array } }) => console.log("data:", _array),
            (_txObj, error) => console.log("error: ", error)
        )})
      }

    const {isLoading, isError, data, error} = useQuery("fetchAllContact", fetchAllContact)

    useEffect(
        () => {
            db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)'
                )
            })
            setDataState(data ? data : [])
        }
       
    ,[])

    if (isLoading) {
        return (
            <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
                <ActivityIndicator />
                <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
            </View>
        )
    }

    return (
        <View style={[tw`bg-[#212A3E] w-full h-full`]}>
            <FlashList  data={
                dataState.length > 0 ? [...dataState] : [ {"name": "Test User", "phoneNumber": "093522453", "dateOfBirth": "2000-4-14", "remark": "remark (optional)"}]
            }
                renderItem={({item}) => {
                    return (
                        <ContactItem name={item?.name} phoneNumber={item.phoneNumber}/>
                    )
                }} 
                estimatedItemSize={20}
            />
        </View>
    )   
}

export default HomeScreen;  

// [
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
//     {"name": "mgmg", "phoneNumber": "093522453", "dateOfBirth": "2345-34-34", "remark": "adsfadfadsf"},
// ]   