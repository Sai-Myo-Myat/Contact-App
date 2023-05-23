import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomButton from '../Components/CustomButton';
import DatePickerController from '../Components/DatePickerController';
import {db, getContact} from '../db';
import {RootStackParamsList} from '../types';

interface InputType {
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  remark: string;
}

const Form = ({route}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Form'>>();

  const goToHome = () => {
    navigate('Home');
  };

  const {id} = route.params;
  const [dob, setDob] = useState<string>('');

  console.log('route', id);

  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<InputType>();

  const {data} = useQuery('getContact', () => getContact(id));
  // console.log("data from database", data)
  const addContact = ({name, phoneNumber, dateOfBirth, remark}: InputType) => {
    let array = [name, phoneNumber, dateOfBirth.toString(), remark];
    let queryString =
      'INSERT INTO contact (name, phoneNumber, dateOfBirth, remark) values (?,?,?,?)';

    if (data) {
      queryString =
        'UPDATE contact SET name=?, phoneNumber=?, dateOfBirth=?, remark=? WHERE id=?';
      array = [...array, id];
    }

    db.transaction(tx => {
      tx.executeSql(
        queryString,
        array,
        (_txObj, result) => console.log(result, 'data'),
        (_txObj, error: any) => console.log('error', error),
      );
    });
  };

  // const snapPoints = useMemo(() => ['25%', '50%'], []);
  const onSubmit: SubmitHandler<InputType> = formData => {
    addContact(formData);
    console.log('form data', formData);
    goToHome();
  };

  useEffect(() => {
    if (data) {
      setDob(data.dateOfBirth);
      reset({
        name: data.name,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        remark: data.remark,
      });
    }
  }, [dob, data, reset]);

  const renderName = useCallback(({field: {value, onChange}}: any) => {
    return (
      <TextInput
        placeholder={'Enter your name...'}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={'#9BA4B5'}
        style={[
          tw`p-2 border border-[#394867] w-full rounded-lg`,
          styles.textInput,
        ]}
      />
    );
  }, []);

  const renderPhoneNumber = useCallback(({field: {value, onChange}}: any) => {
    return (
      <TextInput
        placeholder={'Enter your phone number'}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={'#9BA4B5'}
        style={[
          tw`p-2 border border-[#394867] w-full rounded-lg`,
          styles.textInput,
        ]}
      />
    );
  }, []);

  const renderRemark = useCallback(({field: {value, onChange}}: any) => {
    return (
      <TextInput
        multiline={true}
        numberOfLines={5}
        value={value}
        placeholder="Remark ( optional )"
        onChangeText={onChange}
        placeholderTextColor={'#9BA4B5'}
        style={[
          tw`p-2 border border-[#394867] w-full rounded-lg`,
          styles.textInput,
        ]}
      />
    );
  }, []);

  return (
    <BottomSheetModalProvider>
      <View
        style={[
          tw`bg-[#212A3E] p-5 h-full text-[#F1F6F9] flex justify-center items-center gap-2`,
        ]}>
        <View
          style={[tw` w-full flex items-center rounded-lg justify-center p-2`]}>
          <Text style={[tw`text-[#EB455F]  mb-3 text-lg`]}>
            {errors.name?.message ||
              errors.phoneNumber?.message ||
              errors.dateOfBirth?.message}
          </Text>
        </View>
        <Text style={[tw`self-start text-[#F1F6F9]`]}>Name</Text>
        <Controller
          control={control}
          name="name"
          rules={{
            required: !id ? 'Name field is require!' : false,
            maxLength: 10,
            minLength: 3,
          }}
          defaultValue={data?.name || ''}
          render={renderName}
        />

        <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: !id ? 'Phone Number is required!' : false,
            maxLength: 11,
            minLength: 11,
            pattern: {
              value: /^(09\d{9,11}|959\d{8,10}|01\d{5,7})$/g,
              message: 'Invalid phone number',
            },
          }}
          defaultValue={data ? data?.phoneNumber : ''}
          render={renderPhoneNumber}
        />

        <DatePickerController
          name={'dateOfBirth'}
          control={control}
          currentDOB={id ? data.dateOfBirth : null}
        />

        <Text style={[tw`self-start text-[#F1F6F9]`]}>Remark</Text>
        <Controller control={control} name="remark" render={renderRemark} />

        <CustomButton title="Submit" onPressFun={handleSubmit(onSubmit)} />
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#F1F6F9',
  },
});

export default Form;
