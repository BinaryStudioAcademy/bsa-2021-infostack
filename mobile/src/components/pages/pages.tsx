import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { pagesActions, selectPages } from 'store';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Color } from 'common/enums';
import { PageListStack } from 'navigation/page-list-stack';
import { ExpandedPage } from './screens/expanded-page';
import { RootPages } from './screens/root-pages';
import { StyleSheet } from 'react-native';
import { Search } from 'components/search/search';
import { SearchButton } from 'components/search/search-button';

export const Pages: React.FC = () => {
  const pages = useAppSelector(selectPages);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(pagesActions.fetchPages());
  }, [dispatch]);

  if (!pages.length) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" color={Color.PRIMARY} />
      </View>
    );
  }

  return (
    <PageListStack.Navigator
      initialRouteName="RootPages"
      screenOptions={(props) => ({
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: Color.PRIMARY },
        headerRight: () => <SearchButton {...props} />,
      })}
    >
      <PageListStack.Screen
        name="RootPages"
        component={RootPages}
        options={{
          title: 'Pages',
        }}
        initialParams={{
          pages,
        }}
      />
      <PageListStack.Screen
        name="ExpandedPage"
        component={ExpandedPage}
        options={({ route }) => ({ title: route.params.page.title })}
      />
      <PageListStack.Screen
        name="Search"
        component={Search}
        options={{ animation: 'none', headerTitleAlign: 'left' }}
      />
    </PageListStack.Navigator>
  );
};

const { container } = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
