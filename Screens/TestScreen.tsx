import React, {Text, View} from 'react-native';
import {useQuery} from 'react-query';

import {db} from '../db';

const fetchingPromise = (args = []) => {
  //DECLARE @PageNumber AS INT DECLARE @RowsOfPage AS INT SET @PageNumber = 1 SET @RowsOfPage = 2 SELECT * FROM contact OFFSET (@PageNumber-1)*@RowsOfPage ROWS
  return new Promise((resolve, reject) => {
    return db.exec(
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
        return resolve(res);
      },
    );
  });
};

const fetchContact = async () => {
  return fetchingPromise()
    .then(res => {
      return res;
    })
    .catch(err => console.log('fetching error', err));
};

const TestScreen = () => {
  const {data} = useQuery('fetchContact', fetchContact);
  console.log('data from test', data);
  return (
    <View>
      <Text>test screen</Text>
    </View>
  );
};

export default TestScreen;
