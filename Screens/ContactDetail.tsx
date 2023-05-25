import moment from 'moment';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import {db} from '../db';

const ContactDetail = ({route}) => {
  const {id} = route.params;

  const getContactPromise = (id:number) => {
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

  return (
    <View
      style={[
        tw`bg-[#212A3E] p-5 h-full  flex justify-start items-start gap-2`,
      ]}>
      <Text style={[tw`text-[#F1F6F9] text-xl`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Name: </Text> {data?.name}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Phone Number: </Text>
        {data?.phoneNumber}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Date Of Birth: </Text>
        {moment(data?.dateOfBirth).format('DD-MM-YYYY')}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Remark: </Text>
        {data === '' ? 'No Remark' : data.remark}
      </Text>
    </View>
  );
};

export default ContactDetail;
