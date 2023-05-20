import { View, Text, TextInput, StyleSheet, Button, Pressable, Touchable } from "react-native"
import { useEffect, useMemo, useRef, useState } from "react"

import {useForm, SubmitHandler, Controller} from "react-hook-form"
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import DatePicker from "@react-native-community/datetimepicker"
import { useQuery } from "react-query"
import moment from "moment"
import { useNavigation } from "@react-navigation/native"

interface InputType {
    name: string,
    phoneNumber: string,
    dateOfBirth: string,
    remark: string
}

import tw from "twrnc"
import CustomButton from "../Components/CustomButton"
import { db } from "../db"


const Form = ({navigation, route}) => {

    const {editMode, id} = route.params;

    console.log("route", editMode, id)
    //phoneNumber dateOfBirth remark
    const getContactPromise = (args = [1]) => {
        return new Promise((resolve, reject) => {
            db.exec([{sql: "SELECT *  FROM contact WHERE id = ? ", args}], false, (err,res) => {
                if(err) {
                    return reject(err)
                }

                return resolve(res)
            })
        })
    }

    const getContact = async () => {
       if ( editMode) {
        return  getContactPromise()
                    .then(res => res[0]["rows"])
                    .catch(err => console.log(err))
       }
    //    return {"name": "name", "phoneNumber": "phone number", "dateOfBirth": "2000-4-14", "remark": "remark (optional)"}
    }

    const addContact = ({name,phoneNumber,dateOfBirth,remark}: InputType) => {
        let array = [name,phoneNumber,dateOfBirth,remark]
        let queryString = 'INSERT INTO contact (name, phoneNumber, dateOfBirth, remark) values (?,?,?,?)'
        if( editMode ) {
            array = [...array, id]
            queryString = 'UPDATE contact SET name = ? phoneNumber = ? dateOfBirth = ? remark = ? WHERE id = ?'
        }

        db.transaction(tx => {
            tx.executeSql(queryString,
            array,
            (txObj,data) => console.log(data, "data"),
            (txObj, error: any ) => console.log("error", error));
        })
    }

    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const onSubmit: SubmitHandler<InputType> = data => {
        addContact(data)
        navigation.navigate("Home")
    }

    const {register, handleSubmit, control, formState:{errors}} = useForm<InputType>({
        defaultValues: {
            name: "",
            phoneNumber: "",
            dateOfBirth: new Date('2000-1-1').toString(),
            remark: " "
        }
    });



    const bottomSheetModelRef = useRef<BottomSheetModal>(null)
    const [dob, setDob] = useState<string>("")
    const {isLoading, isError, data, error} = useQuery("getContact", getContact)


    return (
        <BottomSheetModalProvider >
            <View style={[tw`bg-[#212A3E] p-5 h-full text-[#F1F6F9] flex justify-center items-center gap-2`]}>
        
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Name</Text>
            <Controller
                control={control}
                name="name"
                render = {({field: {onChange, value, onBlur}}) => (
                    <TextInput {...register("name")}
                        placeholder= {editMode && data ? data[0].name : "name"}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        placeholderTextColor={"#9BA4B5"}
                        style={[tw`p-2 border border-[#394867] w-full rounded-lg`,styles.textInput ]}/>
                )}
            />
            
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
            <Controller 
                control={control}
                name="phoneNumber"
                render = {({field: {onChange, value, onBlur}}) => (
                    <TextInput {...register("phoneNumber")} 
                    placeholder={editMode && data ? data[0].phoneNumber : "name"}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholderTextColor={"#9BA4B5"}
                    style={[tw`p-2 border border-[#394867] w-full rounded-lg`,styles.textInput ]}/>
                )}/>


            <Text style={[tw`self-start text-[#F1F6F9]`]}>Date Of Birth</Text>
            <Pressable  style={[tw`self-start border border-[#394867] px-2 py-3 rounded-lg w-full`]} onPress={() => bottomSheetModelRef.current?.present()}>
                <Text style={[tw`text-[#F1F6F9] ${dob === "" ? 'opacity-50' : ''}`]}>{dob? dob : "2000-1-1"}</Text>
            </Pressable>
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
                            display="spinner"
                            onChange={(event, date) => {
                                const formattedDate = moment(date?.toString()).format("YYYY,MM,DD")
                                onChange(formattedDate)
                                setDob(formattedDate)
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
                    placeholder={editMode && data ? data[0].remark : "remark ( optional )"}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    placeholderTextColor={"#9BA4B5"}
                    style={[tw`p-2 border border-[#394867] w-full rounded-lg`,styles.textInput ]}/>
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

