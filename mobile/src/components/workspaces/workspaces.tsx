import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from 'navigation/root-stack';
import { WorkspaceListItem } from './components/workspace-list-item';

type Props = NativeStackScreenProps<RootParamList, 'Workspaces'>;

const data = [
  {
    id: '1',
    name: 'Mock Workspace 1',
  },
  {
    id: '2',
    name: 'Mock Workspace 2',
  },
  {
    id: '3',
    name: 'Mock Workspace 3',
  },
  {
    id: '4',
    name: 'Mock Workspace 4',
  },
];

export const Workspaces: React.FC<Props> = ({ navigation }) => {
  const handleClick = () => {
    navigation.navigate('Pages');
  };

  return (
    <FlatList
      style={list}
      data={data}
      renderItem={({ item }) => (
        <WorkspaceListItem onClick={handleClick} name={item.name} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const { list } = StyleSheet.create({
  list: {
    padding: 15,
  },
});
