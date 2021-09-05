import * as React from 'react';

import { pagesActions } from 'store';
import { useAppDispatch } from 'hooks';
import { Color } from 'common/enums';
import { Search } from 'components/search/search';
import { SearchButton } from 'components/search/search-button';
import { PageListStack } from 'navigation/page-list-stack';
import { ExpandedPage } from './screens/expanded-page';
import { RootPages } from './screens/root-pages';

export const Pages: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(pagesActions.fetchPages());
  }, [dispatch]);

  return (
    <PageListStack.Navigator
      initialRouteName="RootPages"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: Color.PRIMARY },
      }}
    >
      <PageListStack.Group
        screenOptions={(props) => ({
          headerRight: () => <SearchButton {...props} />,
        })}
      >
        <PageListStack.Screen
          name="RootPages"
          component={RootPages}
          options={{
            title: 'Pages',
          }}
        />
        <PageListStack.Screen
          name="ExpandedPage"
          component={ExpandedPage}
          options={({ route }) => ({ title: route.params.page.title })}
        />
      </PageListStack.Group>
      <PageListStack.Screen
        name="Search"
        component={Search}
        options={{ animation: 'none' }}
      />
    </PageListStack.Navigator>
  );
};
