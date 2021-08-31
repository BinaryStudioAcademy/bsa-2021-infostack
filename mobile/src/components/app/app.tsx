import * as React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from 'store';
import { Color } from 'common/enums';
import { RootStack } from 'navigation/root-stack';
import { Pages } from 'components/pages/pages';
import { Workspaces } from 'components/workspaces/workspaces';

export const App: React.FC = () => (
  <Provider store={store}>
    <StatusBar backgroundColor={Color.PRIMARY_DARK} />
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Workspaces"
        screenOptions={{
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: Color.PRIMARY },
        }}
      >
        <RootStack.Screen name="Workspaces" component={Workspaces} />
        <RootStack.Screen
          name="Pages"
          component={Pages}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  </Provider>
);
