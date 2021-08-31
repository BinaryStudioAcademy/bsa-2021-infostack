import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { IPageNav } from 'common/interfaces';
import { PageListItem } from './page-list-item';

type Props = {
  pages: IPageNav[];
  onItemClick: (page: IPageNav) => void;
};

export const PageList: React.FC<Props> = ({ pages, onItemClick }) => (
  <FlatList
    style={styles.list}
    data={pages}
    renderItem={({ item }) => (
      <PageListItem
        onClick={() => onItemClick(item)}
        title={item.title}
        childPages={item.childPages}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);

const styles = StyleSheet.create({
  list: {
    paddingTop: 15,
  },
});
