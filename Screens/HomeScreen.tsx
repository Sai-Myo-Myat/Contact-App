import { View, Text, Button, TextInput } from "react-native"

// import Icon from "react-native-vector-icons"

import CustomButton from "../Components/CustomButton"

import tw from 'twrnc'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={[tw`flex flex-row bg-red-500 h-full items-start `]}>
            {/* <Icon name="search"  size={30} /> */}
            <CustomButton title="Add" onPressFun={() => console.log("add to contact")}/>
        </View>
    )   
}

export default HomeScreen;  