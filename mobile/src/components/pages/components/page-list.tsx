import * as React from 'react';
import { FlatList } from 'react-native';

import { IPageNav } from 'common/interfaces';
import { PageListItem } from './page-list-item';

type Props = {
  pages: IPageNav[];
  onItemNameClick: (page: IPageNav) => void;
  onItemChevronClick: (page: IPageNav) => void;
};

export const PageList: React.FC<Props> = ({
  pages,
  onItemNameClick,
  onItemChevronClick,
}) => (
  <FlatList
    data={pages}
    renderItem={({ item }) => (
      <PageListItem
        onNameClick={() => onItemNameClick(item)}
        onChevronClick={() => onItemChevronClick(item)}
        title={item.title}
        childPages={item.childPages}
      />
    )}
    keyExtractor={(item) => item.id}
  />
);
