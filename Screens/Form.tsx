//dependencies
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import tw from 'twrnc';

//components
import CustomButton from '../Components/CustomButton';
import DatePickerController from '../Components/DatePickerController';

//db
import {db} from '../db';
//types
import {RootStackParamsList} from '../types';

interface InputType {
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  remark: string;
}

const Form = ({route}) => {
  //variables
  const {id} = route.params;
  const [dob, setDob] = useState<string>('');
  //navigation
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Form'>>();

  const goToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  //react query
  const queryClient = useQueryClient();
  const {data} = useQuery('getContact', () => getContact(id));

  //db functions
  const addContact = (props: InputType) => {
    console.log('dataOfBirth', props.dateOfBirth);
    let array: any = [
      props.name,
      props.phoneNumber,
      props.dateOfBirth,
      props.remark,
    ];
    let queryString =
      'INSERT INTO contact (name, phoneNumber, dateOfBirth, remark) VALUES (?,?,?,?)';

    if (id) {
      queryString =
        'UPDATE contact SET name=?, phoneNumber=?, dateOfBirth=?, remark=? WHERE id=?';
      array = [...array, id];
    }

    db.transaction(tx => {
      tx.executeSql(
        queryString,
        array,
        (_txObj, {rows: {_array}, rowsAffected}) => {
          if (rowsAffected > 0) {
            console.log('rowsAffected', rowsAffected);
          }
        },
        (_txObj, error: any) => error.message,
      );
    });
    return new Promise((resolve, _reject) => {
      return resolve('success');
    });
  };

  const getContactPromise = (id: number) => {
    return new Promise((resolve, _reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM contact WHERE id=?',
          [id],
          (txObj, {rows: {_array}}) => resolve(_array),
          (_txObj, error: any) => error,
        );
      });
    });
  };

  const getContact = async (id: number) => {
    if (id) {
      return getContactPromise(id)
        .then(res => {
          console.log(res, 'result from promise, form-edit page');
          return res;
        })
        .catch(err => console.log(err));
    }
  };

  //react query
  const mutation = useMutation(addContact, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchContact');
    },
  });

  //react-hook-form
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: {errors},
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = formData => {
    mutation.mutate(formData);
    goToHome();
  };

  useEffect(() => {
    if (data && data[0]) {
      setDob(data[0].dateOfBirth);
      console.log('typeof dob', typeof data[0]?.dateOfBirth);
      reset({
        name: data[0].name,
        phoneNumber: data[0].phoneNumber,
        dateOfBirth: data[0].dateOfBirth,
        remark: data[0].remark,
      });
      return;
    }
    reset({
      name: '',
      phoneNumber: '',
      dateOfBirth: undefined,
      remark: '',
    });
  }, [dob, reset, data]);

  console.log(data, 'after reset');

  //rendering
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

  const renderPhoneNumber = useCallback(
    ({field: {value, onChange}}: any) => {
      return (
        <TextInput
          placeholder={'Enter your phone number...'}
          {...register('phoneNumber', {
            required: !id ? 'Phone Number is required!' : false,
            maxLength: 12,
            minLength: 11,
            pattern: {
              value: /^(09\d{9,11}|959\d{8,10}|01\d{5,7})$/g,
              message: 'Invalid phone number',
            },
          })}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={'#9BA4B5'}
          style={[
            tw`p-2 border border-[#394867] w-full rounded-lg`,
            styles.textInput,
          ]}
        />
      );
    },
    [id, register],
  );

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
        style={[tw`bg-[#212A3E] px-5 py-10 h-full text-[#F1F6F9] flex gap-4`]}>
        <View>
          <View style={[tw`flex-row gap-2 items-center mb-2`]}>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Name</Text>
            <Text style={[tw`text-[#E43F5A]`]}>
              {errors.name ? ` : ${errors.name.message} ` : ''}
            </Text>
          </View>
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
        </View>

        <View>
          <View style={[tw`flex-row gap-2 items-center mb-2`]}>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
            <Text style={[tw`text-[#E43F5A]`]}>
              {errors.phoneNumber ? ` : ${errors.phoneNumber.message} ` : ''}
            </Text>
          </View>
          <Controller
            control={control}
            name="phoneNumber"
            defaultValue={data ? data?.phoneNumber : ''}
            render={renderPhoneNumber}
          />
        </View>

        <DatePickerController name="dateOfBirth" control={control} />

        <View>
          <Text style={[tw`self-start text-[#F1F6F9] mb-2`]}>Remark</Text>
          <Controller control={control} name="remark" render={renderRemark} />
        </View>

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
