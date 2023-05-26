import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';

import {useFieldArray, useFormContext} from 'react-hook-form';
import SearchBar from '../Components/SearchBar';

const SearchScreen = () => {
  const {control, reset} = useFormContext();

  const {fields} = useFieldArray({
    control,
    name: 'items',
  });

  console.log('items from fieldArray', fields);

  return (
    <View style={[tw`flex bg-[#212A3E] h-full`]}>
      <SearchBar control={control} name="searchString" reset={reset} />
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
