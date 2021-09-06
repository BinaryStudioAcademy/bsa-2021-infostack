import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { selectPages } from 'store';
import { useAppSelector } from 'hooks';
import { IPageNav } from 'common/interfaces';
import { PageListStackParamList } from 'navigation/page-list-stack';
import { PageList } from '../components/page-list';
import { useAppDispatch } from 'hooks';
import { pagesActions } from 'store';

type Props = NativeStackScreenProps<PageListStackParamList, 'RootPages'>;

export const RootPages: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(selectPages);

  const handleNameClick = (page: IPageNav) => {
    dispatch(pagesActions.fetchCurrentPage(page.id));
    navigation.navigate('Page', { page });
  };

  const handleChevronClick = (page: IPageNav) => {
    const hasChildPages = Boolean(page.childPages.length);

    if (hasChildPages) {
      navigation.navigate('ExpandedPage', { page });
    }
  };

  return (
    <PageList
      pages={pages}
      onItemNameClick={handleNameClick}
      onItemChevronClick={handleChevronClick}
    />
  );
};
