import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

import { PageListStackParamList } from 'navigation/page-list-stack';
import { SearchInput } from './components/search-input';

type Props = NativeStackScreenProps<PageListStackParamList, 'Search'>;

export const Search: React.FC<Props> = () => {
  // const [text, setText] = React.useState('');

  // const handleChange = (newValue: string) => setText(newValue);

  return (
    <>
      <View style={main}>
        <SearchInput />
      </View>
    </>
  );
};

const { main } = StyleSheet.create({
  main: {
    padding: 10,
  },
});
