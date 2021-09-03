import * as React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import { Color } from 'common/enums';
import { PageListStackParamList } from 'navigation/page-list-stack';

type Props = NativeStackScreenProps<PageListStackParamList>;

export const SearchButton: React.FC<Props> = ({ navigation }) => (
  <TouchableNativeFeedback
    onPress={() => navigation.navigate('Search')}
    background={TouchableNativeFeedback.SelectableBackgroundBorderless(20)}
  >
    <View>
      <Icon name="search" size={20} color={Color.LIGHT} />
    </View>
  </TouchableNativeFeedback>
);
