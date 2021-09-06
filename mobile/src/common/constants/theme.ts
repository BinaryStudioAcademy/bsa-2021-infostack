import { Theme } from '@react-navigation/native';

import { Color } from 'common/enums';

export const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: Color.PRIMARY,
    background: Color.LIGHT,
    card: Color.PRIMARY,
    text: Color.TEXT_LIGHT,
    border: Color.SECONDARY,
    notification: Color.PRIMARY,
  },
};
