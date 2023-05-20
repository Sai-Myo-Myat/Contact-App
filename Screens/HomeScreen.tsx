import { View, Text, Button, TextInput, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list"
import tw from 'twrnc';
import { Query, useQuery } from "react-query";

import ContactItem from "../Components/ContactItem"

import { db } from "../db";
import { Retryer } from "react-query/types/core/retryer";

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark?: string
}


const HomeScreen = ({ navigation }) => {

    const {dataState, setDataState} = useState<InputType[]>([])


    const fetchingPromise = (args = []) => {
        return new Promise((resolve, reject) => {
            db.exec([{sql: "SELECT * FROM contact", args}], false, (err,res) => {
                if(err) {
                    return reject(err)
                }

                return resolve(res)
            })
        })
    }

    const fetchData =  async () => {
        return fetchingPromise()
            .then(res => {
                // console.log(res[0]["rows"], "from promise")
                return res[0]["rows"]
            })
            .catch(err => console.log(err, "this is error heee"))
    }

    const {isLoading, isError, data, error} = useQuery("fetchAllContact", fetchData, {
        refetchOnWindowFocus: true,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 0,
      })

      console.log(data, "secondData")

    useEffect(
        () => {
            db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)'
                )
            })
        }
        
       
    ,[data])

    if (isLoading) {
        return (
            <View style ={[tw`bg-[#212A3E] w-full h-full p-10`]}>
                <ActivityIndicator />
                <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
            </View>
        )
    }

    return (
        <View style={[tw`bg-[#212A3E] w-full h-full`]}>
            <FlashList  data={
                data ? [...data] : [ {"name": "Test User", "phoneNumber": "093522453", "dateOfBirth": "2000-4-14", "remark": "remark (optional)"}]
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