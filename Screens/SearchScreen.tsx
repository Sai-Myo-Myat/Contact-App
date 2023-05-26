import {Feather} from '@expo/vector-icons';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import React, {useCallback} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import tw from 'twrnc';
import ContactItem from '../Components/ContactItem';
import {ItemType} from '../types';

const styles = StyleSheet.create({
  input: {
    color: '#F1F6F9',
  },
});

const SearchScreen = () => {
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
      <View style={[tw`flex-row items-center border-b border-[#9BA4B5] mx-3`]}>
        <TextInput
          style={[tw` flex-2 p-3`, styles.input]}
          placeholder="Search contacts with name..."
          placeholderTextColor="#394867"
        />
        <Pressable style={[tw`mr-2`]}>
          <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
        </Pressable>
      </View>

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
