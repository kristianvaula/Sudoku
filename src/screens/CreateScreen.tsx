import React, {useState, useEffect} from 'react';
import gStyle from '../assets/style';
import {View, StyleSheet, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Entypo';
import {COLORS} from '../values/colors';
import NumberInterface from '../components/Sudoku/NumberInterface';
import Grid from '../components/Sudoku/Grid';
import {DrawMode, SudokuBoard, getDifficulty} from '../types/types';
import {isValidBoard} from '../utils/SudokuUtil';
import uuid from 'react-native-uuid';
import {RootStackParamList} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {saveBoard} from '../utils/StorageUtil';
import DifficultyButtons from '../components/DifficultyButtons';
import {HeaderBackButton} from '@react-navigation/elements';
import {useStateValue} from '../utils/StateUtil';

type CreateScreenProps = {
  board: SudokuBoard;
  navigation: NativeStackScreenProps<
    RootStackParamList,
    'Create'
  >['navigation'];
};

export function CreateScreen({
  board,
  navigation,
}: CreateScreenProps): JSX.Element {
  const {t} = useTranslation();
  const {dispatch} = useStateValue();

  const [gridValues, setValues] = useState(board.values);
  const [difficulty, setDifficulty] = useState(getDifficulty(''));
  const marked = board.markers;

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

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            const state = board;
            state.values = gridValues;
            dispatch({type: 'SET_BOARD', payload: state});
            navigation.navigate('Home');
          }}
        />
      ),
    });
  });

  const saveBoardEventHandler = async () => {
    const newBoard: SudokuBoard = {
      id: uuid.v4().toString(),
      values: gridValues,
      markers: Array.from({length: 9}, () => Array.from({length: 9}, () => 0)),
      difficulty: difficulty,
      createdAt: new Date().toISOString(),
    };

    if (!isValidBoard(newBoard)) {
      Alert.alert(t('invalid-board'));
      return;
    }

    const result: boolean = await saveBoard(newBoard);
    if (result) {
      Alert.alert(t('save-board'), t('board-saved'), [
        {text: t('ok'), onPress: () => navigation.goBack()},
        {text: t('cancel'), onPress: () => {}},
      ]);
    } else {
      Alert.alert(t('save-board'), t('board-not-saved'));
    }
  };

  const handleDifficultyChange = (diff: string) => {
    setDifficulty(getDifficulty(diff));
  };

  return (
    <View style={gStyle.root}>
      <View style={gStyle.defaultContainer}>
        <DifficultyButtons
          onChange={handleDifficultyChange}
          containerStyle={gStyle.difficultyPickerContainer}
          buttonStyle={gStyle.difficultyPickerButtons}
          titleStyle={gStyle.difficultyPickerText}
        />
        <Grid
          onNumberPress={handleGridPress}
          values={gridValues}
          marked={marked}
        />
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
            onPress={saveBoardEventHandler}
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
