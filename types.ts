export type RootStackParamsList = {
  Home: undefined;
  Detail: {id: number};
  Form: {id: number};
  Search: undefined;
  Test: undefined;
};

export interface ItemType {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
  remark: string;
  id: number;
}

export interface FormType {
  searchString: string;
  items: [{item: ItemType}];
}
