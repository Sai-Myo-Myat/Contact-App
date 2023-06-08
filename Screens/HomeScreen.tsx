import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import tw from 'twrnc';
import {fetchQuery} from '../api/base';

import ContactItem from '../Components/ContactItem';

import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';

import {ContactListSuccessResponseData, ContactType} from '../types';
import SearchBar from '../Components/SearchBar';
import {useForm} from 'react-hook-form';

const fetchContactList = async <T extends QueryKey = QueryKey>(
  context: QueryFunctionContext<T, {limit: number; offset: number}>,
) => {
  const {limit, offset} = context.pageParam || {
    limit: pageSize,
    offset: 0,
  };
  const data = await fetchQuery<ContactListSuccessResponseData>(
    '',
    {limit, offset},
    'GET',
  );
  console.log('data aa', data);
  return data;
};

const pageSize = 6;

const useContactList = () => {
  const {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery('fetchAllContacts', fetchContactList, {
    getNextPageParam: (lastPage, pages) => {
      const hasMorePage = lastPage.total > pageSize * pages.length;
      if (!hasMorePage) {
        return undefined;
      }
      return {limit: pageSize, offset: pages.length * pageSize};
    },
  });
  return {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};

const HomeScreen = () => {
  const {control} = useForm();
  const [search, setSearch] = useState<string>('');

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries('fetchAllContacts');
  }, [queryClient, search]);

  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useContactList();
  console.log('data', JSON.stringify(data));

  const renderContactItem = useCallback(
    ({item}: ListRenderItemInfo<ContactType>) => {
      return (
        <ContactItem
          id={item.id}
          name={item.name}
          phone_number={item.phone_number}
        />
      );
    },
    [],
  );

  const loadMoreContact = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

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

  const contacts = data?.pages.flatMap(page => page.contacts);
  // console.log('contacts', contacts);

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <SearchBar control={control} name="search_string" setSearch={setSearch} />
      <FlashList
        data={contacts as any}
        renderItem={renderContactItem}
        estimatedItemSize={20}
        refreshing={isFetching}
        onRefresh={loadMoreContact}
        onEndReached={loadMoreContact}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default HomeScreen;
