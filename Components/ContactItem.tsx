import React, {FC, useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';

import {AntDesign, Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
      console.log(result),
    );
  });
};

const ContactItem: FC<Props> = ({name, phoneNumber, id}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Home'>>();

  const goToDetail = useCallback(() => {
    navigate('Detail', {id});
  }, [id, navigate]);

  return (
    <Pressable onPress={goToDetail}>
      <View style={[tw`p-4 flex gap-1`]}>
        <View style={[tw`flex gap-3`]}>
          <Text style={[tw`text-[#F1F6F9] font-bold text-lg`]}>{name}</Text>
          <Text style={[tw`text-[#F1F6F9] font-bold text-sm`]}>
            ph: {phoneNumber}
          </Text>
          <Text style={[tw`text-[#9BA4B5]`]}>created at: 2011-2-4</Text>
        </View>
        <View style={[tw`flex-row gap-3 self-end`]}>
          <Pressable
            style={[tw`mr-2`]}
            onPress={() => navigation.navigate('Form', {id: id})}>
            <Feather name="edit" size={20} color="#F1F6F9" />
          </Pressable>
          <Pressable style={[tw`mr-2`]} onPress={deleteContact(id)}>
            <AntDesign name="delete" size={20} color={'#F1F6F9'} />
          </Pressable>
        </View>
        <View style={[tw`h-.3 bg-[#394867] `]} />
      </View>
    </Pressable>
  );
};

export default ContactItem;
