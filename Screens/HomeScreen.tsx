import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import tw from 'twrnc';

import ContactItem from '../Components/ContactItem';

import {ItemType} from '../types';
import {useQuery} from 'react-query';

const useContactList = () => {
  return useQuery('fetchAllContacts', async () => {});
};

const HomeScreen = () => {
  const {isLoading, isError, data, error} = useContactList();

  const renderContactItem = useCallback(
    ({item}: ListRenderItemInfo<ItemType>) => {
      return (
        <ContactItem
          name={item?.name}
          phoneNumber={item.phoneNumber}
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

  // console.log(data);

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <FlashList
        data={data && (data as any)}
        renderItem={renderContactItem}
        estimatedItemSize={20}
      />
    </View>
  );
};

export default HomeScreen;
