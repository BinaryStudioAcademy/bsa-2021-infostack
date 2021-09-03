import { Color } from 'common/enums';
import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  text: string;
  onChange: (newValue: string) => void;
  onCancel: () => void;
};

export const SearchInput: React.FC<Props> = ({ text, onChange, onCancel }) => {
  return (
    <View style={view}>
      <TextInput
        style={input}
        value={text}
        onChangeText={onChange}
        placeholder="Search"
      />
      <TouchableNativeFeedback
        onPress={onCancel}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless(20)}
      >
        <View>
          <Icon name="x" style={icon} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const { input, view, icon } = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Color.WHITE,
    borderColor: Color.BORDER,
    borderWidth: 1,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    fontSize: 20,
    flex: 1,
  },
  icon: {
    fontSize: 20,
  },
});
