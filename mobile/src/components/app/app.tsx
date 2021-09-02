import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from 'navigation/root-stack';
import { Login } from 'components/auth';
import { useAppSelector } from 'hooks';
import { Color } from 'common/enums';
import { Pages } from 'components/pages/pages';
import { Workspaces } from 'components/workspaces/workspaces';

export const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isSignedIn = !!user?.id;

  return (
    <>
      <StatusBar backgroundColor={Color.PRIMARY_DARK} />
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: { backgroundColor: Color.PRIMARY },
          }}
        >
          {isSignedIn ? (
            <>
              <RootStack.Screen name="Workspaces" component={Workspaces} />
              <RootStack.Screen
                name="Pages"
                component={Pages}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <RootStack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};
