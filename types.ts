export type RootStackParamsList = {
  Home: undefined;
  Detail: {id: number};
  Form: {id: number};
};

export interface ContactType {
  id: number;
  name: string;
  phone_number: string;
  date_of_birth?: string;
  remark?: string;
}

export interface ContactListSuccessResponseData {
  contacts: ContactType[];
  total: number;
}

export interface ContextType {
  search_string: string;
}
