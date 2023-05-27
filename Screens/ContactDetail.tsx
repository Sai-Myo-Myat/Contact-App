import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import {db} from '../db';

const ContactDetail = ({route}) => {
  const {id} = route.params;

  console.log('id from detail page', id);

  const getContactPromise = (idParam: number) => {
    return new Promise((resolve, _reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM contact WHERE id=?',
          [idParam],
          (txObj, {rows: {_array}}) => resolve(_array),
          (_txObj, error: any) => error,
        );
      });
    });
  };

  const getContact = useCallback(async () => {
    return getContactPromise(id)
      .then((res: any) => {
        return res[0];
      })
      .catch(err => console.log(err));
  }, [id]);

  const {isLoading, data} = useQuery('contactDetails', getContact);

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  }

  console.log('data from detail page', data);

  return (
    <View
      style={[
        tw`bg-[#212A3E] p-5 h-full  flex justify-start items-start gap-3`,
      ]}>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Name :</Text>
        <Text style={[tw`ml-10 text-lg text-[#E43F5A]`]}>{data.name}</Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-lg text-[#F1F6F9]`]}>Phone Number :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data.phoneNumber}
        </Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Date Of Birth :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data.dateOfBirth}
        </Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Remark :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data.remark ? data.remark : 'no remark'}
        </Text>
      </View>
    </View>
  );
};

export default ContactDetail;
