import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootParamList = {
  Workspaces: undefined;
  Pages: undefined;
  Login: undefined;
};

export const RootStack = createNativeStackNavigator<RootParamList>();
