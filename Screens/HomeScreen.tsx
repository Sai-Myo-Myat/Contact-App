import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import ContactItem from '../Components/ContactItem';

import {db} from '../db';

interface ItemType {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  remark: string;
  id: number;
}

const fetchingPromise = () => {
  //DECLARE @PageNumber AS INT DECLARE @RowsOfPage AS INT SET @PageNumber = 1 SET @RowsOfPage = 2 SELECT * FROM contact OFFSET (@PageNumber-1)*@RowsOfPage ROWS
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM contact',
        [],
        (txObj, {rows: {_array}}) => resolve(_array),
        (_txObj, error) => reject(error),
      );
    });
  });
};

const fetchContact = async () => {
  return fetchingPromise()
    .then(res => {
      // console.log('res from promise', res);
      return res;
    })
    .catch(err => console.log('fetching error', err));
};

const HomeScreen = () => {
  const {isLoading, isError, data, error} = useQuery(
    'fetchContact',
    fetchContact,
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    },
  );

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
        data={data && data}
        renderItem={renderContactItem}
        estimatedItemSize={20}
        extraData={data}
      />
    </View>
  );
};

export default HomeScreen;
