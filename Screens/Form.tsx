import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { useMemo, useRef } from "react"

import {useForm, SubmitHandler, Controller} from "react-hook-form"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark?: string
}

import tw from "twrnc"
import CustomButton from "../Components/CustomButton"


const Form = () => {

    const bottomSheetModelRef = useRef<BottomSheetModal>(null)
    const {register, handleSubmit, control, formState:{errors}} = useForm<InputType>({
        defaultValues: {
            name: "",
            phoneNumber: "",
            dateOfBirth: "",
            remark: ""
        }
    });

    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const onSubmit: SubmitHandler<InputType> = data => console.log(data, "data")

    return (
        <BottomSheetModalProvider >
            <View style={[tw`bg-[#212A3E] p-5 h-full text-[#F1F6F9] flex justify-center items-center gap-2`]}>
            {/* <Button title="open" onPress={() => bottomSheetModelRef.current?.present()}/>
            <Button title="close" onPress={() => bottomSheetModelRef.current?.dismiss()}/>
            <BottomSheetModal 
                ref={bottomSheetModelRef}
                index={1}
                onChange={(index) => console.log(index)}
                snapPoints={snapPoints}
            >
                <Text>Bottom Sheet Model</Text>
            </BottomSheetModal> */}
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Name</Text>
            <Controller 
                control={control}
                name="name"
                render = {({field: {onChange, value, onBlur}}) => (
                    <TextInput {...register("name")}
                        placeholder="Name"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        placeholderTextColor={"#9BA4B5"}
                        style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
                )}
            />
            
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
            <Controller 
                control={control}
                name="phoneNumber"
                render = {({field: {onChange, value, onBlur}}) => (
                    <TextInput {...register("phoneNumber")} 
                    placeholder="Phone Number"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholderTextColor={"#9BA4B5"}
                    style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
                )}/>
            
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Remark</Text>
            <Controller 
                control={control}
                name="remark"
                render = {({field: {onChange, value, onBlur}}) => (
                    <TextInput {...register("remark")} 
                    multiline={true}
                    numberOfLines={5}
                    placeholder="Remark (optional)"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholderTextColor={"#9BA4B5"}
                    style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/>
                )} />
            
            <CustomButton title="Submit" onPressFun={handleSubmit(onSubmit)}/>
        </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    textInput: {
        color: "#F1F6F9"
    }
})

export default Form;

{/* <TextInput {...register("name")}
                placeholder="Name"
                placeholderTextColor={"#9BA4B5"}
                style={[tw`p-2 border w-full rounded-lg`,styles.textInput ]}/> */}