import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export const SearchInput: React.FC = () => (
  <View style={view}>
    <TextInput style={input} />
  </View>
);

const { input, view } = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 20,
  },
  view: {
    width: '100%',
    paddingRight: 140,
  },
});
