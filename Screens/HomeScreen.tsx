import { View, Text, Button, TextInput } from "react-native"
import CustomButton from "../Components/CustomButton"

import tw from 'twrnc'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={[tw`flex flex-row bg-red-500 h-full items-start `]}>
            <TextInput placeholder="search contact" style={[tw`border-b border-blue-300 m-2 p-1 w-2/3 `]}/>
            <CustomButton title="Add" onPressFun={() => console.log("add to contact")}/>
        </View>
    )   
}
    
export default HomeScreen;  