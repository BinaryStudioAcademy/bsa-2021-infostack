import * as React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from 'store';
import { Color } from 'common/enums';
import { Pages } from 'components/pages/pages';

export const App: React.FC = () => (
  <Provider store={store}>
    <StatusBar backgroundColor={Color.PRIMARY_DARK} />
    <NavigationContainer>
      <Pages />
    </NavigationContainer>
  </Provider>
);
