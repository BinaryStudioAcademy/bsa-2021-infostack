import * as React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

import { useAppSelector } from 'hooks';
import {
  selectCurrentPage,
  selectCurrentPageStatus,
} from 'store/pages/selectors';
import { RequestStatus } from 'common/enums';

export const Page: React.FC = () => {
  const page = useAppSelector(selectCurrentPage);
  const currentPageStatus = useAppSelector(selectCurrentPageStatus);

  if (currentPageStatus === RequestStatus.LOADING) {
    return (
      <View style={spinnerContainer}>
        <Text>
          <ActivityIndicator size="large" />;
        </Text>
      </View>
    );
  }

  return (
    <View style={container}>
      <View style={titleContainer}>
        <Text style={title}>{page?.pageContents[0].title}</Text>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic" style={scrollView}>
        <Markdown style={{ body, text }}>
          {page?.pageContents[0].content?.trim() || 'Empty page'}
        </Markdown>
      </ScrollView>
    </View>
  );
};

const {
  container,
  titleContainer,
  scrollView,
  body,
  title,
  text,
  spinnerContainer,
} = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    paddingLeft: 10,
    marginBottom: 15,
  },
  title: {
    color: '#495057',
    fontSize: 24,
  },
  scrollView: {
    height: '100%',
  },
  body: { paddingLeft: 10, paddingRight: 10 },
  text: {
    color: '#333',
  },
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
