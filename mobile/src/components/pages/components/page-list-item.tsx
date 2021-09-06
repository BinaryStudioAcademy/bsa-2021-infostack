import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

import { Color } from 'common/enums';
import { IPageNav } from 'common/interfaces';

type Props = {
  title: string;
  childPages: IPageNav[];
  onNameClick: () => void;
  onChevronClick: () => void;
};

export const PageListItem: React.FC<Props> = ({
  title,
  childPages,
  onNameClick,
  onChevronClick,
}) => {
  const hasChildPages = Boolean(childPages.length);

  return (
    <View style={row}>
      <TouchableNativeFeedback
        onPress={onNameClick}
        background={TouchableNativeFeedback.Ripple(Color.PRIMARY, false)}
      >
        <View style={titleContainer}>
          <Text style={text}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
      {hasChildPages && (
        <TouchableNativeFeedback
          onPress={onChevronClick}
          background={TouchableNativeFeedback.Ripple(Color.PRIMARY, false)}
        >
          <View style={chevronContainer}>
            <Icon name="chevron-right" size={28} color={Color.SECONDARY} />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const { row, text, titleContainer, chevronContainer } = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingVertical: 15,
  },
  text: {
    fontSize: 20,
  },
  titleContainer: {
    width: '80%',
    paddingLeft: 20,
  },
  chevronContainer: {
    paddingRight: 20,
  },
});
