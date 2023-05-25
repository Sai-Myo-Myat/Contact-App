import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

import {Feather} from '@expo/vector-icons';
import tw from 'twrnc';

import {FlashList} from '@shopify/flash-list';

const styles = StyleSheet.create({
  input: {
    color: '#F1F6F9',
  },
});

const SearchScreen = () => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-around px-3 border-b border-[#394867]`,
      ]}>
      <TextInput
        style={[tw` text-lg p-2 m-3 flex-2`, styles.input]}
        placeholder="search.."
        placeholderTextColor="#F1F6F9"
      />
      <Pressable style={[tw`mr-2`]} onPress={() => console.log('search')}>
        <Feather name="search" size={23} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>

      <View>
        <Text>Hello</Text>
        <FlashList
          data={['name', 'name']}
          renderItem={item => <Text>{item}</Text>}
          estimatedItemSize={20}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
