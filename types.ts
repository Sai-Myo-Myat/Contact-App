import {Timestamp} from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
export type RootStackParamsList = {
  Home: undefined;
  Detail: {id: number};
  Form: {id: number};
  Search: undefined;
  Test: undefined;
};

export interface ContactType {
  id: number;
  name: string;
  phone_number: string;
  date_of_birth: Timestamp;
  remark: string;
}

export interface FormType {
  searchString: string;
  items: [{item: ContactType}];
}
