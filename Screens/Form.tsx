import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import DatePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  Controller,
  ControllerRenderProps,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {useQuery} from 'react-query';

import {getContact} from '../db';

interface InputType {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  remark: string;
}

interface TextInputType {
  name: string;
  value: string;
}

type name = string;

import tw from 'twrnc';
import CustomButton from '../Components/CustomButton';
import {db} from '../db';

const Form = ({route}) => {
  const {navigate} = useNavigation();

  const {id} = route.params;
  const bottomSheetModelRef = useRef<BottomSheetModal>(null);
  const [dob, setDob] = useState<string>('');
  // const queryClient = useQueryClient()

  console.log('route', id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<InputType>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      dateOfBirth: new Date('2000-1-1').toString(),
      remark: '',
    },
  });

  const {data} = useQuery('getContact', () => getContact(id));
  // console.log(dob, "this is dob")
  const addContact = ({name, phoneNumber, dateOfBirth, remark}: InputType) => {
    let array = [name, phoneNumber, dateOfBirth, remark];
    let queryString =
      'INSERT INTO contact (name, phoneNumber, dateOfBirth, remark) values (?,?,?,?)';

    db.transaction(tx => {
      tx.executeSql(
        queryString,
        array,
        (_txObj, result) => console.log(result, 'data'),
        (_txObj, error: any) => console.log('error', error),
      );
    });
  };

  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const onSubmit: SubmitHandler<InputType> = data => {
    addContact(data);
    navigate('Home');
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

  const textContollerFun = useCallback(
    ({onChange, onBlur, value, name}: ControllerRenderProps<TextInputType>) =>
      (
        <TextInput
          {...register('name', {
            required: !id ? 'name field is require!' : false,
            maxLength: 10,
            minLength: 3,
          })}
          name={name}
          placeholder={'name'}
          value={value}
          onBlur={onBlur}
          onChange={onChange(value) as NativeSyntheticEvent<name> | unknown}
          placeholderTextColor={'#9BA4B5'}
          style={[
            tw`p-2 border border-[#394867] w-full rounded-lg`,
            // styles.textInput,
          ]}
        />
      ) as ReactElement,
    [id, register],
  );

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
          defaultValue={data?.name || ''}
          render={textContollerFun}
        />

        <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          defaultValue={data ? data?.phoneNumber : ''}
          // eslint-disable-next-line react/jsx-no-bind
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              {...register('phoneNumber', {
                required: !id ? 'Phone Number is required!' : false,
                maxLength: 11,
                minLength: 11,
                pattern: {
                  value: /^(09\d{9,11}|959\d{8,10}|01\d{5,7})$/g,
                  message: 'Invalid phone number',
                },
              })}
              placeholder={'phone number'}
              value={value}
              onBlur={onBlur}
              // eslint-disable-next-line react/jsx-no-bind
              onChangeText={value => onChange(value)}
              placeholderTextColor={'#9BA4B5'}
              style={[
                tw`p-2 border border-[#394867] w-full rounded-lg`,
                styles.textInput,
              ]}
            />
          )}
        />

        <Text style={[tw`self-start text-[#F1F6F9]`]}>Date Of Birth</Text>
        <Pressable
          style={[
            tw`self-start border border-[#394867] px-2 py-3 rounded-lg w-full`,
          ]}
          // eslint-disable-next-line react/jsx-no-bind
          onPress={() => bottomSheetModelRef.current?.present()}>
          <Text style={[tw`text-[#F1F6F9] ${dob === '' ? 'opacity-50' : ''}`]}>
            {dob ? dob : '2000-1-1'}
          </Text>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModelRef}
          index={1}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={index => console.log(index)}
          snapPoints={snapPoints}>
          <Controller
            control={control}
            name="dateOfBirth"
            // eslint-disable-next-line react/jsx-no-bind
            render={({field: {onChange, value, onBlur}}) => (
              <DatePicker
                {...register('dateOfBirth')}
                value={new Date(value)}
                mode="date"
                display="spinner"
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(_event, date) => {
                  const formattedDate = moment(date?.toString()).format(
                    'YYYY,MM,DD',
                  );
                  onChange(formattedDate);
                  setDob(formattedDate);
                  bottomSheetModelRef.current?.dismiss();
                }}
              />
            )}
          />
        </BottomSheetModal>

        <Text style={[tw`self-start text-[#F1F6F9]`]}>Remark</Text>
        <Controller
          control={control}
          name="remark"
          // eslint-disable-next-line react/jsx-no-bind
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              {...register('remark')}
              multiline={true}
              numberOfLines={5}
              value={value}
              placeholder={data ? data.remark : 'remark ( optional )'}
              onBlur={onBlur}
              // eslint-disable-next-line react/jsx-no-bind
              onChangeText={value => onChange(value)}
              placeholderTextColor={'#9BA4B5'}
              style={[
                tw`p-2 border border-[#394867] w-full rounded-lg`,
                styles.textInput,
              ]}
            />
          )}
        />

        <CustomButton title="Submit" onPressFun={handleSubmit(onSubmit)} />
      </View>
    </BottomSheetModalProvider>
  );
};

// const styles = StyleSheet.create({
//   TextInput: {
//     color: '#F1F6F9',
//   },
// });

export default Form;
