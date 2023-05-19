import { View, Text, Button, TextInput } from "react-native"
import { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list"
import tw from 'twrnc';
import { useQuery } from "react-query";

import ContactItem from "../Components/ContactItem"

import { db } from "../db";

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
    remark?: string
}

const HomeScreen = ({ navigation }) => {

    // const [data,setData] = useState<InputType[]>([])

    const fetchAllContact = () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM contact', [],
            (_txObj, { rows: { _array } }) => console.log("data:", _array),
            (_txObj, error) => console.log("error: ", error)
        )})
      }
    useEffect(
        () => {
            db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)'
                )
            })
        }
    ,[])

    const {isLoading,isError, data, error} = useQuery("fetchAllContact", fetchAllContact)

    if (isLoading) {
        return (
            <View style={[tw`bg-[#212A3E] w-full h-full`]}>
                <Text>Loading ......</Text>
            </View>
        )
    }

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