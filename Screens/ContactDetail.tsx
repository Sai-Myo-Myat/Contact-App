import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import tw from 'twrnc';

import {useQuery} from 'react-query';

import {getContact} from '../db';

const ContactDetail = ({route}) => {
  const {id} = route.params;

  const {isLoading, isSuccess, data} = useQuery('contactDetails', () =>
    getContact(id),
  );

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  }

  if (isSuccess) {
    console.log(data.name);
  }

  return (
    <View
      style={[
        tw`bg-[#212A3E] p-5 h-full  flex justify-start items-start gap-2`,
      ]}>
      <Text style={[tw`text-[#F1F6F9] text-xl`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Name:</Text> {data?.name}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Phone Number:</Text>{' '}
        {data?.phoneNumber}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Date Of Birth:</Text>{' '}
        {data?.dateOfBirth}
      </Text>
      <Text style={[tw`text-[#F1F6F9] text-lg`]}>
        <Text style={[tw`text-[#9BA4B5]`]}>Remark:</Text>{' '}
        {data === '' ? 'No Remark' : data.remark}
      </Text>
    </View>
  );
};

export default ContactDetail;
