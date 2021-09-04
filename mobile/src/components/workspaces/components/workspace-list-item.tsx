import * as React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

import { Color } from 'common/enums';

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
    borderRadius: 4,
    backgroundColor: Color.WHITE,
    elevation: 2,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
  },
});
