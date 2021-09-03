import { Color } from 'common/enums';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  onChange?: (newValue: string) => void;
};

export const SearchInput: React.FC<Props> = () => (
  <View style={view}>
    <TextInput style={input} />
  </View>
);

const { input, view } = StyleSheet.create({
  input: {
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    fontSize: 20,
    elevation: 3,
  },
  view: {
    padding: 15,
  },
});
