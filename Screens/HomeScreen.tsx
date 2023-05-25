import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {useQuery} from 'react-query';
import tw from 'twrnc';

import ContactItem from '../Components/ContactItem';

import {db} from '../db';

interface ItemType {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  remark: string;
  id: number;
}

// interface ResponseType {
//   insetId: number;
//   rows: Array<ItemType>;
//   rowAffected: number;
// }

const fetchingPromise = (args = []) => {
  //DECLARE @PageNumber AS INT DECLARE @RowsOfPage AS INT SET @PageNumber = 1 SET @RowsOfPage = 2 SELECT * FROM contact OFFSET (@PageNumber-1)*@RowsOfPage ROWS
  return new Promise((resolve, reject) => {
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
        console.log('data', res);
        return resolve(res);
      },
    );
  });
};

const fetchContact = async () => {
  return fetchingPromise()
    .then(res => {
      // console.log('res from promise', res);
      return res;
    })
    .catch(err => console.log('fetching error', err));
};

const HomeScreen = () => {
  const {isLoading, isError, data, error} = useQuery(
    'fetchContact',
    fetchContact,
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    },
  );

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, dateOfBirth TEXT, remark TEXT)',
  //     );
  //   });
  // }, []);

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
  } else if (isError) {
    console.log('error', error);
  }

  // console.log(data);

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <FlashList
        data={data && data[0].rows}
        renderItem={renderContactItem}
        estimatedItemSize={20}
        extraData={data}
      />
    </View>
  );
};

export default HomeScreen;
