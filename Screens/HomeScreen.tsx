import { View, Text, Button } from "react-native"

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text>This is home screen</Text>
            <Button title="GO To Form" onPress={() => navigation.navigate("Form")}/>
        </View>
    )   
}

export default HomeScreen;  