import {AntDesign} from '@expo/vector-icons';
import DatePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {FC, useCallback, useState} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';

interface Props {
  control: any;
  name: string;
}

const DatePickerController: FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    field: {value, onChange},
  } = useController({...props});

  const onChangeFun = useCallback<any>(
    (event: DateTimePickerEvent, date: Date) => {
      console.log('data is here', moment(date).format('DD-MM-YYYY'));
      setIsOpen(false);
      onChange(moment(date).format('DD-MM-YYYY'));
    },
    [onChange],
  );

  const openDatePicker = useCallback(() => {
    setIsOpen(true);
  }, []);

  console.log('here is dob', value);

  return (
    <View style={[tw`w-full `]}>
      <Text style={[tw`self-start text-[#F1F6F9] mb-2`]}>Date Of Birth</Text>
      <Pressable onPress={openDatePicker}>
        <View
          style={[
            tw`p-2 border border-[#394867] w-full rounded-lg flex-row justify-between items-center`,
          ]}>
          <Text style={[tw`text-[#9BA4B5]`]}>{value ? value : 'Select'}</Text>
          <AntDesign name="right" size={26} color="#9BA4B5" />
        </View>
      </Pressable>

      {isOpen && (
        <DatePicker value={undefined || new Date()} onChange={onChangeFun} />
      )}
    </View>
  );
};

export default DatePickerController;
