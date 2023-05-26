import React, {FC} from 'react';
import {Pressable, Text} from 'react-native';

import tw from 'twrnc';

interface Props {
  title: string;
  onPressFun: () => void;
}

const CustomButton: FC<Props> = ({title, onPressFun}) => {
  return (
    <Pressable
      onPress={onPressFun}
      style={[tw`text-[#F1F6F9] bg-[#394867] px-3 py-4 rounded-lg mt-2`]}>
      <Text style={[tw`text-[#F1F6F9] text-center`]}>{title}</Text>
    </Pressable>
  );
};
export default CustomButton;
