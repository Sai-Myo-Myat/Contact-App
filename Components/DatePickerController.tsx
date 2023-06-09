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
    formState: {errors},
  } = useController({...props, rules: {required: 'Date Of Birth is required'}});

  const onChangeX = useCallback<any>(
    (event: DateTimePickerEvent, date: Date) => {
      setIsOpen(false);
      onChange(moment(date).format('YYYY-MM-DD'));
    },
    [onChange],
  );

  const openDatePicker = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <View style={[tw`w-full `]}>
      <View style={[tw`flex-row gap-2 items-center mb-2`]}>
        <Text style={[tw`self-start text-[#F1F6F9]`]}>Date Of Birth</Text>
        <Text style={[tw`text-[#E43F5A]`]}>
          {errors.date_of_birth ? ` : ${errors.date_of_birth.message} ` : ''}
        </Text>
      </View>
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
        <DatePicker value={undefined || new Date()} onChange={onChangeX} />
      )}
    </View>
  );
};

export default DatePickerController;
