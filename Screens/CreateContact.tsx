//dependencies
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import tw from 'twrnc';

//components
import CustomButton from '../Components/CustomButton';
import DatePickerController from '../Components/DatePickerController';

//types
import {ContactType, RootStackParamsList} from '../types';

import {fetchQuery} from '../api/base';

type ContactScreenRouteProps = RouteProp<RootStackParamsList, 'Form'>;

const Form = () => {
  //variables
  const {
    params: {id},
  } = useRoute<ContactScreenRouteProps>();
  // const [dob, setDob] = useState<string>('');

  //navigation
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Form'>>();

  const goToHome = useCallback(() => {
    navigate('Home');
  }, [navigate]);

  //react query
  const queryClient = useQueryClient();

  //db functions
  const addContact = async (props: ContactType) => {
    const data = await fetchQuery('', props, 'POST');
    return data;
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
    control,
    formState: {errors},
  } = useForm<ContactType>();

  const onSubmit: SubmitHandler<ContactType> = formData => {
    mutation.mutate(formData);
    goToHome();
  };

  // useEffect(() => {
  //   if (data && data[0]) {
  //     setDob(data[0].dateOfBirth);
  //     console.log('typeof dob', typeof data[0]?.dateOfBirth);
  //     reset({
  //       name: data[0].name,
  //       phoneNumber: data[0].phoneNumber,
  //       dateOfBirth: data[0].dateOfBirth,
  //       remark: data[0].remark,
  //     });
  //     return;
  //   }
  //   reset({
  //     name: '',
  //     phoneNumber: '',
  //     dateOfBirth: undefined,
  //     remark: '',
  //   });
  // }, [dob, reset, data]);

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
          {...register('phone_number', {
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
            defaultValue={''}
            render={renderName}
          />
        </View>

        <View>
          <View style={[tw`flex-row gap-2 items-center mb-2`]}>
            <Text style={[tw`self-start text-[#F1F6F9]`]}>Phone Number</Text>
            <Text style={[tw`text-[#E43F5A]`]}>
              {errors.phone_number ? ` : ${errors.phone_number.message} ` : ''}
            </Text>
          </View>
          <Controller
            control={control}
            name="phone_number"
            defaultValue={''}
            render={renderPhoneNumber}
          />
        </View>

        <DatePickerController name="date_of_birth" control={control} />

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
