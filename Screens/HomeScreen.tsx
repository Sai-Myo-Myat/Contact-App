import { View, Text, Button, TextInput } from "react-native"

import { FlashList } from "@shopify/flash-list"


import CustomButton from "../Components/CustomButton"
import ContactItem from "../Components/ContactItem"

import tw from 'twrnc'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={[tw`bg-[#212A3E] w-full h-full`]}>
            <FlashList  data={
                [
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
                estimatedFirstItemOffset={200}
        />
        </View>
    )   
}

export default HomeScreen;  