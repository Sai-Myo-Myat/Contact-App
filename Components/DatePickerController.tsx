import React, {FC, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import tw from 'twrnc';

interface Props {
  control: any;
  dateOfBirth: string;
}

type OpenType = boolean;

const DatePickerController: FC<Props> = ({control, dateOfBirth}) => {
  const {open, setOpen} = useState<OpenType>(false);
  return (
    <View>
      <Pressable
        style={[
          tw`self-start border border-[#394867] px-2 py-3 rounded-lg w-full`,
          styles.textInput,
        ]}>
        <Text style={[tw`text-[#F1F6F9]`]}>date of birth</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: '#212A3E',
  },
});

export default DatePickerController;
