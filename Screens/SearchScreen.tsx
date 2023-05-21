import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

import tw from 'twrnc'
import { Feather } from "@expo/vector-icons"

import { dbObj } from "../db";

import { FlashList } from "@shopify/flash-list";
import ContactItem from "../Components/ContactItem"
import { useCallback, useEffect, useMemo, useState } from "react";

const SearchScreen = ({navigation}) => {

    // console.log(dbObj["dataArray"])
    let matchContact = []
    let {matchContactState, setMatchContactState} = useState()

    return (
        <View style={[tw`bg-[#212A3E] w-full h-full p-3`]}>
            <View style={[tw`flex-row items-center justify-around px-3 border-b border-[#394867]`]}>
                <TextInput 
                    style={[tw` text-lg p-2 m-3 flex-2`, styles.input]} 
                    placeholder="search.."
                    placeholderTextColor="#F1F6F9"
                    onChangeText={(value) => {
                        // console.log(value, "asafd")
                        if (value.length === 0) {
                            return
                        }
                        matchContact = dbObj["dataArray"].map((data) => {
                            if (data["name"].toString().toLowerCase().includes(value.toString().toLowerCase())){
                                matchContact.push(data)
                            }
                            console.log(matchContact, "dddddd")
                        })
                        setMatchContactState(matchContact)
                        
                    }} />
                <Pressable style={[tw`mr-2`]} onPress={() => {
                    console.log("search")
                }}>
                    <Feather name="search" size={23} style={[tw`text-[#F1F6F9]`]} />
                </Pressable>     
            </View>

            <View>
                <Text>Hello</Text>
                <FlashList  data={matchContactState && matchContactState}
                        renderItem={({item}) => {
                            return (
                                <View>
                                    <Text>it's work</Text>
                                    <ContactItem name={item?.name} phoneNumber={item.phoneNumber} id = {item.id}/>
                                </View>
                            )
                        }} 
                        estimatedItemSize={20}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        color: "#F1F6F9"
    }
})


export default SearchScreen;