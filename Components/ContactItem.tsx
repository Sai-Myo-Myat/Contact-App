import React, {FC, useCallback, useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import {AntDesign, Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useQueryClient} from 'react-query';
import {db} from '../db';
import {RootStackParamsList} from '../types';

interface Props {
  name: string;
  phoneNumber: string;
  dateOfBirth?: Date;
  remark?: string;
  id: number;
}

const deleteContact = (id: number) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM contact WHERE id = ? ', [id], (txObj, result) =>
      console.log('delete', result),
    );
  });
};

const ContactItem: FC<Props> = ({name, phoneNumber, id}) => {
  const {modalVisiable, setModalVisiable} = useState(true);

  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Home'>>();

  const queryClient = useQueryClient();

  const goToDetail = useCallback(() => {
    navigate('Detail', {id: id});
  }, [id, navigate]);

  const goToForm = useCallback(() => {
    navigate('Form', {id: id});
  }, [id, navigate]);

  const deleteContactCallback = useCallback(() => {
    deleteContact(id);
    queryClient.invalidateQueries('fetchContact');
  }, [id, queryClient]);

  const setModalVisiableX = useCallback(
    () => setModalVisiable(!modalVisiable),
    [],
  );

  return (
    <Pressable onPress={goToDetail}>
      <Modal animationType="fade" transparent={true} visible={modalVisiable}>
        <Text>This is modal</Text>
      </Modal>
      <View style={[tw`p-4 flex gap-1`]}>
        <View style={[tw`flex gap-3`]}>
          <Text style={[tw`text-[#F1F6F9] font-bold text-lg`]}>{name}</Text>
          <Text style={[tw`text-[#F1F6F9] font-bold text-sm`]}>
            phone number : {phoneNumber}
          </Text>
          <Text style={[tw`text-[#9BA4B5]`]}>2011-2-4</Text>
        </View>
        <View style={[tw`flex-row gap-3 self-end`]}>
          <Pressable style={[tw`mr-2`]} onPress={goToForm}>
            <Feather name="edit" size={23} color="#F1F6F9" />
          </Pressable>
          <Pressable style={[tw`mr-2`]} onPress={setModalVisiableX}>
            <AntDesign name="delete" size={23} color={'#F1F6F9'} />
          </Pressable>
        </View>
        <View style={[tw`h-.3 bg-[#394867] `]} />
      </View>
    </Pressable>
  );
};

export default ContactItem;
