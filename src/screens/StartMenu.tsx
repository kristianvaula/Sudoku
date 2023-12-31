import React from 'react';
import '../assets/i18n/i18n';
import {View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getRandomBoard} from '../utils/SudokuUtil';
import Button from '../components/Button';
import gStyle from '../assets/style';
import {Difficulty, RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {getBoard} from '../utils/StorageUtil';

enum BoardChoice {
  EASY,
  MEDIUM,
  HARD,
  RANDOM,
  SELECT,
}
type BoardChooserScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'StartMenu'
>;

export function StartMenu({navigation}: BoardChooserScreenProps): JSX.Element {
  const {t} = useTranslation();

  const handleButtonPress = async (choice: BoardChoice) => {
    switch (choice) {
      case BoardChoice.EASY:
        const easyBoard = await getBoard(Difficulty.Easy);
        if (easyBoard !== null) {
          navigation.navigate('Sudoku', {board: easyBoard});
        } else {
          navigation.goBack();
        }
        break;
      case BoardChoice.MEDIUM:
        const mediumBoard = await getBoard(Difficulty.Medium);
        if (mediumBoard !== null) {
          navigation.navigate('Sudoku', {board: mediumBoard});
        } else {
          navigation.goBack();
        }
        break;
      case BoardChoice.HARD:
        const hardBoard = await getBoard(Difficulty.Hard);
        if (hardBoard !== null) {
          navigation.navigate('Sudoku', {board: hardBoard});
        } else {
          navigation.goBack();
        }
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
        <Text style={[gStyle.largeText, styles.marginBottomLarge]}>
          {t('pick')}
        </Text>
        <View style={[gStyle.fullWidth, gStyle.alignCenter, styles.border]}>
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
        </View>
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

const styles = StyleSheet.create({
  buttonContainerBorder: {
    width: '80%',
    margin: 20,
    borderBottomWidth: 1,
  },
  marginBottomLarge: {
    marginBottom: 50,
  },
  border: {
    width: '75%',
    borderBottomWidth: 1,
  },
});
