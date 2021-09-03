import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from 'navigation/root-stack';
import { Login } from 'components/auth/login';
import { useAppSelector } from 'hooks';
import { Color } from 'common/enums';
import { Pages } from 'components/pages/pages';
import { Workspaces } from 'components/workspaces/workspaces';
import { MyTheme } from 'common/constants/theme';

export const App: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
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

// const { main } = StyleSheet.create({
//   main: {
//     borderWidth: 1,
//   },
// });
