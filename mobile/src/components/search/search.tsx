import * as React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

import { PageListStackParamList } from 'navigation/page-list-stack';
import { SearchInput } from './components/search-input';

type Props = NativeStackScreenProps<PageListStackParamList, 'Search'>;

export const Search: React.FC<Props> = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <SearchInput />,
    });
  }, [navigation]);

  return <Text>Search</Text>;
};
