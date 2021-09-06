import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Highlighter from 'react-native-highlight-words';

import { IFoundPageContent } from 'common/interfaces';

type Props = {
  query: string;
  result: IFoundPageContent;
};

export const SearchItem: React.FC<Props> = ({
  query,
  result: { content, title },
}) => (
  <View style={container}>
    <Highlighter
      style={text}
      highlightStyle={highlight}
      searchWords={[query]}
      textToHighlight={content || title}
    />
  </View>
);

const { container, text, highlight } = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  text: {
    fontSize: 20,
  },
  highlight: {
    fontWeight: 'bold',
  },
});
