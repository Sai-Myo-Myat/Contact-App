import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {FormType, ItemType} from '../types';

import {useForm} from 'react-hook-form';
import ContactItem from '../Components/ContactItem';
import SearchBar from '../Components/SearchBar';
const SearchScreen = () => {
  const {control} = useForm<FormType>();

  const renderContactItem = useCallback(
    ({item}: ListRenderItemInfo<ItemType>) => {
      return (
        <ContactItem
          name={item.name}
          phoneNumber={item.phoneNumber}
          id={item.id}
        />
      );
    },
    [],
  );

  return (
    <View style={[tw`flex bg-[#212A3E] h-full`]}>
      <SearchBar control={control} name="searchString" />

      <View style={[tw` h-full mt-3`]}>
        <FlashList
          data={[
            {
              name: 'mgmg',
              phoneNumber: '09969601032',
              id: 12,
              dateOfBirth: '23-3-2023',
              remark: '',
            },
            {
              name: 'mgmg',
              phoneNumber: '09969601032',
              id: 13,
              dateOfBirth: '23-3-2023',
              remark: '',
            },
            {
              name: 'mgmg',
              phoneNumber: '09969601032',
              id: 15,
              dateOfBirth: '23-3-2023',
              remark: '',
            },
          ]}
          renderItem={renderContactItem}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
