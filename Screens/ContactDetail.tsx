import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import {fetchQuery} from '../api/base';
import {ContactType, RootStackParamsList} from '../types';

type ProductScreenRouteProps = RouteProp<RootStackParamsList, 'Detail'>;

const ContactDetail = () => {
  const {
    params: {id},
  } = useRoute<ProductScreenRouteProps>();

  const useContact = () => {
    return useQuery('fetchContact', async () => {
      const data = await fetchQuery<ContactType>(`/${id}`, {}, 'GET');
      return data;
    });
  };

  const {data, isLoading} = useContact();

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
        tw`bg-[#212A3E] p-5 h-full  flex justify-start items-start gap-3`,
      ]}>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Name :</Text>
        <Text style={[tw`ml-10 text-lg text-[#E43F5A]`]}>{data?.name}</Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-lg text-[#F1F6F9]`]}>Phone Number :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data?.phone_number}
        </Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Date Of Birth :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data?.date_of_birth}
        </Text>
      </View>
      <View style={[tw`flex-row gap-1 items-center`]}>
        <Text style={[tw`text-sm text-[#F1F6F9]`]}>Remark :</Text>
        <Text style={[tw`py-2 ml-10 text-lg text-[#E43F5A]`]}>
          {data?.remark ? data.remark : 'no remark'}
        </Text>
      </View>
    </View>
  );
};

export default ContactDetail;
