import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import tw from 'twrnc';
import {fetchQuery} from '../api/base';

import ContactItem from '../Components/ContactItem';

import {useQuery} from 'react-query';

import {ContactType} from '../types';

const useContactList = () => {
  return useQuery('fetchAllContacts', async () => {
    const data = await fetchQuery<ContactType[]>('', {}, 'GET');
    return data;
  });
};

const HomeScreen = () => {
  const {isLoading, isError, data, error} = useContactList();

  // console.log('data from database', data);

  const renderContactItem = useCallback(
    ({item}: ListRenderItemInfo<ContactType>) => {
      return (
        <ContactItem
          name={item?.name}
          phoneNumber={item?.phone_number}
          id={item.id}
        />
      );
    },
    [],
  );

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  } else if (isError) {
    console.log('error', error);
  }

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <FlashList
        data={data as any}
        renderItem={renderContactItem}
        estimatedItemSize={20}
      />
    </View>
  );
};

export default HomeScreen;
