import {useQuery} from 'react-query';
import {fetchQuery} from './base';
import {ContactType} from '../types';

export const useContact = (id: number) => {
  return useQuery('fetchContact', async () => {
    const data = await fetchQuery<ContactType>(`/${id}`, null, 'GET');
    return data;
  });
};
