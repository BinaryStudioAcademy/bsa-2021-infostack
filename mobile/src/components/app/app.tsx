import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PageList } from '../page-list/page-list';
import { Login } from 'components/auth';
import { useAppSelector } from 'hooks';

const Stack = createNativeStackNavigator();

export const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isSignedIn = !!user?.id;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <>
            <Stack.Screen name="Page List" component={PageList} />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
