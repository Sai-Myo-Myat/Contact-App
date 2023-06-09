import {useQuery} from 'react-query';
import {fetchQuery} from './base';
import {ContactResponseType} from '../types';

export const useContact = (id: number) => {
  return useQuery('fetchContact', async () => {
    const data = await fetchQuery<ContactResponseType>(`/${id}`, null, 'GET');
    console.log('back data', data);
    return data.data;
  });
};
