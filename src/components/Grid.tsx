import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../values/colors';

type GridProps = {
  onNumberPress: (row: number, column: number) => void;
};

const Grid = ({onNumberPress}: GridProps): JSX.Element => {
  const handleNumberPress = (row: number, column: number) => {
    onNumberPress(row, column);
  };
  const vals = Array(9).fill(Array(9).fill(0));

  return (
    <View style={styles.container}>
      {vals.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.rowContainer}>
          {row.map((column: number, columnIndex: number) => (
            <TouchableOpacity
              style={styles.numberContainer}
              onPress={() => handleNumberPress(rowIndex, columnIndex)}
              key={columnIndex}>
              <Text style={styles.numberText}>{column}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    margin: 0,
  },
  numberContainer: {
    height: 50,
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
  },
  numberText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.black,
  },
});

export default Grid;
