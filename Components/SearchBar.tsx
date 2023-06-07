import {Feather} from '@expo/vector-icons';
import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';

import tw from 'twrnc';

// interface Props {
//   control: any;
//   name: string;
//   reset: () => void;
// }

const SearchBar = () => {
  // console.log(props);
  return (
    <View
      style={[tw`flex-row items-center border-b border-[#9BA4B5] mx-4 mb-3`]}>
      <TextInput
        style={[tw` flex-2 p-3`, styles.input]}
        placeholder="Search contacts with name..."
        placeholderTextColor="#394867"
      />
      <Pressable style={[tw`mr-2`]} onPress={() => console.log('searched')}>
        <Feather name="search" size={30} style={[tw`text-[#394867]`]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#9BA4B5',
  },
});

export default SearchBar;
