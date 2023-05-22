import {View, Text, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect} from 'react';

import {FlashList} from '@shopify/flash-list';
import tw from 'twrnc';
import {useQueryClient, useQuery} from 'react-query';

import ContactItem from '../Components/ContactItem';

import {db} from '../db';

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
        return res[0].rows
      },
    );
  });
};

const fetchData = async () => {
  return fetchingPromise()
    .then(res => {
      // console.log("res", res)
      return res;
    })
    .catch(err => console.log('error:', err));
};

const HomeScreen = () => {
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

  if (isLoading) {
    return (
      <View style={[tw`bg-[#212A3E] w-full h-full p-10`]}>
        <ActivityIndicator />
        <Text style={[tw`text-[#F1F6F9]`]}>Loading ......</Text>
      </View>
    );
  }

  const RenderContactItem = useCallback(() => {
    return (
      <ContactItem
        name={item?.name}
        phoneNumber={item.phoneNumber}
        id={item.id}
      />
    );
  }, []);

  return (
    <View style={[tw`bg-[#212A3E] w-full h-full`]}>
      <FlashList
        data={
          data
            ? [data]
            : [
                {
                  name: 'Test User',
                  phoneNumber: '093522453',
                  dateOfBirth: '2000-4-14',
                  remark: 'remark (optional)',
                },
              ]
        }
        renderItem={}
        estimatedItemSize={20}
        extraData={data}
      />
    </View>
  );
};

export default HomeScreen;
