import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useAppDispatch, useAppSelector } from 'hooks';
import { pagesActions, selectPagesState } from 'store';
import { IPageNav } from 'common/interfaces';
import { PageListItem } from './page-list-item';
import { Color, RequestStatus } from 'common/enums';

type Props = {
  pages: IPageNav[];
  onItemNameClick: (page: IPageNav) => void;
  onItemChevronClick: (page: IPageNav) => void;
};

export const PageList: React.FC<Props> = ({
  pages,
  onItemNameClick,
  onItemChevronClick,
}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const dispatch = useAppDispatch();
  const { pagesStatus } = useAppSelector(selectPagesState);

  const onRefresh = () => {
    setIsRefreshing(true);

    dispatch(pagesActions.fetchPages()).then(() => setIsRefreshing(false));
  };

  let emptyContent;

  if (pagesStatus === RequestStatus.LOADING && !isRefreshing) {
    emptyContent = <ActivityIndicator size="large" color={Color.PRIMARY} />;
  } else if (pagesStatus === RequestStatus.SUCCEEDED) {
    emptyContent = <Text style={text}>There are no pages</Text>;
  } else if (pagesStatus === RequestStatus.FAILED) {
    emptyContent = (
      <>
        <Text style={text}>Error happened while getting pages</Text>
        <Text style={text}>Swipe down to try again</Text>
      </>
    );
  }

  const emptyContainer = <View style={empty}>{emptyContent}</View>;

  return (
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
      contentContainerStyle={list}
      ListEmptyComponent={emptyContainer}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
    />
  );
};

const { list, empty, text } = StyleSheet.create({
  list: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: Color.TEXT_DARK,
  },
});
