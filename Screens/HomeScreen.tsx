import React, {useState} from 'react';
import tw from 'twrnc';
import SearchBar from '../Components/SearchBar';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import ContactList from '../Components/ContactList';

const HomeScreen = () => {
  const {control} = useForm();
  const [search, setSearch] = useState<string>('');

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <SearchBar control={control} name="search_string" setSearch={setSearch} />
      <ContactList search={search} />
    </View>
  );
};

export default HomeScreen;
