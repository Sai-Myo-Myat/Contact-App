import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

import tw from 'twrnc'
import { Feather } from "@expo/vector-icons"

const SearchScreen = ({navigation}) => {
    const array = [
        {name: "mgmg"},
        {name: "aung"},
        {name: "mgmg"},
        {name: "aung"},
        {name: "mgmg"},
    ]

    return (
        <View style={[tw`bg-[#212A3E] w-full h-full p-3`]}>
            <View style={[tw`flex-row items-center justify-around px-3 border-b border-[#394867]`]}>
                <TextInput 
                    style={[tw` text-lg p-2 m-3 flex-2`, styles.input]} 
                    placeholder="search.."
                    placeholderTextColor="#F1F6F9"
                    onChangeText={() => console.log("chages")} />
                <Pressable style={[tw`mr-2`]} onPress={() => {
                    console.log("search")
                }}>
                    <Feather name="search" size={23} style={[tw`text-[#F1F6F9]`]} />
                </Pressable>
                    
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