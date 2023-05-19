import { FC } from "react";
import { View, Text, ViewBase  } from "react-native";

import tw from 'twrnc'

interface Props {
    name: string,
    phoneNumber: string,
    dateOfBirth?: Date,
    remark?: string
}

const ContactItem:FC<Props> = ({name,phoneNumber}) => {
    return (
        <View style={[tw`p-4 flex gap-3`]}>
            <Text style={[tw`text-[#F1F6F9] font-bold text-lg`]}>{name}</Text>
            <Text style={[tw`text-[#9BA4B5] font-bold text-sm`]}>ph:   {phoneNumber}</Text>
            <Text style={[tw`text-[#394867]`]}>created at:  2011-2-4</Text>
            <View style={[tw`h-.3 bg-[#394867] `]}></View>
        </View>
    )
}

export default ContactItem;