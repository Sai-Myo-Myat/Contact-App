import {Feather} from '@expo/vector-icons';
import {FlashList} from '@shopify/flash-list';
import React, {FC, useCallback} from 'react';
import {useController, useFieldArray} from 'react-hook-form';
import {
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import tw from 'twrnc';
import {db} from '../db';
import {ItemType} from '../types';
import ContactItem from './ContactItem';

const findByNamePromise = (searchString: string) => {
  return new Promise((resolve, _reject) => {
    db.transaction(tx =>
      tx.executeSql(
        'SELECT name, phoneNumber, id, remark FROM contact WHERE name = ?',
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
  reset: () => void;
}

const SearchBar: FC<Props> = props => {
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
  const {
    field: {value, onChange},
  } = useController({...props});

  const {control, reset} = props;

  const {fields, append} = useFieldArray({
    control,
    name: 'items',
  });

  const findByName = useCallback<any>(async () => {
    return findByNamePromise(value)
      .then(res => {
        reset();
        console.log('id test', res);
        append(res);
        return res;
      })
      .catch(err => err);
  }, [append, value, reset]);

  return (
    <View>
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
      <View style={[tw` h-full mt-3`]}>
        <FlashList
          data={fields as any}
          renderItem={renderContactItem}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#F1F6F9',
  },
});

export default SearchBar;
