import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IPageNav } from 'common/interfaces';

export type PageListStackParamList = {
  RootPages: { pages: IPageNav[] };
  ExpandedPage: { page: IPageNav };
};

export const PageListStack =
  createNativeStackNavigator<PageListStackParamList>();