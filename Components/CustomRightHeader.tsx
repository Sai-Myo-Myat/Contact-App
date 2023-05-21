import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons"
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc'
import { TextInput } from "react-native-gesture-handler";


const CustomRightHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={[tw`flex-row bg-red-500 justify-between`]}>
            <Pressable style={[tw`mr-2`]} onPress={() => {
                navigation.navigate("Search")
            }}>
                <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Form", {editMode: false, id: null})}>
                <AntDesign name="plus" size={30} style={[tw`text-[#F1F6F9]`]} />
            </Pressable>
        
        </View>
    )
}

export default CustomRightHeader;