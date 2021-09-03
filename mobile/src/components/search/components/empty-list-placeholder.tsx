import { Color } from 'common/enums';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Props = {
  isLoading: boolean;
  placeholderText: string;
};

export const EmptyListPlaceholder: React.FC<Props> = ({
  isLoading,
  placeholderText,
}) => {
  let content;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={Color.PRIMARY} />;
  } else {
    content = <Text style={text}>{placeholderText}</Text>;
  }

  return <View style={container}>{content}</View>;
};

const { container, text } = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
