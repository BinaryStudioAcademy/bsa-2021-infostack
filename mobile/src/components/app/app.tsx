import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { selectUser } from 'store';
import { useAppSelector } from 'hooks';
import { Color } from 'common/enums';
import { MyTheme } from 'common/constants';
import { Login } from 'components/auth/login';
import { Pages } from 'components/pages/pages';
import { Workspaces } from 'components/workspaces/workspaces';
import { RootStack } from 'navigation/root-stack';

export const App: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isSignedIn = !!user?.id;

  return (
    <>
      <StatusBar backgroundColor={Color.PRIMARY_DARK} />
      <NavigationContainer theme={MyTheme}>
        <RootStack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
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
