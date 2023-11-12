import React, {useState} from 'react';
import gStyle from '../assets/style';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../values/colors';
import Grid from '../components/Sudoku/Grid';
import {SudokuBoard, RootStackParamList} from '../types/types';
import {BoardContext} from '../utils/StateUtil';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/Entypo';

type BoardPickerProps = {
  boards: SudokuBoard[];
  navigation: NativeStackScreenProps<RootStackParamList, 'BoardPicker'>;
};

export function BoardPicker({
  boards,
  navigation,
}: BoardPickerProps): JSX.Element {
  const {t} = useTranslation();
  const {dispatch} = React.useContext(BoardContext);

  const [index, setIndex] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState(boards[index]);

  const [gridValues] = useState(selectedBoard.values);
  const gridMarked = Array.from({length: 9}, () =>
    Array.from({length: 9}, () => 0),
  );

  const nextBoardHandler = () => {
    if (index === boards.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setSelectedBoard(boards[index]);
  };

  const prevBoardHandler = () => {
    if (index === 0) {
      setIndex(boards.length - 1);
    } else {
      setIndex(index - 1);
    }
    setSelectedBoard(boards[index]);
  };

  const saveBoardHandler = () => {
    dispatch({content: selectedBoard});
    navigation.navigation.navigate('Sudoku', {board: selectedBoard});
  };

  return (
    <View style={gStyle.root}>
      <View style={gStyle.defaultContainer}>
        <Button
          icon={<Icon name="save" size={25} color="white" />}
          iconRight
          title={t('save')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
          onPress={() => saveBoardHandler()}
        />
        <Grid
          onNumberPress={() => {}}
          values={gridValues}
          marked={gridMarked}
        />
        <View style={styles.choiceContainer}>
          <Button
            icon={<Icon name="arrow-left" size={25} color="white" />}
            title={t('previous')}
            style={gStyle.button}
            containerStyle={gStyle.mediumButtonContainer}
            buttonStyle={gStyle.buttonDark}
            titleStyle={gStyle.smallText}
            onPress={() => prevBoardHandler()}
          />
          <Button
            icon={<Icon name="arrow-right" size={25} color="white" />}
            iconRight
            title={t('next')}
            style={gStyle.button}
            containerStyle={gStyle.mediumButtonContainer}
            buttonStyle={gStyle.buttonDark}
            titleStyle={gStyle.smallText}
            onPress={() => nextBoardHandler()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sudokuContainer: {
    width: '100%',
    height: 500,
    marginTop: 20,
    padding: 10,
  },
  numberContainer: {
    backgroundColor: COLORS.darkBackground,
    height: 100,
    width: '100%',
    padding: 10,
  },
  choiceContainer: {
    backgroundColor: COLORS.darkBackground,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
