import React from 'react';
import '../assets/i18n/i18n';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {createEmptyBoard, getRandomBoard} from '../utils/SudokuUtils';
import Button from '../components/Button';
import gStyle from '../assets/style';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';

enum BoardChoice {
  EASY,
  MEDIUM,
  HARD,
  RANDOM,
}
type BoardChooserScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BoardChooser'
>;

export function BoardChooser({
  navigation,
}: BoardChooserScreenProps): JSX.Element {
  const {t} = useTranslation();

  const handleButtonPress = async (choice: BoardChoice) => {
    switch (choice) {
      case BoardChoice.EASY:
        const easyBoard = createEmptyBoard();
        navigation.navigate('Sudoku', {board: easyBoard});
        break;
      case BoardChoice.MEDIUM:
        const mediumBoard = createEmptyBoard();
        navigation.navigate('Sudoku', {board: mediumBoard});
        break;
      case BoardChoice.HARD:
        const hardBoard = createEmptyBoard();
        navigation.navigate('Sudoku', {board: hardBoard});
        break;
      case BoardChoice.RANDOM:
        navigation.navigate('Sudoku', {board: await getRandomBoard()});
        break;
    }
  };

  return (
    <View
      style={[
        gStyle.root,
        gStyle.fullWidth,
        gStyle.alignCenter,
        gStyle.justifyCenter,
      ]}>
      <View style={[gStyle.fullWidth, gStyle.alignCenter]}>
        <Button
          text={t('easy')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => handleButtonPress(BoardChoice.EASY)}
        />
        <Button
          text={t('medium')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => handleButtonPress(BoardChoice.MEDIUM)}
        />
        <Button
          text={t('hard')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => handleButtonPress(BoardChoice.HARD)}
        />
        <Button
          text={t('random')}
          containerStyle={gStyle.largeButtonContainer}
          buttonStyle={gStyle.button}
          titleStyle={gStyle.mediumText}
          onPress={() => handleButtonPress(BoardChoice.RANDOM)}
        />
      </View>
    </View>
  );
}
