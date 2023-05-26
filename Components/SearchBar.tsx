import {Feather} from '@expo/vector-icons';
import React, {FC, useCallback} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useQuery} from 'react-query';

import tw from 'twrnc';
import {db} from '../db';

const findByNamePromise = (searchString: string) => {
  return new Promise((resolve, _reject) => {
    db.transaction(tx =>
      tx.executeSql(
        'SELECT * FROM contact WHERE name LIKE ?',
        [searchString],
        (txObj, {rows: {_array}}) => resolve(_array),
        (txObj, error: any) => error,
      ),
    );
  });
};

interface Props {
  control: any;
  name: string;
}

const SearchBar: FC<Props> = props => {
  const {
    field: {value, onChange},
  } = useController({...props});

  const findByName = useCallback(async () => {
    return findByNamePromise(value)
      .then(res => console.log(res))
      .catch(err => err);
  }, [value]);

  const {data, isSuccess} = useQuery('findByName', findByName);

  if (isSuccess) {
    console.log(data, 'filtered data');
  }

  return (
    <View style={[tw`flex-row items-center border-b border-[#9BA4B5] mx-3`]}>
      <TextInput
        style={[tw` flex-2 p-3`, styles.input]}
        placeholder="Search contacts with name..."
        placeholderTextColor="#394867"
        onChangeText={onChange}
      />
      <Pressable style={[tw`mr-2`]} onPress={findByName}>
        <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#F1F6F9',
  },
});

export default SearchBar;
