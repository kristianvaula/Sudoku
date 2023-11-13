import React, {useState} from 'react';
import gStyle from '../assets/style';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import NumberInterface from '../components/Sudoku/NumberInterface';
import Grid from '../components/Sudoku/Grid';
import {DrawMode, SudokuBoard} from '../types/types';

type SudokuScreenProps = {
  board: SudokuBoard;
};

export function SudokuScreen({board}: SudokuScreenProps): JSX.Element {
  const {t} = useTranslation();

  const [gridValues, setValues] = useState(board.values);
  const [gridMarked, setMarked] = useState(board.markers);

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
    } else if (drawMode === DrawMode.Marker) {
      updateMarked(row, column, true);
    } else {
      setSelectedItem([row, column]);
    }
  };

  const updateValue = (row: number, column: number, value: number) => {
    const updatedValues = [...gridValues];
    updatedValues[row][column] = value;
    setValues(updatedValues);
  };

  const updateMarked = (row: number, column: number, marking: boolean) => {
    const updatedMarked = [...gridMarked];
    updatedMarked[row][column] = marking ? 1 : 0;
    setMarked(updatedMarked);
  };

  return (
    <View style={[gStyle.root, gStyle.darkBackground]}>
      <View style={gStyle.defaultContainer}>
        <Grid
          onNumberPress={handleGridPress}
          values={gridValues}
          marked={gridMarked}
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
          icon={<Icon name="edit" size={25} color="white" />}
          title={t('notes')}
          style={gStyle.button}
          containerStyle={gStyle.mediumButtonContainer}
          buttonStyle={gStyle.buttonDark}
          titleStyle={gStyle.mediumText}
          onPress={() =>
            drawMode === DrawMode.Marker
              ? setDrawMode(DrawMode.Pencil)
              : setDrawMode(DrawMode.Marker)
          }
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
    height: 100,
    width: '100%',
    padding: 10,
  },
  choiceContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
