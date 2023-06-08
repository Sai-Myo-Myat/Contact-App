import React, {FC, useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';

import {AntDesign, Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {useActionSheet} from '@expo/react-native-action-sheet';
import tw from 'twrnc';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../types';

import {ContactType} from '../types';
import {useMutation, useQueryClient} from 'react-query';
import {fetchQuery} from '../api/base';

const ContactItem: FC<ContactType> = ({id, name, phone_number}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Home'>>();

  const goToDetail = useCallback(() => {
    navigate('Detail', {id: id});
  }, [id, navigate]);

  const goToForm = useCallback(() => {
    navigate('Form', {id: id});
  }, [id, navigate]);

  const queryClient = useQueryClient();

  const deleteContact = async (idParam: number) => {
    const data = await fetchQuery(`/${idParam}`, null, 'DELETE');
    return data;
  };

  const {mutate} = useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchAllContacts');
    },
  });

  //action sheet
  const {showActionSheetWithOptions} = useActionSheet();

  const onDelete = useCallback(() => {
    const options = ['Cancle', 'Delete'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        containerStyle: tw`h-1/5 flex bg-[#212A3E]`,
        textStyle: tw`text-lg`,
        tintColor: '#F1F6F9',
      },
      (selectedIndex: number | undefined) => {
        if (selectedIndex === 1) {
          mutate(id);
        }
      },
    );
  }, [id, mutate, showActionSheetWithOptions]);

  return (
    <Pressable onPress={goToDetail}>
      <View style={[tw`p-4 flex gap-1`]}>
        <View style={[tw`flex gap-3`]}>
          <Text style={[tw`text-[#F1F6F9] font-bold text-lg`]}>{name}</Text>
          <Text style={[tw`text-[#F1F6F9] font-bold text-sm`]}>
            phone number : {phone_number}
          </Text>
          <Text style={[tw`text-[#9BA4B5]`]}>2011-2-4</Text>
        </View>
        <View style={[tw`flex-row gap-3 self-end`]}>
          <Pressable style={[tw`mr-2`]} onPress={goToForm}>
            <Feather name="edit" size={23} color="#F1F6F9" />
          </Pressable>
          <Pressable style={[tw`mr-2`]} onPress={onDelete}>
            <AntDesign name="delete" size={23} color={'#F1F6F9'} />
          </Pressable>
        </View>
        <View style={[tw`h-.3 bg-[#394867] `]} />
      </View>
    </Pressable>
  );
};

export default ContactItem;
