import moment from 'moment';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import {db} from '../db';

const ContactDetail = ({route}) => {
  const {id} = route.params;

  const getContactPromise = (id: number) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM contact WHERE id=?',
          [id],
          (txObj, {rows: {_array}}) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });
  };

  const getContact = async (id: number) => {
    if (id) {
      return getContactPromise(id)
        .then(res => {
          return res[0];
        })
        .catch(err => console.log(err));
    }
  };

  const {isLoading, data} = useQuery('contactDetails', () => getContact(id));

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  }

  console.log('detail page', data.dateOfBirth);

  return (
    <View
      style={[
        tw`bg-[#212A3E] p-5 h-full  flex justify-start items-start gap-3`,
      ]}>
      <View style={[tw`flex gap-1`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Name :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#F1F6F9]`]}>{data.name}</Text>
      </View>
      <View style={[tw`flex gap-1`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Phone Number :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#F1F6F9]`]}>
          {data.phoneNumber}
        </Text>
      </View>
      <View style={[tw`flex gap-1`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Date Of Birth :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#F1F6F9]`]}>
          {data.dateOfBirth}
        </Text>
      </View>
      <View style={[tw`flex gap-1`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Remark :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#F1F6F9]`]}>
          {data.remark ? data.remark : 'no remark'}
        </Text>
      </View>
    </View>
  );
};

export default ContactDetail;
