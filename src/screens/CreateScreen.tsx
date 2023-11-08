import React, {useState} from 'react';
import gStyle from '../assets/style';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS} from '../values/colors';
import NumberInterface from '../components/Sudoku/NumberInterface';
import Grid from '../components/Sudoku/Grid';
import {Difficulty, DrawMode, SudokuBoard} from '../types/types';
import {isValidBoard} from '../utils/SudokuUtils';
import uuid from 'react-native-uuid';

type CreateScreenProps = {
  board: SudokuBoard;
};

export function CreateScreen({board}: CreateScreenProps): JSX.Element {
  const {t} = useTranslation();

  const [gridValues, setValues] = useState(board.values);
  const marked = Array.from({length: 9}, () =>
    Array.from({length: 9}, () => 0),
  );

  const [drawMode, setDrawMode] = useState(DrawMode.Pencil);
  const [selectedItem, setSelectedItem] = useState<[number, number]>([-1, -1]);

  const handleNumberPress = (number: number) => {
    if (selectedItem[0] === -1 || selectedItem[1] === -1) {
      return;
    }
    if (drawMode === DrawMode.Pencil) {
      updateValue(selectedItem[0], selectedItem[1], number);
    }
  };

  const handleGridPress = (row: number, column: number) => {
    if (drawMode === DrawMode.Erase) {
      updateValue(row, column, 0);
    } else {
      setSelectedItem([row, column]);
    }
  };

  const updateValue = (row: number, column: number, value: number) => {
    const updatedValues = [...gridValues];
    updatedValues[row][column] = value;
    setValues(updatedValues);
  };

  const saveBoard = () => {
    const board = {
      id: uuid.v4().toString(),
      values: gridValues,
      markers: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
      difficulty: Difficulty.Unknown,
      createdAt: new Date().toISOString(),
    };

    if (!isValidBoard(board)) {
      return;
    }

    
  };

  return (
    <View style={gStyle.root}>
      <View style={gStyle.defaultContainer}>
        <Grid
          onNumberPress={handleGridPress}
          values={gridValues}
          marked={marked}
        />
      </View>
      <NumberInterface onNumberPress={handleNumberPress} />
      <View style={styles.choiceContainer}>
        <Button
          icon={<Icon name="eraser" size={25} color="white" />}
          title={t('erase')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
          onPress={() =>
            drawMode === DrawMode.Erase
              ? setDrawMode(DrawMode.Pencil)
              : setDrawMode(DrawMode.Erase)
          }
        />
        <Button
          icon={<Icon name="save" size={25} color="white" />}
          title={t('save')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
          onPress={saveBoard}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sudokuContainer: {
    width: '100%',
    height: 500,
    marginTop: 50,
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
