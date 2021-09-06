import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Color } from 'common/enums';
import { IPageNav } from 'common/interfaces';
import { PageListStackParamList } from 'navigation/page-list-stack';
import { PageList } from '../components/page-list';

type Props = NativeStackScreenProps<PageListStackParamList, 'ExpandedPage'>;

export const ExpandedPage: React.FC<Props> = ({ navigation, route }) => {
  const { title, childPages } = route.params.page;

  const handleClick = (page: IPageNav) => {
    const hasChildPages = Boolean(page.childPages.length);

    if (hasChildPages) {
      navigation.push('ExpandedPage', { page });
    }
  };

  return (
    <View>
      <View style={rootPage}>
        <Icon style={icon} name="file-text" size={28} color={Color.PRIMARY} />
        <Text style={text}>{title}</Text>
      </View>
      <PageList pages={childPages} onItemClick={handleClick} />
    </View>
  );
};

const { rootPage, icon, text } = StyleSheet.create({
  rootPage: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 20,
  },
});
