import {FlashList} from '@shopify/flash-list';
import React, {FC, useCallback} from 'react';
import {ActivityIndicator, ListRenderItemInfo, View, Text} from 'react-native';
import {ContactListSuccessResponseData, ContactType} from '../types';
import {QueryFunctionContext, QueryKey, useInfiniteQuery} from 'react-query';
import {fetchQuery} from '../api/base';
import ContactItem from './ContactItem';

import tw from 'twrnc';

const fetchContactList = async <T extends QueryKey = QueryKey>(
  context: QueryFunctionContext<T, {limit: number; offset: number}>,
) => {
  const {limit, offset} = context.pageParam || {
    limit: pageSize,
    offset: 0,
  };
  const data = await fetchQuery<ContactListSuccessResponseData>(
    '',
    {limit, offset, search: context?.meta?.search || ''},
    'GET',
  );
  // console.log('data aa', data);
  return data;
};

const pageSize = 6;

const useContactList = (search: string) => {
  //   console.log('useContactList search', search);
  const {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(`fetchAllContacts_${search}`, fetchContactList, {
    getNextPageParam: (lastPage, pages) => {
      const hasMorePage = lastPage.total > pageSize * pages.length;
      if (!hasMorePage) {
        return undefined;
      }
      return {limit: pageSize, offset: pages.length * pageSize};
    },
    meta: {search},
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

interface Props {
  search: string;
}

const ContactList: FC<Props> = ({search}) => {
  //   console.log('search from list', search);
  const {
    isLoading,
    isError,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useContactList(search);

  const renderContactItem = useCallback(
    ({item}: ListRenderItemInfo<ContactType>) => {
      return (
        <View>
          {item && (
            <ContactItem
              id={item?.id}
              name={item?.name}
              phone_number={item?.phone_number}
            />
          )}
        </View>
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

  let contacts = data?.pages.flatMap(page => page.contacts);
  contacts?.map(contact => {
    if (contact === undefined) {
      contacts = [];
    }
  });

  return contacts ? (
    <FlashList
      data={contacts as any}
      renderItem={renderContactItem as any}
      estimatedItemSize={20}
      refreshing={isFetching}
      onRefresh={loadMoreContact}
      onEndReached={loadMoreContact}
      onEndReachedThreshold={0.5}
    />
  ) : (
    <Text>There is no contact</Text>
  );
};

export default ContactList;
