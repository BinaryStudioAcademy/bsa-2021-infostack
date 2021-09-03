import * as React from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CookieManager from '@react-native-cookies/cookies';

import { RootParamList } from 'navigation/root-stack';
import { WorkspaceListItem } from './components/workspace-list-item';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks';
import { workspaceActions } from 'store/workspaces';
import { RequestStatus, CookieVariable } from 'common/enums';
import { IWorkspace } from 'common/interfaces';

type Props = NativeStackScreenProps<RootParamList, 'Workspaces'>;

export const Workspaces: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { workspaces, workspacesLoadingStatus } = useAppSelector(
    (state) => state.workspaces,
  );

  useEffect(() => {
    dispatch(workspaceActions.fetchWorkspaces());
  }, [dispatch]);

  const handleClick = async (workspace: IWorkspace) => {
    await CookieManager.set('http://10.0.2.2:3001', {
      name: CookieVariable.WORKSPACE_ID,
      value: workspace.id,
      path: '/',
    });

    navigation.navigate('Pages');
  };

  if (workspacesLoadingStatus === RequestStatus.LOADING) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={workspaces}
      renderItem={({ item }) => (
        <WorkspaceListItem
          onClick={handleClick.bind(null, item)}
          name={item.title}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={list}
    />
  );
};

const { list } = StyleSheet.create({
  list: {
    padding: 15,
  },
});
