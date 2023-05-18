import { View, Text, TextInput, StyleSheet } from "react-native"

import {useForm, SubmitHandler} from "react-hook-form"

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark?: string
}

import tw from "twrnc"
import CustomButton from "../Components/CustomButton"
const Form = () => {

    const {register, handleSubmit, formState:{errors}} = useForm<InputType>();
    return (
        <View style={[tw`bg-[#394867] p-5 h-full text-[#F1F6F9] flex justify-center items-center gap-2`]}>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Name</Text>
            <TextInput {...register("name")} 
                placeholder="Name"
                placeholderTextColor={"#9BA4B5"}
                style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
            <TextInput {...register("phoneNumber")} 
                placeholder="Phone Number"
                placeholderTextColor={"#9BA4B5"}
                style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Remark</Text>
            <TextInput {...register("remark")} 
                multiline={true}
                numberOfLines={5}
                placeholder="Remark (optional)"
                placeholderTextColor={"#9BA4B5"}
                style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
            <CustomButton title="Submit" onPressFun={() => "contact added"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        color: "#F1F6F9"
    }
})

export default Form;