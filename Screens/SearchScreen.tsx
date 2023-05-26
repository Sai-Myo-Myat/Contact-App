import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {ItemType} from '../types';

import {useFormContext} from 'react-hook-form';
import ContactItem from '../Components/ContactItem';
import SearchBar from '../Components/SearchBar';

const SearchScreen = () => {
  const {control, getValues} = useFormContext();

  const {items} = getValues();

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

  console.log('items from fieldArray', items);

  return (
    <View style={[tw`flex bg-[#212A3E] h-full`]}>
      <SearchBar control={control} name="searchString" />

      <View style={[tw` h-full mt-3`]}>
        <FlashList
          data={items}
          renderItem={renderContactItem}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

/*

[
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
          ]
*/
