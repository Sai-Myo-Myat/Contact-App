import {View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Feather} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import tw from 'twrnc';

const CustomRightHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={[tw`flex-row justify-between`]}>
      <Pressable
        style={[tw`mr-2`]}
        onPress={() => {
          navigation.navigate('Search');
        }}>
        <Feather name="search" size={30} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Form', {id: null})}>
        <AntDesign name="plus" size={30} style={[tw`text-[#F1F6F9]`]} />
      </Pressable>
    </View>
  );
};

export default CustomRightHeader;
