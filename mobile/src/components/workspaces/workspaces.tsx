import * as React from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { workspacesActions } from 'store';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks';
import { API_URL } from 'common/constants';
import { IWorkspace } from 'common/interfaces';
import { RequestStatus, CookieVariable } from 'common/enums';
import { RootParamList } from 'navigation/root-stack';
import { WorkspaceListItem } from './components/workspace-list-item';

type Props = NativeStackScreenProps<RootParamList, 'Workspaces'>;

export const Workspaces: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { workspaces, workspacesLoadingStatus } = useAppSelector(
    (state) => state.workspaces,
  );

  useEffect(() => {
    dispatch(workspacesActions.fetchWorkspaces());
  }, [dispatch]);

  const handleClick = async (workspace: IWorkspace) => {
    await CookieManager.set(API_URL, {
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
