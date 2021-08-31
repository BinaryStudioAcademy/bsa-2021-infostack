import * as React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PageListStackParamList } from 'navigation/page-list-stack';

import { IPageNav } from 'common/interfaces';
import { PageList } from '../components/page-list';

type Props = NativeStackScreenProps<PageListStackParamList, 'ExpandedPage'>;

export const ExpandedPage: React.FC<Props> = ({ navigation, route }) => {
  const { title, childPages } = route.params.page;

  const handleClick = (page: IPageNav) => {
    const hasChildPages = Boolean(page.childPages.length);

    if (hasChildPages) {
      navigation.navigate('ExpandedPage', { page });
    }
  };

  return (
    <View>
      <Text>{title}</Text>
      <PageList pages={childPages} onItemClick={handleClick} />
    </View>
  );
};
