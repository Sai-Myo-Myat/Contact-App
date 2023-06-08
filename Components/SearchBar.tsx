import {Feather} from '@expo/vector-icons';
import React, {FC, useCallback} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';

import tw from 'twrnc';

interface Props {
  control: any;
  name: string;
  setSearch: (s: string) => void;
}

const SearchBar: FC<Props> = props => {
  const {
    field: {value, onChange},
  } = useController({...props});
  const {setSearch} = props;

  const onChangeX = useCallback(() => {
    setSearch(value);
  }, [setSearch, value]);

  return (
    <View
      style={[tw`flex-row items-center border-b border-[#9BA4B5] mx-4 mb-3`]}>
      <TextInput
        style={[tw` flex-2 p-3`, styles.input]}
        placeholder="Search contacts with name..."
        placeholderTextColor="#394867"
        defaultValue={value}
        onChangeText={onChange}
      />
      <Pressable style={[tw`mr-2`]} onPress={onChangeX}>
        <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
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
