import React from 'react';
import '../assets/i18n/i18n';
import {Text} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {COLORS} from '../values/colors';
import {Difficulty} from '../types/types';
import {useTranslation} from 'react-i18next';

import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

type DifficultyButtonsProps = {
  onChange: (difficulty: Difficulty) => void;
  buttonStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
};

const DifficultyButtons = ({
  onChange,
  buttonStyle,
  containerStyle,
  titleStyle,
}: DifficultyButtonsProps): JSX.Element => {
  const {t} = useTranslation();
  const [state, setState] = React.useState(Difficulty.Unknown);

  const buttonComponents = (): React.ReactElement[] => {
    return Object.values(Difficulty).map(diff => (
      <Text style={titleStyle}>{t(diff)}</Text>
    ));
  };

  const onPress = (selected: number) => {
    const newDiff = Object.values(Difficulty)[selected];
    setState(newDiff);
    onChange(newDiff);
  };

  return (
    <ButtonGroup
      onPress={onPress}
      selectedIndex={Object.values(Difficulty).indexOf(state)}
      buttons={buttonComponents()}
      buttonStyle={buttonStyle}
      selectedButtonStyle={styles.selectedStyle}
      containerStyle={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  selectedStyle: {
    backgroundColor: COLORS.selected,
  },
});

export default DifficultyButtons;
