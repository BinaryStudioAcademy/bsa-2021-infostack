import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from 'store';
import { Root } from 'navigation/root-stack';
import { PageList } from '../page-list/page-list';

export const App: React.FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Pages" component={PageList} />
      </Root.Navigator>
    </NavigationContainer>
  </Provider>
);
