import * as React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

type Props = {
  name: string;
  onClick: () => void;
};

export const WorkspaceListItem: React.FC<Props> = ({ name, onClick }) => (
  <TouchableNativeFeedback onPress={onClick}>
    <View style={card}>
      <Text style={text}>{name}</Text>
    </View>
  </TouchableNativeFeedback>
);

const { card, text } = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
  },
});
