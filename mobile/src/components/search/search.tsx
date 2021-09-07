import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';

import { pageService } from 'services/index';
import { IFoundPageContent } from 'common/interfaces';
import { DEBOUNCE_DELAY_MS, MINIMUM_QUERY_LENGTH } from 'common/constants';
import { PageListStackParamList } from 'navigation/page-list-stack';
import { SearchItem } from './components/search-item';
import { SearchInput } from './components/search-input';
import { EmptyListPlaceholder } from './components/empty-list-placeholder';

type Props = NativeStackScreenProps<PageListStackParamList, 'Search'>;

export const Search: React.FC<Props> = () => {
  const [text, setText] = React.useState('');
  const [results, setResults] = React.useState<IFoundPageContent[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const search = useDebouncedCallback((query: string) => {
    setIsLoading(true);

    pageService
      .searchContent(query)
      .then((res) => {
        const filtered = res.filter(
          (item) => Boolean(item.title) || Boolean(item.content),
        );
        setResults(filtered);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, DEBOUNCE_DELAY_MS);

  const handleChange = (value: string) => {
    if (value.trim().length >= MINIMUM_QUERY_LENGTH) {
      search(value);
    } else if (value.trim().length < MINIMUM_QUERY_LENGTH) {
      setResults([]);
    }

    setText(value);
  };

  const handleCancel = () => setText('');

  console.log(results);

  return (
    <View style={main}>
      <View style={searchContainer}>
        <SearchInput
          text={text}
          onChange={handleChange}
          onCancel={handleCancel}
        />
      </View>
      <FlatList
        data={results}
        renderItem={({ item }) => <SearchItem result={item} query={text} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={listContainer}
        ListEmptyComponent={() => (
          <EmptyListPlaceholder
            isLoading={isLoading}
            placeholderText={
              text.length < MINIMUM_QUERY_LENGTH
                ? 'Start typing to search'
                : "We couldn't find anything"
            }
          />
        )}
      />
    </View>
  );
};

const { main, searchContainer, listContainer } = StyleSheet.create({
  main: {
    flexGrow: 1,
  },
  searchContainer: {
    padding: 10,
  },
  listContainer: {
    padding: 10,
    flexGrow: 1,
  },
});
