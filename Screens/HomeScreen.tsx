import {View, Text, ActivityIndicator} from 'react-native';
import React, {FC, useCallback, useEffect} from 'react';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import tw from 'twrnc';
import {useQueryClient, useQuery} from 'react-query';

import ContactItem from '../Components/ContactItem';

import {db} from '../db';

interface ItemType {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  remark: string;
  id: number;
}

interface ResponseType {
  insetId: number;
  rows: [];
  rowAffected: number;
}

const fetchingPromise = (args = []) => {
  //DECLARE @PageNumber AS INT DECLARE @RowsOfPage AS INT SET @PageNumber = 1 SET @RowsOfPage = 2 SELECT * FROM contact OFFSET (@PageNumber-1)*@RowsOfPage ROWS
  return new Promise<ResponseType>((resolve, reject) => {
    db.exec(
      [
        {
          sql: 'SELECT * FROM contact',
          args,
        },
      ],
      false,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        return res;
      },
    );
  });
};

const fetchData = async () => {
  return fetchingPromise()
    .then(res => {
      // console.log("res", res)
      return res.rows;
    })
    .catch(err => console.log('error:', err));
};

const HomeScreen: FC = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({queryKey: 'fetchContact'});

  const {isLoading, data} = useQuery('fetchContact', fetchData);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)',
      );
    });
  }, []);

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

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  }

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <FlashList
        data={data as ItemType[]}
        renderItem={renderContactItem}
        estimatedItemSize={20}
        extraData={data}
      />
    </View>
  );
};

export default HomeScreen;
