import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { selectPages } from 'store';
import { useAppSelector } from 'hooks';
import { IPageNav } from 'common/interfaces';
import { PageListStackParamList } from 'navigation/page-list-stack';
import { PageList } from '../components/page-list';

type Props = NativeStackScreenProps<PageListStackParamList, 'RootPages'>;

export const RootPages: React.FC<Props> = ({ navigation }) => {
  const pages = useAppSelector(selectPages);

  const handleClick = (page: IPageNav) => {
    const hasChildPages = Boolean(page.childPages.length);

    if (hasChildPages) {
      navigation.navigate('ExpandedPage', { page });
    }
  };

  return <PageList pages={pages} onItemClick={handleClick} />;
};
