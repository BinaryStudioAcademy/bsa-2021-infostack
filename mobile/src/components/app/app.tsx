import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PageList } from '../page-list/page-list';

const Stack = createNativeStackNavigator();

export const App: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Page List" component={PageList} />
    </Stack.Navigator>
  </NavigationContainer>
);
