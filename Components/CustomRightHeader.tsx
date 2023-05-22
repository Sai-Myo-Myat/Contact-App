import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';

import {AntDesign, Feather} from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import tw from 'twrnc';
import {RootStackParamsList} from '../types';

const CustomRightHeader = () => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamsList, 'Home'>>();

  const goToForm = useCallback(() => {
    navigate('Form', {id: 0});
  }, [navigate]);

  const goToSearch = useCallback(() => {
    navigate('Search');
  }, [navigate]);

  return (
    <View style={[tw`flex-row justify-between`]}>
      <Pressable style={[tw`mr-2`]} onPress={goToSearch}>
        <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>
      <Pressable onPress={goToForm}>
        <AntDesign name="plus" size={30} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>
    </View>
  );
};

export default CustomRightHeader;
