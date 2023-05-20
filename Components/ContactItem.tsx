import { FC } from "react";
import { View, Text, Pressable  } from "react-native";

import tw from 'twrnc'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

interface Props {
    name: string,
    phoneNumber: string,
    dateOfBirth?: Date,
    remark?: string
    id: number,
}

const ContactItem:FC<Props> = ({name,phoneNumber, id}) => {

    const navigation = useNavigation()
    return (
        <View style={[tw`p-4 flex gap-1`]}>
            <View style={[tw`flex gap-3`]}>
                <Text style={[tw`text-[#F1F6F9] font-bold text-lg`]}>{name}</Text>
                <Text style={[tw`text-[#F1F6F9] font-bold text-sm`]}>ph:   {phoneNumber}</Text>
                <Text style={[tw`text-[#9BA4B5]`]}>created at:  2011-2-4</Text>
            </View >
            <View style={[tw`flex-row gap-3 self-end`]}>
                <Pressable style={[tw`mr-2`]} onPress={() => navigation.navigate("Form" ,{editMode: true, id:id})}>
                    <Feather name="edit" size={20} color="#F1F6F9" />
                </Pressable>
                <Pressable style={[tw`mr-2`]} onPress={() => console.log("delete button")}>
                    <AntDesign name="delete" size={20} color={"#F1F6F9"}/>
                </Pressable>
            </View>
            <View style={[tw`h-.3 bg-[#394867] `]}></View>
        </View>
    )
}

export default ContactItem;