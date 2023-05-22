import { View, Text, Button, TextInput, ActivityIndicator } from "react-native"
import { useCallback, useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list"
import tw from 'twrnc';
import { useQueryClient, useQuery, useInfiniteQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";

import ContactItem from "../Components/ContactItem"

import { db } from "../db";


interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark?: string
    setDataState: () => void
}

const fetchingPromise = (args = []) => {
    //DECLARE @PageNumber AS INT DECLARE @RowsOfPage AS INT SET @PageNumber = 1 SET @RowsOfPage = 2 SELECT * FROM contact OFFSET (@PageNumber-1)*@RowsOfPage ROWS
    return new Promise((resolve, reject) => { 
        db.exec([{
            sql: "SELECT * FROM contact", args}
        ], false, (err,res) => {
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
            return res[0]["rows"]
        })
        .catch(err => console.log("error:", err))
}

const HomeScreen = () => {

    const navigation = useNavigation()
    const queryClient = useQueryClient();

    queryClient.invalidateQueries({queryKey: ["fetchContact"]});

    const {isLoading,isSuccess, isError, data, error} = useQuery("fetchContact", fetchData);

    // const {
    //     data,
    //     error,
    //     isFetching,
    //     isFetchingNextPage,
    //     isFetchingPreviousPage,

    // } = useInfiniteQuery(["fetchContact"],async () => {
    //     const res = await fetchData();
    //     // console.log("this is res", res)
    //     return res
    // })

    // console.log(data?.pages, "this is pages")
    
    useEffect(
        () => {
            db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)'
                )
            })
        }

       
    ,[])

    if (isLoading) {
        return (
            <View style ={[tw`bg-[#212A3E] w-full h-full p-10`]}>
                <ActivityIndicator />
                <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
            </View>
        )
    }

    // if (isSuccess) {
    //     const setTodbObj = useCallback(() => {
    //         dbObj["dataArray"] = [...data]
    //     },[data,dbObj])
    //     setTodbObj();
    // }

    return (
        <View style={[tw`bg-[#212A3E] w-full h-full`]}>
            <FlashList  data={
                        data ? [...data] : [ {"name": "Test User", "phoneNumber": "093522453", "dateOfBirth": "2000-4-14", "remark": "remark (optional)"}]
                    }
                        renderItem={({item}) => {
                            return (
                                <ContactItem name={item?.name} phoneNumber={item.phoneNumber} id = {item.id}/>
                            )
                        }} 
                        estimatedItemSize={20}
                        extraData={data}
                        
            />

            {/* {data?.pages.map(page => (
               <>
                {page.map(data => (
                    
                ))}
               </>
            ))} */}
        </View>
    )   
}

export default HomeScreen;  

  