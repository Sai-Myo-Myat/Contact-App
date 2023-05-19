import { View, Text, TextInput, StyleSheet, Button } from "react-native"
import { useMemo, useRef, useState } from "react"

import {useForm, SubmitHandler, Controller} from "react-hook-form"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import DatePicker from "@react-native-community/datetimepicker"
import moment from "moment"

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
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
            dateOfBirth: new Date,
            remark: ""
        }
    });

    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const onSubmit: SubmitHandler<InputType> = data => console.log(data, "data")

    return (
        <BottomSheetModalProvider >
            <View style={[tw`bg-[#212A3E] p-5 h-full text-[#F1F6F9] flex justify-center items-center gap-2`]}>
        
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


            <Text style={[tw`self-start text-[#F1F6F9]`]}>Date Of Birth</Text>
            <Button title="Open" onPress={() => bottomSheetModelRef.current?.present()}/>
            <BottomSheetModal 
                ref={bottomSheetModelRef}
                index={1}
                onChange={(index) => console.log(index)}
                snapPoints={snapPoints}
            >
                <Controller 
                control={control}
                name="dateOfBirth"
                render = {({field: {onChange, value, onBlur}}) => (
                    <DatePicker
                        {...register("dateOfBirth")}
                        value={new Date(value)}
                        mode="date"
                        onChange={(date) => {
                            onChange(date)
                            bottomSheetModelRef.current?.dismiss()
                        }}
                    />
                    
                )}/>
            </BottomSheetModal>
            
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

