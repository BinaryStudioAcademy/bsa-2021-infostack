import * as React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from 'hooks';
import { selectPages, pagesActions } from 'store';

export const PageList: React.FC = () => {
  const pages = useAppSelector(selectPages);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(pagesActions.fetchPages());
  }, [dispatch]);

  return (
    <FlatList
      data={pages}
      renderItem={({ item }) => <Text style={styles.row}>{item.title}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 15,
    marginTop: 5,
  },
});
